import { View } from "react-native";
import { Text } from "./Themed";
interface DealStatusProps {
    status: string | undefined;
}

const statusMap: Record<string, { label: string; color: string }> = {
    Pending: { label: 'Pending Approval', color: 'rgba(36, 202, 236, 1)' },
    Rejected: { label: 'Rejected Sale', color: 'rgba(248, 111, 83, 1)' },
    Approved: { label: 'Approved Sale', color: 'rgba(20, 184, 156, 1)' },
};

export function DealStatus({ status }: DealStatusProps) {
    if (status === undefined) return <></>;
    const { label, color } = statusMap[status];

    return <View
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 1,
            borderRadius: 5,
            backgroundColor: color,
        }}>
        <Text style={{ fontSize: 14, fontWeight: "400", color: "rgba(23, 26, 28, 1)" }}>
            {label}
        </Text>
    </View>;
}