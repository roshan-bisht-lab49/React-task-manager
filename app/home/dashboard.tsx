import { DealCard } from "@/components/DealCard";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from "@/context/auth";
import { AppUsers, useDeals, useUsers } from "@/hooks";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text, View } from "@/components/Themed";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useCallback, useEffect, useState } from "react";
import { getFilteredDeals } from "@/utility/utils";
import { router } from "expo-router";
import SessionStorage from "@/utility/SessionStorage";
import { LoadingIndicator } from "@/components";

export default function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState<AppUsers | undefined>(undefined);

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { data: deals, isLoading: isDealListLoading, refetch } = useDeals(loggedInUser?.id);
  const { data: users, isLoading: isUserListLoading } = useUsers();
  const filteredDeals = getFilteredDeals(deals || [], selectedTabIndex);
  const { signOut } = useAuth();

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    refetch().then(() => setIsRefreshing(false))
  }, []);

  useEffect(() => {
    SessionStorage.getUserToken().then((userId) => {
      const user = users?.find(user => user.id === userId);
      setLoggedInUser(user);
    });
  }, [users]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>Sales</Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: "500", }}>{loggedInUser?.name}</Text>
            <Pressable onPress={() => {
              signOut();
            }}>
              <AntDesign name="logout" size={20} color="white" />
            </Pressable>
          </View>
        </View>
        {
          isDealListLoading || isUserListLoading
            ? (
              <LoadingIndicator />
            ) : (
              <>
                <SegmentedControl
                  values={["Pending", "Approved", "Rejected"]}
                  selectedIndex={selectedTabIndex}
                  onChange={
                    (event) => {
                      setSelectedTabIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                  style={styles.tabs}
                />
                {
                  filteredDeals.length !== 0 ? (
                    <FlatList
                      data={filteredDeals}
                      refreshing={isRefreshing}
                      onRefresh={handleRefresh}
                      keyExtractor={(item) => item.id}
                      renderItem={(item) => {
                        return (
                          <Pressable onPress={() =>
                            router.push({
                              pathname: "/home/deal-details", params: {
                                dealId: item.item.id,
                                clientName: item.item.client.name
                              }
                            })}>
                            <DealCard deal={item.item} />
                          </Pressable>
                        );
                      }}
                      contentContainerStyle={styles.dealsList}
                    />
                  ) : (
                    <ScrollView
                      style={{ flex: 1 }}
                      refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                      }
                    >
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: "500", marginTop: 200 }}>No deals found</Text>
                      </View>
                    </ScrollView>
                  )
                }
              </>
            )
        }
      </SafeAreaView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 50,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    color: "#fff",
  },
  tabs: {
    marginVertical: 20,
  },
  dealsList: {
    gap: 8,
    paddingBottom: 120,
    width: "100%",
  },
});
