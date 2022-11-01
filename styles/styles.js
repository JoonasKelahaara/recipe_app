import { StyleSheet, StatusBar } from "react-native";

export const defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      header: {
        backgroundColor: 'lightblue',
        textAlign: 'center',
        fontSize: 25
      },
      footer: {
        backgroundColor: 'lightblue',
        fontSize: 13,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 3
      }
})