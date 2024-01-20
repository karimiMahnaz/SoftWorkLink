import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor:'rgba(221,225,226,1)',
    },
    container: { 
        padding: 50, 
        flexDirection: 'row', 
        justifyContent: 'left', 
        height: 200, 
        zIndex: 30,
      }, 
    buttonContainer: {
        alignContent:"flex-start",
      //  marginTop: 120,
        width: "100%",
        paddingVertical: 20,
      //  paddingHorizontal:10,
        alignItems: "center",
        flexDirection:"column",  
    },
    title:{
        fontSize:24,
        fontFamily: "System",
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    firstText: {
        fontFamily: "System",
        fontSize: 16,
        marginTop: 7,    
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    email:{
        fontFamily: "System",
        fontSize: 14,
        margin: 5,    
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    useremail:{
        fontFamily: "System",
        fontSize: 12,
        marginTop: 5,    
        color: "rgba(9,19,128,1)",
        fontWeight:'bold',
    },
    menu:{
        alignItems:"center",
        zIndex:30,
    
    }
});