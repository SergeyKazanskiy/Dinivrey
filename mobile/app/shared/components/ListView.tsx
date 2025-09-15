import { ScrollView, Text, TouchableOpacity, TextStyle } from "react-native";


type Item = { id: number; name: string };

type Props = {
  data: Item[];
  onItem: (id: number, inx: number) => void;
  item_id?: number;
  textStyle?: TextStyle;
  gap?: number;
  isHorizontal?: boolean;
};

export const ListView: React.FC<Props> = ({ data, onItem, item_id, textStyle, gap = 12, isHorizontal = false }) => (
  <ScrollView style={{paddingVertical: 8}}
    horizontal={isHorizontal}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
        flexDirection: isHorizontal ? "row" : "column",
    }}
  >
    {data.map((item, inx) => (
      <TouchableOpacity key={item.id}
        onPress={() => onItem(item.id, inx)}
        style={{
          marginRight: isHorizontal && inx < data.length - 1 ? gap : 0,
          marginBottom: !isHorizontal && inx < data.length - 1 ? gap : 0,
        }}
      >
        <Text style={[textStyle, item_id === item.id && { textDecorationLine: "underline" }]}>
            {item.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
