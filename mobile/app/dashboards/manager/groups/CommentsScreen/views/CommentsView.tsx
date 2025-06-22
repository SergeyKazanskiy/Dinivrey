import { StyleSheet, FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { useStore } from '../../store';
import { CommentCell } from '../../../../../shared/components/CommentCell';
import { getYearAndMonth, getDayAndWeekday } from '../../../../../shared/utils';
import { months } from '../../../../../shared/constants';
import { Icon } from '@rneui/themed';


export function CommentsView() {
  const { comments } = useStore();

  function getDate(timestamp: number) {
    const {year, month} = getYearAndMonth(timestamp);

    return getDayAndWeekday(timestamp).day + ' ' +  months[month - 1] + ' ' + year 
  }
  return (
    <ScrollView>
      <FlatList data={comments} contentContainerStyle={{paddingBottom: 24}}
        renderItem={({ item }) => 
          <CommentCell
            date={getDate(item.timestamp)}  
            comment={item.comment}
          />
        } style={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  list: { borderRadius: 10 },
});