import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    container: {
      width: '100%',
      paddingVertical: 30,
      paddingHorizontal:5,
      alignItems: 'center', 
  },
      column: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginTop:1,
        borderRadius:30,
        padding:20,
        borderColor:'black',
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
      label: {
          left: 50,
          zIndex: 999,
          fontSize: 14,
          alignSelf:"stretch",
          marginBottom:10,
        },
      icon: {
        marginRight: 5,
      },
      icon0:{
        marginLeft:20,
        marginTop:10,
        alignSelf: "flex-start",
        alignItems:"flex-start"
      },
      noTask:{
        marginTop:10,
        paddingVertical: 10,
        fontFamily:'System',
        width:'100%',
        flexWrap:"wrap",
        fontWeight:"bold"
      },
     
      List:{
        marginTop:1,
        borderRadius:5,
        width:"100%",
        backgroundColor:'gainsboro',
      },
      task:{
        fontFamily:'System',
      /// ItemSeparator:5,
      //  backgroundColor:`#f5f5dc`,
        paddingVertical:5,
        paddingHorizontal:25,
        borderRadius:5,
        borderColor:'#f5f5dc',
        flexWrap:'wrap',
        fontWeight:'bold',
      },
      taskStatus:{
        fontFamily:'System',
      /// ItemSeparator:5,
        color:`rgba(9,19,128,1)`,
        paddingVertical:5,
        paddingHorizontal:25,
        borderRadius:5,
        borderColor:'#f5f5dc',
        flexWrap:'wrap',
        fontWeight:'bold',
      },
      card:{
        padding: 4,
        //backgroundColor:`#f0f8ff`,
        opacity:.7,
        borderColor:'royalblue',
        borderRadius:12,
        margin:6,
        opacity:.5,
        borderWidth:1,
      },
      projectName:{
        fontFamily:"System",
        fontWeight:"bold",
        color:"rgba(9,19,128,1)",
        padding:10,
        paddingBottom:15,
        color:'blue',
      },
      taskProgress:{
        paddingVertical:2,
        paddingHorizontal:5,
        maxHeight:30,
        maxWidth:48,
        borderRadius:5,
      }
      
    
})