import { Text, View } from 'react-native';
import {defaultStyle} from './styles/styles.js'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <View style={defaultStyle.container}>
      <Header />
      <Text>Tähän kaikki komponentit ja semmoset siistit jutut, Navi joko tän yläpuolelle tai sit alimmaksi</Text>
      <Footer />
    </View>
  );
}