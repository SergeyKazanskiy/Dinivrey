import { StyleSheet, View } from 'react-native';
import { Avatar, Badge, ListItem } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { BACKEND_APP_IMAGES_URL } from '../../../../../shared/constants';


export function StudentList() {
  const { students, camp_name, group_name } = useStore();
  const { selectStudent } = useStore();

  const router = useRouter();

  function handlePress(id: number) {
    selectStudent(id);
    router.push(`/dashboards/coach/students`)
  }

  return (
    <>
        {students.map(student => {
            const itemStyle = styles.item;
            const photoPath = student.photo === 'Student_boy.png' || student.photo === 'Student_girl.png' ?
            BACKEND_APP_IMAGES_URL + '/photos/' + student.photo :
            BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/students/' + group_name + '/' + student.photo

            return (
                <ListItem key={student.id}
                    bottomDivider
                    onPress={() => handlePress(student.id)}
                    containerStyle={itemStyle}
                >
                    <Avatar size={44} source={{ uri: `${photoPath}` }} rounded />

                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>
                            {`${student.first_name} ${student.last_name}`}
                        </ListItem.Title>

                        <ListItem.Subtitle style={styles.subtitle}>
                            {`${student.gender}, ${student.age} years old`}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Badge value={student.test_avg} status="success" />
                </ListItem>
            )})
        }
    </>
  );
}

const styles = StyleSheet.create({
  item: { 
    margin: 4,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
   },
  selected: { backgroundColor: '#4b5320', borderWidth: 1, borderColor: 'yellow' },
  title: { color: '#ddd', fontWeight: '500' },
  subtitle: { color: '#A7CFF5', paddingTop: 4 },
});