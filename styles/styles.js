import { StyleSheet, View, StatusBar, PixelRatio, Dimensions } from "react-native";

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
      fontFamily:'Roboto'
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
      fontSize: 15,
      fontFamily:'Roboto'      
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
      fontWeight: 'bold',
      fontFamily:'Roboto'
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
      alignSelf: 'center',
      flex:1,
      paddingTop:20,
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
    successMessage: {
      textAlign: 'center',
      color: '#41ab2c',
    },
    miscText: {
      textAlign: 'center',
      fontFamily: 'Roboto'
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
      paddingTop: 30,
      alignSelf: 'center',
      fontFamily:'Roboto'
    },
    infoTextt: {
      fontSize: 24,
      color: '#0A3409',          
      paddingTop: 70,
      fontFamily:'Roboto'
    },
    infoHeader: {
      textAlign: 'center',
      fontSize: 40,
      color: '#8EC641',
      fontFamily:'Quicksand',
      paddingLeft: 15,
      paddingRight: 15
    },
    infoLine: {
       flex: 1,
       height: 3,
       backgroundColor: '#8EC641'},

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
      //borderRadius: 20,
      //borderColor: '#808080',
      shadowColor: '#E8F3E8',
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
      fontFamily:'Quicksand',
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
      fontSize: 16,
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
    }, 
    floatButton: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      backgroundColor: '#D85E47',
      height: 70,
      width: 70,
      borderRadius: 90,
      borderWidth: 2,
      borderColor: '#D85E47',
      marginRight: 15,
      marginBottom: 10
    },
    otherTitle: {
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 15,
      fontFamily:'Quicksand'
    },
    userName: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10
    },
    loading: {
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      zIndex: 0,
      position: 'absolute',
    },
    flexRow: {
      flex: 1,
      flexDirection: 'row',
    },
    viewBorder: {
      backgroundColor: '#ffffff',
      borderColor: '#8EC641',
      borderWidth: 10 / PixelRatio.get(),
      borderRadius: 20,
      paddingTop: '5%',
      paddingBottom: '30%',
      marginLeft:'15%',
      marginRight:'15%',
      marginTop:'10%',
      },
    settingsButton2: {
      flex: 1,
      flexDirection: 'row',
      alignContent:'center',
      justifyContent:'flex-start',
      paddingLeft: 7,
    },
    settingsButtonText: {
      fontSize: 20,
      marginBottom: 10,
      textDecorationLine: 'underline',
      textDecorationColor: '#8EC641',
      paddingLeft: 5,
      fontFamily: 'Roboto'
    },
})