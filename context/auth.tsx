import SessionStorage from "@/utility/SessionStorage";
import { useRouter, useSegments } from "expo-router";
import * as React from "react";
const AuthContext = React.createContext<any>(null);


export function useAuth() {
    return React.useContext(AuthContext);
}
export function AuthProvider({ children }: React.PropsWithChildren) {
    const [user, setUser] = React.useState<string | undefined | null>("");
    const userToken = SessionStorage.getUserToken()
        .then(response => {
            setUser(response);
        });

    const rootSegment = useSegments()[0];
    const router = useRouter();
    React.useEffect(() => {
        // if (user === null || user === undefined) return;
        if (!user && rootSegment !== "auth") {
            router.replace("/auth/login");
        } else if (user && rootSegment !== "home") {
            router.replace("/home/dashboard");
        }
    }, [userToken, rootSegment])
    return (
        <AuthContext.Provider
            value={{
                user: userToken,
                signIn: (userToken: string) => {
                    setUser(userToken);
                    SessionStorage.setUserToken(userToken);
                },
                signOut: () => {
                    setUser(undefined);
                    SessionStorage.clearStorage();
                }
            }}>
            {children}
        </AuthContext.Provider>
    )
}
