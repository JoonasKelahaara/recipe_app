import { StyleSheet, StatusBar } from "react-native";

//VÄRIT: 
//      INPUTTIEN TAUSTAVÄRI: #E8F3E8
//      NAVBAR: #92C591
//      NAVBAR TUMMATEEMA: #559E54
//      GRAFIIKAT: #8EC641
//      VAALEATEEMA TAUSTAVÄRI: #E8F3E8
//      TUMMATEEMA TAUSTAVÄRI: #242424
//      AKSENTTIVÄRI FLOAT-NAPPI: #D85E47
//      AKSENTTIVÄRI VAALEANHARMAA: #808080
//      FONTTI: #0A3409
//
//      ??? #305A30
//      ??? #0A3409

//AKSENTIT:
//      1. #808080

//FONTIT:
//      1. Quicksand väliostikot
//      2. Roboto leipäteksti


export const defaultStyle = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    carouselContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    navMargin: {
      marginBottom: 45,
      backgroundColor: 'white',
      paddingLeft: 3,        
      paddingRight: 3,
    },
    header: {      
      backgroundColor: '#92C591',
      width: 110,
      height: 110,
      borderBottomRightRadius: 70,
      borderTopRightRadius: 1,
      flexDirection: 'row'
    },
    shadowIoS: {
      shadowColor: 'black',        
      shadowOffset: {width: 1, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 3
    },
    shadowAndroid: {
      elevation: 25,      
      shadowColor: '#000',
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
      flexDirection: 'row'
    },
    eyeIcon: {
      alignItems: 'center',
    },
    inputField: {
      width: '90%'
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
    recipeContainer: {
      flex: 1,
      marginTop: 12,
      padding: 12,
      marginLeft: 12,
      marginRight: 12,
      borderWidth: 3,
      borderRadius: 15,
      borderStyle: "solid",        
      borderColor: "#559E54"
    },
    recipeButton: {
      backgroundColor: '#E8F3E8',
      padding: 15,
      marginLeft: 12,
      marginRight: 12,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: '#559E54'
    },
    recipeButtonI: {
      padding: 15,
      marginLeft: 12,
      marginRight: 12,
      marginTop: 5,
      marginBottom: 5,
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
    },
    logo: {
      flex: 1,
      backgroundColor: 'white',
    },
    logoBorder: {
      height: 85,
      width: 85,
      backgroundColor: 'white',
      borderRadius: 90,
      borderWidth: 12,
      borderColor: '#8EC641',
      margin: 5,
      alignItems: 'center',
      overflow: 'hidden',
    },
    textLogo: {
      alignSelf: 'center'
    },
    settingsButton: {
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      paddingTop:15,
      fontSize:24,
      color: '#0A3409'
    },
    settings: {
      alignContent:'center',
      backgroundColor: 'white'
    },
    modalView: {
      marginBottom: 45,
      backgroundColor: 'white',
      paddingLeft: 3,
      paddingRight: 3,
      minheight: "auto"
    },
    errorMessage: {
      textAlign: 'center',
      color: 'red',
    },
    miscText: {
      textAlign: 'center'
    },
    link: {
      textAlign: 'center',
      alignSelf: 'center'
    },
    linkText: {
      textDecorationLine: 'underline',
      color: 'blue',
      marginBottom: 5
    },
    signInPage: {
      alignContent: 'center',
      backgroundColor: 'white',
      marginLeft: 7,
      marginRight: 7
    },
    infoText: {
      fontSize: 24,
      color: '#0A3409',
      paddingTop: 30
    },
    infoTextt: {
      fontSize: 24,
      color: '#0A3409',          
      paddingTop: 160
    },
    profilePicture: {
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',        
      width: 150,
      height: 150,
      borderWidth: 3,
      borderRadius: 90,
      borderColor: '#808080'
    },
    // Home screen carousel styling
    /* carouselImage: {
      width: ITEM_WIDTH,
      height: 300,
    }, */
    carouselItemContainer: {
      //borderRadius: 8,
      shadowColor: "#E8F3E8",
      paddingBottom: 20,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    carouselTitle: {
      color: "#0A3409",
      backgroundColor: "#E8F3E8",
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 20,
      paddingTop: 10,
    }, 
    carouselBody: {
      color: "#0A3409",
      backgroundColor: "#E8F3E8",
      fontSize: 14,
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
    },
    floatButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#D85E47',
      padding: 15,        
      marginLeft: 140,
      marginRight: 140,
      marginTop: 5,
      marginBottom: 5,        
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#D85E47',
    },
    otherTitle: {
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 15
    },
    userName: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10
    }
})