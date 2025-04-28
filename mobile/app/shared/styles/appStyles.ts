import { StyleSheet } from 'react-native';


export const menuStyles = StyleSheet.create({
  title: { color: '#444444', fontSize: 20, fontWeight: 'medium' },
  background: { color: 'rgba(236, 242, 200, 0.8)' },
  activeBackground: { color: 'rgba(118, 182, 234, 0.8)' },
});


export const profileStyles = StyleSheet.create({
  title: { color: '#FACA71', fontSize: 20, fontWeight: 'semibold' },
  background: { backgroundColor: '#ECF2C8', opacity: 0.7 },
});

export const screenStyles = StyleSheet.create({
  title: { color: '#D7EF34', fontSize: 32, fontWeight: 'bold' },
  summary: { color: '#FFFFFF', fontSize: 22, fontWeight: 'semibold' },
  calendar: { color: '#FFF', fontSize: 18, fontWeight: 'medium' },
  levelButton: { color: '#F8E187', fontSize: 15, fontWeight: 'medium', borderWidth: 1, borderColor: '#A7CFF5' },
  selected: { backgroundColor: '#475339' },
  //background: { color: 'rgba(89, 198, 84, 0.8)' },
  background: { backgroundColor: '#161D23'},
  gold: { color: '#F8E187', fontSize: 16, fontWeight: 'medium' },
});

export const widgetStyles = StyleSheet.create({
  title: { color: 'white', fontSize: 16, fontWeight: 'medium' },
  label: { color: 'white', fontSize: 15, fontWeight: 'medium' },
  input: { color: '#A7CFF5', fontSize: 15, fontWeight: 'medium' },
  sport: { color: '#EFEFEF', fontSize: 14, fontWeight: 'medium', alignSelf: 'center' },
  background: { backgroundColor: '#475339' },
});

export const iconStyles = StyleSheet.create({
  title: { color: 'white', fontSize: 12, fontWeight: 'semibold' },
  placeholder: { color: '#F8E187', fontSize: 18, fontWeight: 'medium' },
  background: { backgroundColor: '#475339', borderWidth: 1, borderColor: 'white' },
});

export const groupStyles = StyleSheet.create({
  title: { color: 'white', fontSize: 18, fontWeight: 'medium' },
  description: { color: '#A7CFF5', fontSize: 15, fontWeight: 'medium' },
  amount: { color: '#white', fontSize: 14, fontWeight: 'medium' },
  background: { backgroundColor: '#475339', borderWidth: 1, borderColor: '#444' },
});

export const cellStyles = StyleSheet.create({
  title: { color: '#F8E187', fontSize: 20, fontWeight: 'medium' },
  type: { color: '#A4FAAA', fontSize: 14, fontWeight: 'medium' },
  description: { color: '#A7CFF5', fontSize: 15, fontWeight: 'medium' },
  date: { color: '#A4FAAA', fontSize: 14, fontWeight: 'medium', textAlign: 'center' },
  time: { color: 'white', fontSize: 14, fontWeight: 'medium', textAlign: 'center' },
  score: { color: '#F29F56', fontSize: 22, fontWeight: 'medium', textAlign: 'center' },
  line: { borderRightColor: '#5694F2', borderRightWidth: 1 },
  rule: { color: 'F8E187', fontSize: 13, fontWeight: 'medium', textAlign: 'center' },
  background: { backgroundColor: '#475339' },
});

export const checkboxStyles = StyleSheet.create({
  isChecked: { color: 'green' },
  noChecked: { color: 'red' },
});