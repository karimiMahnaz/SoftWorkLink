import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
       
    },
    container: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal:5,
        alignItems: 'center', 
    },
    scrollContainer: {
        flexGrow: 1,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal:5,
      },
    //   textInput: {
    //     height: 100,
    //     borderColor: 'gray',
    //     borderWidth: 1,
    //     marginVertical: 10,
    //     padding: 10,
    //     width: '100%',
    //   },
    
      sendButton: {
        backgroundColor: 'rgba(9,19,128,1)',
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 30,
        paddingVertical: 10,
        width: 125,
        marginLeft: '50%',
        alignItems:'center',
      },
      imageContainer: {
        display: "flex",
        flexDirection: "row",
   //     justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
   //     marginTop:1,
        borderRadius:30,
     //   padding:20,
        borderColor:'black',
      },
      attachedImage: {
    //    width: '20%',
        marginLeft: '20%',
     //   marginTop: 10,
        borderRadius: 10,
      }, 
      attachButton: {
        backgroundColor: 'rgba(9,19,128,1)',
        borderRadius: 10,
    //    marginTop: 20,
     //   paddingHorizontal: 20,
        paddingVertical: 10,
        width: 125,
        marginLeft: '27%',
        alignItems:'center',
      },
      buttonText: {
        color: 'white',
      },
      headerStyle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#312921",
        marginBottom: 10,
       
      },
    
    //   htmlBoxStyle: {
    //     height: 200,
    //     width: 330,
    //     backgroundColor: "#fff",
    //     borderRadius: 10,
    //     padding: 20,
    //     marginBottom: 10,
    //   },
    
      richTextContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        paddingVertical: 10,
        paddingHorizontal:20,
        width: "100%",
      },
    
      richTextEditorStyle: {
      //  borderBottomLeftRadius: 10,
      //  borderBottomRightRadius: 10,
     //   borderWidth: 1,
     //   borderColor: "#ccaf9b",
      //  shadowColor: "#000",
       
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
      },
    
      richTextToolbarStyle: {
        backgroundColor: "#c6c3b3",
        borderColor: "#c6c3b3",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
      },
    
      errorTextStyle: {
        color: "#FF0000",
        marginBottom: 10,
        alignSelf: "center",
      },
    
      textButtonStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#312921",
      },
      DropBox:{
        marginTop:2,
        width: '100%',
        paddingHorizontal:5,
        alignItems: 'center', 
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      //  marginTop:30,
        width:'84%',
      },
      icon: {
        marginRight: 5,
      },
      label: {
      //  position: 'absolute',
      //  backgroundColor: 'white',
        left: 50,
       // marginTop: 12,
        zIndex: 999,
    //    paddingHorizontal: 8,
        fontSize: 14,
        alignSelf:"stretch",
        marginBottom:10,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      icon0:{
        marginLeft:20,
        marginTop:10,
        alignSelf: "flex-start",
        alignItems:"flex-start"
      },
})