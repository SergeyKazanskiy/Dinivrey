import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Button, Platform, Image, Text } from "react-native";
import { CustomAlert } from '../components/CustomAlert';
import { PhoneAuthProvider, signInWithCredential, RecaptchaVerifier, signOut } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { auth, firebaseConfig } from "./firebaseConfig";
import { useAuthState } from './state';
import { UserRole } from '../../api/auth_api';
import { objectToJson } from "../utils";
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../components/DinivreyHeader';
import { router } from 'expo-router';
import { HttpStatus } from './HttpStatus';
import { useSharedHttpClient } from './httpClient';


interface Props {
  role: UserRole;
}

export default function LoginScreen({ role }: Props) { 
  const { loginUser } = useAuthState();
  const { catchError, errorMessage: e } = useSharedHttpClient();
  const { setLoading, clearMessages } = useSharedHttpClient();

  const recaptchaVerifier = useRef(null);

  const [phone, setPhone] = useState("+1 650-555-1234");
  const [code, setCode] = useState('123456');
  const [verificationId, setVerificationId] = useState("");

  const [isCode, setIsCode] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web' && !recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);


  const sendPhone = async () => {
    try {
      let id;
      setLoading(true);

      if (Platform.OS === 'web') {
        const verifier = recaptchaVerifierRef.current!;
        const provider = new PhoneAuthProvider(auth);
        id = await provider.verifyPhoneNumber(phone, verifier);
      } else {
        const provider = new PhoneAuthProvider(auth);
        id = await provider.verifyPhoneNumber(phone, recaptchaVerifier.current!);
      }

      setLoading(false);
      setVerificationId(id);
      setIsCode(true);
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      const token = await auth.currentUser?.getIdToken(true)!;

      loginUser(role, token);
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.message)
    }
  };

  const closeErrorAlert = async () => {
    clearMessages();
    signOut(auth);
    setVerificationId('');
    await auth.currentUser?.delete();
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <DinivreyHeader title='Authorization' onExit={()=>router.replace('/')}/>
      <Image style={[styles.image]}
        source={require('../../../assets/images/DinivreyCompany.png')} /> 

      <CustomAlert visible={isCode} title="Success!"
        onClose={() => setIsCode(false)}>
        <Text style={styles.alertText}>Verification code received</Text> 
      </CustomAlert>

      <CustomAlert visible={isError} title="Phone error!"
        onClose={() => (setIsError(false), setErrorMessage(''))}>
        <Text style={styles.alertText}>{errorMessage}</Text> 
      </CustomAlert>

      <CustomAlert visible={catchError} title="Server error!"
        onClose={closeErrorAlert}>
        <Text style={styles.alertText}>{e}</Text> 
      </CustomAlert>

      {Platform.OS !== 'web' && (
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
      )}

      {verificationId === '' ? (
        <>
          <Text style={styles.label}>Enter your phone, {role}</Text>
          <TextInput style={styles.value} keyboardType="phone-pad"
            placeholder="Enter phone"
            value={phone}
            onChangeText={setPhone}
          />
          <View style={styles.button}>
            <Button title="Send phone" onPress={sendPhone} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter code from SMS</Text>
          <TextInput  style={styles.value} keyboardType="number-pad" 
            placeholder="Code from SMS"
            value={code} 
            onChangeText={setCode}
          />
          <View style={styles.button}>
            <Button title="Confirm" onPress={confirmCode} />
          </View>
        </>
      )}
      <View id="recaptcha-container" />
      {Platform.OS === 'web' && <div id="recaptcha-container" />}

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
    width: '72%',
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

