import { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Image, Button, Platform, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Student } from '../../model';
import { Genders, StudentsIcons, BACKEND_APP_IMAGES_URL } from '../../../../../shared/constants';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';


export const AddStudentAlert: React.FC = () => {
  const { isAddAlert } = useStore();
  const { hideAddAlert, createStudent} = useStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(Genders[0]);
  const [age, setAge] = useState(10);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSave = () => {
    if (firstName.trim().length < 2 || lastName.trim().length < 2 || age < 3) {
      return;
    }
    const student: Partial<Student> = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      gender,
      age,
    };
    createStudent(student);
    clearState();
    hideAddAlert();
  };

  const clearState = () => {
    setFirstName('');
    setLastName('');
    setGender(Genders[0]);
    setAge(10);
    setImageUri(null);
  };

  const handlePickImage = async () => {
    if (Platform.OS !== 'web') {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <CustomAlert visible={isAddAlert} title="Create new student!"
      buttonText='Save'
      handleYes={handleSave}
      onClose={hideAddAlert}>
          <View style={styles.content}>
            <View style={styles.imageBlock}>
              <TouchableOpacity onPress={handlePickImage}>
                <Image source={{ uri: imageUri ||
                  `${BACKEND_APP_IMAGES_URL}/photos/${StudentsIcons[gender as keyof typeof StudentsIcons]} `}}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              {/* <Text style={styles.imageHint}>Tap image to select</Text> */}

              <View style={styles.genderButtons}>
                {Genders.map((g) => (
                  <TouchableOpacity key={g} style={[styles.genderButton, gender === g && styles.genderSelected]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={styles.genderText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputBlock}>
              <TextInput style={styles.input}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput style={styles.input}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
              <View style={styles.ageRow}>
                <Text style={styles.ageLabel}>Age:</Text>
                <TextInput style={styles.ageInput}
                  keyboardType="numeric"
                  value={age.toString()}
                  onChangeText={(text) => setAge(Number(text))}
                  maxLength={2}
                />
              </View>
            </View>
          </View>
      </CustomAlert>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
  imageBlock: {
    alignItems: 'center',
    width: 120,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 16,
    marginBottom: 16,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  genderButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    marginHorizontal: 2,
  },
  genderSelected: {
    backgroundColor: '#2E4A7C',
  },
  genderText: {
    color: 'gold',
    fontSize: 15,
  },
  inputBlock: {
    flex: 1,
    paddingLeft: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    paddingHorizontal: 10,  
    marginBottom: 8,
    height: 36,
    backgroundColor: '#2E4A7C',
    color: '#ddd',
    fontSize: 16,
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageLabel: {
    marginRight: 8,
    color: '#ddd',
    fontSize: 16,
  },
  ageInput: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    paddingHorizontal: 10,
    width: '100%',
    height: 36,
    backgroundColor: '#2E4A7C',
    color: '#eee',
    fontSize: 16,
  },
  imageHint: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});
