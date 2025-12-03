import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View as DefaultView,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/context/auth";
import { LoadingIndicator } from "@/components";
import { AppUsers } from "@/hooks";

export default function LoginPage() {
  const [user, setUser] = useState<AppUsers | null>(null);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const colorScheme = useColorScheme();
  const { data: usersList, isLoading } = useUsers();
  const { signIn } = useAuth();
  
  function login() {
    if (!user) return;
    if (password !== '12345678') {
      setShowError(true);
      return;
    }
    setShowError(false);
    signIn(user.id);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? "dark"].container,
            ...styles.loginContainer,
          }}
        >
          {user ? (
            <>
              <Text style={styles.title}>Enter Password</Text>
                <Text style={styles.userName}>
                  {user.name} | {user.email}
                </Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
                {showError && (
                  <Text style={styles.error}>Password is incorrect</Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 20,
                    marginTop: 20,
                    marginRight: 12,
                    backgroundColor: "rgba(46, 54, 58, 1)"
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setUser(null);
                      setShowError(false);
                      setPassword("");
                    }}
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                  >
                    <DefaultView
                      style={{
                        backgroundColor: "rgba(58, 67, 72, 1)",
                        padding: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: "rgba(220, 234, 245, 1)",
                          padding: 5,
                          fontWeight: "400",
                          fontSize: 16,
                          paddingHorizontal: 25,
                        }}
                      >
                        Back
                      </Text>
                    </DefaultView>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      login()
                    }}
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                  >
                    <DefaultView
                      style={{
                        backgroundColor: "rgba(143, 235, 250, 1)",
                        padding: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: "rgba(23, 26, 28, 1)",
                          padding: 5,
                          fontWeight: "700",
                          fontSize: 16,
                          paddingHorizontal: 25,
                        }}
                      >
                        Login
                      </Text>
                    </DefaultView>
                  </Pressable>
                </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Pick an Account</Text>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <FlatList
                  data={usersList}
                  keyExtractor={(user) => user.id}
                  numColumns={1}
                  contentContainerStyle={{ gap: 10 }}
                  renderItem={(user) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setUser(user.item)}
                        key={user.item.id}
                      >
                        <View
                          key={user.item.id}
                          style={{
                            backgroundColor:
                              Colors[colorScheme ?? "dark"].background,
                            ...styles.userCard,
                          }}
                        >
                          <Text>{user.item.name}</Text>
                          <Text>{user.item.email}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </>
          )}
          
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    minHeight: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width - 100,
    gap: 10,
    padding: 20,
    borderRadius: 4,
  },
  userCard: {
    flex: 1,
    width: "100%",
    height: 55,
    borderRadius: 4,
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    color: "#ACBAC5",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  userName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: 20,
  },
  inputContainer: {
    width: "100%",
    gap: 32,
    flexDirection: "row",
    backgroundColor: "rgba(46, 54, 58, 1)",
    alignItems: "center",
    marginTop: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7C8A94",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "rgba(118, 118, 128, 0.24)",
    color: "#FFF",
  },
  error: {
    color: "red",
  },
});
