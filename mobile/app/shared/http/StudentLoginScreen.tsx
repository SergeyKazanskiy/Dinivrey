import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Platform, Image, Text } from "react-native";
import { CustomAlert } from '../components/CustomAlert';
import { signInWithCustomToken, signOut } from "firebase/auth";
import { auth, firebaseConfig } from "./firebaseConfig";
import { useAuthState } from './state';
import { objectToJson } from "../utils";
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../components/DinivreyHeader';
import { router } from 'expo-router';
import { HttpStatus } from './HttpStatus';
import { useSharedHttpClient } from './httpClient';
import axios from "axios";
import { API_BASE_URL } from '../../api/base_url'


export default function StudentLoginScreen() {
  const { loginStudent } = useAuthState();
  const { setLoading } = useSharedHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async () => {
    setLoading(true);

    axios.post( API_BASE_URL + "/student/login", { email, password })
    .then(async res => {
      const { id_student, token } = res.data;
      //alert(id_student + "  " + token)
      await signInWithCustomToken(auth, token);
      const idToken = await auth.currentUser?.getIdToken(true)!;

      loginStudent(id_student, idToken);
    })
    .catch(err => {
      setIsError(true);
      setErrorMessage(err.message)
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <LinearGradient colors={["#2E4A7C", "#152B52"]} style={styles.wrapper}>
      <DinivreyHeader title='Authorization' onExit={()=>router.replace('/')}/>
      <Image source={require("../../../assets/images/DinivreyCompany.png")} style={styles.image} />

      <CustomAlert visible={isError} title="Auth error!"
        onClose={() => (setIsError(false), setErrorMessage(''))}>
        <Text style={styles.alertText}>{errorMessage}</Text> 
      </CustomAlert>

      <Text style={styles.label}>Login with Email</Text>
      <TextInput style={styles.value}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput style={styles.value} secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <HttpStatus/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '72%',
    height: '30%',
  },
  value: {
    marginTop: 14,
    color: '#444',
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: '92%',
    borderRadius: 8,
    backgroundColor: 'rgb(180, 216, 158)',
    minHeight: 32,
    alignSelf: 'center'
  },
  button: {
    marginTop: 14,
    width: '60%',
    alignSelf: 'center'
  },
  label: {
    fontSize: 17,
    color: 'gold',
    alignSelf: 'center'
  },
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});

