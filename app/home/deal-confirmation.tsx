import { SafeAreaView, View } from '@/components/Themed';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDealDetails } from '@/hooks';
import { Text } from '@/components/Themed';
import { formatCurrency, formatDateToLocal } from '@/utility/utils';
import { LoadingIndicator } from '@/components';


const DealConfirmation = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { dealId, dealStatus } = params;
    const { data: dealData, isLoading } = useDealDetails(dealId as string);

    if (isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <LoadingIndicator />
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Sales {dealStatus}</Text>
                    {
                        dealStatus === "Approved" ? (
                            <View>
                                <Text style={styles.subTitle}>
                                    {`You have approved the sale created by ${dealData?.creator?.name} for ${dealData?.client?.name} costing ${formatCurrency(dealData?.transactionValue)} on ${formatDateToLocal(dealData?.createdAt)}.`}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {`${dealData?.creator?.name} will be notified.`}
                                </Text>
                            </View>
                        ) : (
                            <View style={{ gap: 10 }}>
                                <Text style={styles.subTitle}>
                                    {`You have rejected the sale created by ${dealData?.creator?.name} for ${dealData?.client?.name} costing ${formatCurrency(dealData?.transactionValue)} on ${formatDateToLocal(dealData?.createdAt)} because of ${dealData?.reason ?? ""}.`}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {`${dealData?.creator?.name} will be notified.`}
                                </Text>
                            </View>
                        )
                    }
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.5 : 1.0 }
                        ]}
                        onPress={() => {
                            // navigation.goBack()
                            router.replace("/home/dashboard");
                        }}>
                        <View style={styles.textView}>
                            <Text style={styles.text}>View Other Tasks Pending Approval</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "500",
        color: "#fff",
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#fff",
        paddingVertical: 10
    },
    container: {
        flex: 1,
        alignItems: "stretch",
        paddingTop: 50,
        paddingHorizontal: 28,
    },
    text: {
        color: "rgba(220, 234, 245, 1)",
        fontWeight: "400",
        fontSize: 16

    },
    textView: {
        backgroundColor: "rgba(58, 67, 72, 1)",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 50
    }
});

export default DealConfirmation;