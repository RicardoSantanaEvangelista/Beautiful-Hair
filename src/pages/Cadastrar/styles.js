import { Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },

    title: {
        fontSize: 30,
        color: "#F92E6A",
        marginBottom: 10,
        fontWeight: "bold",
    },

    input: {
        width: 300,
        height: 40,
        marginTop: 3,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor:  "#F92E6A",
        marginLeft: "auto",
        marginRight: "auto",
        color: "#4D6156",
    },

    inputArea:{
        flexDirection: "row",
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor:  "#F92E6A",
        alignItems: "center",
    },

    inputPassword: {
        width: 270,
        height: 40,
        marginTop: 3,
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        color: "#4D6156",
    },

    buttonRegister: {
       width: 200, 
       height: 50,
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 50,
       marginTop: 30,
       backgroundColor:  "#F92E6A",
    },

    textButtonRegister: {
        color: "#FFF",
    },

    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    warninAlert: {
        paddingLeft: 10,
        color: "#F92E6A",
        fontSize: 16,
    },

    registration: {
        marginTop: 10,
        color: "#4d5156",
    },

    linkLogin: {
        color: "#F92E6A",
        fontSize: 16,
    },






});

export default styles;