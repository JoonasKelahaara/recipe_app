import { StyleSheet, StatusBar } from "react-native";

//VÄRIT: 
//      1. #E8F3E8
//      2. #92C591
//      3. #559E54
//      4. #305A30
//      5. #0A3409

//AKSENTIT:
//      1. #808080

export const defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#E8F3E8'
      },
      navMargin: {
        marginBottom: 45,
        backgroundColor: 'white',
        paddingLeft: 3,
        paddingRight: 3
      },
      header: {
        backgroundColor: '#92C591',
        textAlign: 'center',
        fontSize: 25
      },
      footer: {
        backgroundColor: '#92C591',
        fontSize: 13,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 3,
      },
      button: {
        backgroundColor: '#E8F3E8',
        padding: 15,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#559E54'
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
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#559E54',
        backgroundColor: '#E8F3E8',
      },
      navBar: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
      },
      recipeItem: {
        margin: 5,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#559E54',
        padding: 5,
        backgroundColor: '#E8F3E8'
      },
      recipeTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        borderBottomWidth: 1
      },
      pageTitle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
})