import { View, SafeAreaView } from '@/components/Themed'
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, Pressable, View as DefaultView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { Deal, useDealDetails, useUpdateDeal, useRejectReasons } from '@/hooks';
import { DealStatus, LoadingIndicator } from '@/components';
import { formatCurrency, formatDateToLocal } from '@/utility/utils';
import SessionStorage from '@/utility/SessionStorage';
import ActionSheet, { ActionSheetRef, FlatList } from "react-native-actions-sheet";
import { useNavigation, useRouter } from 'expo-router';
import { ProductsTable } from '@/components/ProductsTable';

function DealDetailsCard({ deal }: { deal: Deal | undefined }) {
    return (
        <View style={dealDetailsStyles.container}>
            <View style={dealDetailsStyles.textBox}>
                <Text style={dealDetailsStyles.textHeading}>Client</Text>
                <Text style={dealDetailsStyles.title}>{deal?.client.name}</Text>
            </View>
            <View style={dealDetailsStyles.textBox}>
                <Text style={dealDetailsStyles.textHeading}>Sales Rep</Text>
                <Text style={dealDetailsStyles.text}>{deal?.creator?.name}</Text>
            </View>
            <View style={dealDetailsStyles.textBox}>
                <Text style={dealDetailsStyles.textHeading}>Transaction Price</Text>
                <Text style={dealDetailsStyles.text}>{formatCurrency(deal?.transactionValue)}</Text>
            </View>
            <View style={dealDetailsStyles.textBox}>
                <Text style={dealDetailsStyles.textHeading}>Status</Text>
                <Text style={dealDetailsStyles.text}>{deal?.status}</Text>
            </View>
            <View style={dealDetailsStyles.textBox}>
                <Text style={dealDetailsStyles.textHeading}>Deal Status</Text>
                <Text style={dealDetailsStyles.text}>{<DealStatus status={deal?.status} />}</Text>
            </View>
            <View style={dealDetailsStyles.textBox}>
                <Text style={dealDetailsStyles.textHeading}>Date Requested</Text>
                <Text style={dealDetailsStyles.text}>{formatDateToLocal(deal?.createdAt)}</Text>
            </View>
            {
                deal?.status === "Rejected"  && (
                    <View style={dealDetailsStyles.textBox}>
                        <Text style={dealDetailsStyles.textHeading}>Rejection Comment</Text>
                        <Text style={dealDetailsStyles.text}>{deal?.reason}</Text>
                    </View>
                )
            }
        </View>
    )
}

function DealDetails() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const { dealId, clientName } = params;
    const { data: dealData, isLoading: isDealDetailsLoading } = useDealDetails(dealId as string);
    const { data: reasonsList, isLoading: isReasonListLoading } = useRejectReasons();
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const [dealStatus, setDealStatus] = useState("");
    const [approvedId, setApproverId] = useState<string | null>(null);

    useEffect(() => {
        SessionStorage.getUserToken().then((response) => {
            setApproverId(response);
        });
        navigation.setOptions({ headerTitle: clientName ?? "Details" });
    }, []);

    const updateDeal = useUpdateDeal(handleOnSuccess);
    if (isDealDetailsLoading || isReasonListLoading) {
        return (
            <View style={{ flex: 1 }}>
                <LoadingIndicator />
            </View>
        )
    }

    function handleOnSuccess() {
        router.push({ pathname: "/home/deal-confirmation", params: { dealId: dealId, dealStatus } });
    }

    function handleUpdateDealPress(status: "Approved" | "Rejected", reason?: string) {
        setDealStatus(status);
        updateDeal.mutate({
            approverId: approvedId ?? "",
            dealId: dealData?.id ?? "",
            reason: reason ?? "",
            status: status,
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <DealDetailsCard deal={dealData} />
                    <ProductsTable products={dealData?.details || []} />
                    {
                        dealData?.status === "Pending" ? (
                            updateDeal.isPending ? (
                                <LoadingIndicator />
                            ) : (
                                <View style={{ flexDirection: 'row', justifyContent: "center", gap: 20, marginTop: "auto" }}>
                                    <Pressable
                                        onPress={() => {
                                            actionSheetRef.current?.show();
                                        }}
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.5 : 1.0 }
                                        ]}
                                    >
                                        <DefaultView style={{ backgroundColor: "rgba(58, 67, 72, 1)", padding: 2, borderRadius: 2 }}>
                                            <Text style={{ color: "rgba(220, 234, 245, 1)", padding: 5, fontWeight: "400", fontSize: 16, paddingHorizontal: 25 }}>Reject</Text>
                                        </DefaultView>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => { handleUpdateDealPress("Approved") }}
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.5 : 1.0 }
                                        ]}
                                    >
                                        <DefaultView style={{ backgroundColor: "rgba(143, 235, 250, 1)", padding: 2, borderRadius: 2 }}>
                                            <Text style={{ color: "rgba(23, 26, 28, 1)", padding: 5, fontWeight: "700", fontSize: 16, paddingHorizontal: 25 }}>Approve</Text>
                                        </DefaultView>
                                    </Pressable>
                                </View>
                            )
                        ) : null
                    }
                    <ActionSheet
                        containerStyle={{ backgroundColor: 'rgba(27, 33, 36, 1)', padding: 15 }}
                        gestureEnabled
                        useBottomSafeAreaPadding
                        ref={actionSheetRef}>
                        <FlatList
                            data={reasonsList}
                            keyExtractor={(reasons) => reasons.id}
                            renderItem={(reason) => {
                                return (
                                    <Pressable
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.5 : 1.0 }
                                        ]}
                                        onPress={() => {
                                            actionSheetRef.current?.hide();
                                            handleUpdateDealPress("Rejected", reason.item.description);
                                        }}>
                                        <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: "white", padding: 5 }}>{reason.item.description}</Text>
                                        </View>
                                    </Pressable>
                                );
                            }}
                            contentContainerStyle={{
                                gap: 8,
                                paddingBottom: 120,
                                width: "100%",
                            }}
                        />
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1.0 }
                            ]}
                            onPress={() => {
                                actionSheetRef.current?.hide();
                            }}>
                            <View style={{ padding: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "white", padding: 5 }}>Cancel</Text>
                            </View>
                        </Pressable>
                    </ActionSheet>
                </View>
        </SafeAreaView>
    )
}


export default DealDetails;


const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "500",
        color: "#fff"
    },
    container: {
        flex: 1,
        alignItems: "stretch",
        paddingHorizontal: 28,
        paddingVertical: 20,
    }
});

const dealDetailsStyles = StyleSheet.create({
    container: {
        display: "flex",
        paddingVertical: 12,
        gap: 8,
        fontWeight: "400",
    },
    title: {
        color: "#DCEAF5",
        fontSize: 16,
    },
    textBox: {
        flexDirection: "row",
        gap: 8,
        fontSize: 14,
    },
    textHeading: {
        color: "#7C8A94",
    },
    text: {
        color: "#DCEAF5",
    },
});
