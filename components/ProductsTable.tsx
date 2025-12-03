import { DealDetails } from "@/hooks";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { formatCurrency } from "@/utility/utils";

export function ProductsTable({ products }: { products: DealDetails[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.left, styles.bold]}>Products</Text>
        <Text style={[styles.right, styles.bold]}>Quantity</Text>
        <Text style={[styles.right, styles.bold]}>Total Price</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <View style={styles.row}>
              <Text style={styles.left}>{item.item.productName}</Text>
              <Text style={styles.right}>{item.item.productQuantity}</Text>
              <Text style={styles.right}>{formatCurrency(item.item.productTotalPrice)}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    fontSize: 14,
    color: "#DCEAF5",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
  },
  bold: {
    fontWeight: "700",
  },
  left: {
    textAlign: "left",
    flexGrow: 1.5,
    flexBasis: 0,
  },
  right: {
    textAlign: "right",
    flexGrow: 1,
    flexBasis: 0
  },
});
