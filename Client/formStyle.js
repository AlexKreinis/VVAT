import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
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
        backgroundColor: "#d63031",
        paddingVertical: 10,
        marginHorizontal: 80,
        marginVertical: 20,
        borderRadius: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500'
    }
});