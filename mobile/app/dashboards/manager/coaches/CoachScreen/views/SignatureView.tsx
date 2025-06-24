import React, { useRef, useState } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { Button } from '@rneui/themed';
import SignatureCanvas, { SignatureViewRef }  from 'react-native-signature-canvas';
import SignaturePad from 'react-signature-canvas';
import { useStore } from '../../store';


export const SignatureView = () => {
  const { saveSignature } = useStore();

  const ref = useRef<SignatureViewRef>(null);
  const webSigPadRef = useRef<any>(null);

  const handleSave = () => {
    if (Platform.OS === 'web') {
      const b64 = webSigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
      saveSignature(b64);
    }
  };

  const handleClear = () => {
    if (Platform.OS === 'web') {
      webSigPadRef.current.clear();
      saveSignature(null);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <>
          <View style={{ borderWidth: 1, borderColor: '#000' }}>
            <SignaturePad ref={webSigPadRef}
              canvasProps={{ width: 300, height: 200, className: 'sigCanvas'}}
            />
          </View>
          <View style={styles.section}>
            <Button title='Save' type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={handleSave}
            />
            <Button title='Clear' type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={handleClear}
            />
          </View>
        </>
      ) : (
        <SignatureCanvas ref={ref}
          onOK={(sig) => saveSignature(sig)} // already base64 format
          onClear={handleClear}
          autoClear={true}
          descriptionText="Sign here"
          clearText="Clear"
          confirmText="Save"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  preview: {
    width: 120,
    height: 40,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginHorizontal: 4
  },
  title: {
    fontSize: 16,
    color: 'gold'
  },
});
