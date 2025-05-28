import { StyleSheet, Platform } from 'react-native';
import { Text } from '@rneui/themed';
import { useStore } from '../../store';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';


export function DrillView() {
  const { drill } = useStore();

  //const videoId = extractYouTubeVideoId(drill.link);
  //alert(`https://www.youtube.com/embed/${drill.link}`)

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      
      {Platform.OS === 'web' ? (
        <iframe
          style={{ width: '100%', height: 200 }}
          src={`https://www.youtube.com/embed/X2XfWVLC2dU`}
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <WebView
          style={styles.video}
          javaScriptEnabled
          source={{ uri: `https://www.youtube.com/embed/X2XfWVLC2dU` }}
        />
      )}

      {/* <Text style={styles.label}>{drill.link}</Text> */}
      <Text style={styles.label}>Category</Text>
      <Text style={styles.text}>{drill.category}</Text>

      <Text style={styles.label}>Estimate time duration:</Text>
      <Text style={styles.text}>{drill.time}</Text>

      <Text style={styles.label}>Players amount during drill:</Text>
      <Text style={styles.text}>{drill.actors}</Text>

      <Text style={styles.label}>Description</Text>
      <Text style={styles.textArea}>{drill.desc}</Text>
    </LinearGradient>
  );    
}

function extractYouTubeVideoId(url: string): string | null {
  const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
    padding: 16
  },
  video: {
    height: 200,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ddd',
    padding: 8,
    marginTop: 16
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    minHeight: 100,
    color: '#A7CFF5',
  },
  text: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    color: '#A7CFF5',
  },
});
