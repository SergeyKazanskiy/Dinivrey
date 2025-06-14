import React, { useRef, useState } from 'react';
import { StyleSheet, View, Image, Platform, Button } from 'react-native';
import SignatureCanvas, { SignatureViewRef }  from 'react-native-signature-canvas';
import SignaturePad from 'react-signature-canvas';
import { useStore } from '../../store';


export const SignatureView = () => {
  const { signature} = useStore();
  const { setSignature } = useStore();

  const ref = useRef<SignatureViewRef>(null);
  const webSigPadRef = useRef<any>(null);

  const handleSave = () => {
    if (Platform.OS === 'web') {
      const b64 = webSigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
      setSignature(b64);
    }
  };

  const handleClear = () => {
    if (Platform.OS === 'web') {
      webSigPadRef.current.clear();
      setSignature(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{ width: 120, height: 40 }}
            source={{ uri: signature }}
          />
        )}
      </View>
      {Platform.OS === 'web' ? (
        <>
          <View style={{ borderWidth: 1, borderColor: '#000' }}>
            <SignaturePad
              ref={webSigPadRef}
              canvasProps={{
                width: 300,
                height: 200,
                className: 'sigCanvas'
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button title="Save Signature" onPress={handleSave} />
            <Button title="Clear" onPress={handleClear} />
          </View>
        </>
      ) : (
      <SignatureCanvas
        ref={ref}
        //onEnd={handleEnd}
        onOK={(sig) => setSignature(sig)} // already base64 format
        //onEmpty={handleEmpty}
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
  },
  preview: {
    width: 120,
    height: 40,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
