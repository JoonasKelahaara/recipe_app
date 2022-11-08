import { StyleSheet, StatusBar } from "react-native";

export const defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0
      },
      navMargin: {
        marginBottom: 45
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
      },
      button: {
        backgroundColor: 'lightgreen',
        padding: 15,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 6
      },
      buttonText: {
        textAlign: 'center',
        fontSize: 15
      },
      textInput: {
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 7,
        marginRight: 7,
        padding: 4,
        borderWidth: 1,
        borderRadius: 6
      },
      navBar: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
      },
      recipeItem: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
      },
      recipeTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        borderBottomWidth: 1
      }
})