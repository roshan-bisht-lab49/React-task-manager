import React from 'react'
import { View as DefaultView, ActivityIndicator } from "react-native";


interface LoadingIndicatorProps {
    size?: "small" | "large";
}
export const LoadingIndicator = ({ size = "large" }: LoadingIndicatorProps) => {
    return (
        <DefaultView style={{ justifyContent: 'center', flex: 1, }}>
            <ActivityIndicator size={size} />
        </DefaultView>
    )
}

