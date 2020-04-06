import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 60,
    paddingBottom: 40,
  },
    input:{
        height: 40,
        marginBottom: 10,
        color: '#1F1F5E',
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#B9B9F3',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    buttonContainer:{
        backgroundColor: "#F7632D",
        borderColor: '#000',
        paddingVertical: 10,
        marginHorizontal: 80,
        marginVertical: 20,
        borderRadius: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500'
    },
    navigateButton: {
        alignItems: "center",
        padding: 2,
        marginHorizontal: 80,
        borderWidth: 1,
        flexGrow: 1,
        textAlign: "center",
        marginVertical: 20,
      },
      navigateText: {
        color: '#fff',
        fontWeight: 'bold'
      }
});
