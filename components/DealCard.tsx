import { Deal } from '@/hooks';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { formatCurrency } from '@/utility/utils';


export function DealCard({ deal }: { deal: Deal }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deal.client.name}</Text>
      <View style={styles.textBox}>
        <Text style={styles.textHeading}>Sales Rep</Text>
        <Text style={styles.text}>{deal.creator?.name}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.textHeading}>Total</Text>
        <Text style={styles.text}>{formatCurrency(deal.transactionValue)}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.textHeading}># of Products</Text>
        <Text style={styles.text}>{deal.totalQuantity}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#3A4348",
    gap: 8,
    fontWeight: "400",
    borderRadius: 4,
  },
  title: {
    color: "#DCEAF5",
    fontSize: 16,
  },
  textBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#3A4348",
    fontSize: 14,
  },
  textHeading: {
    color: "#7C8A94",
  },
  text: {
    color: "#DCEAF5",
  },
});