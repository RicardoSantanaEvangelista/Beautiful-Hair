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
        fontWeight: "bold",
    },

    img: {
        paddingBottom: 5,
    },

    inputEmail: {
        width: 300,
        height: 50,
        marginTop: 10,
        padding: 10,
        width: 300,
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
        height: 50,
        marginTop: 10,
        padding: 10,
        width: 270,
        marginLeft: "auto",
        marginRight: "auto",
        color: "#4D6156",
    },

    icon: {
        color: "black",
    },

    buttonLogin: {
       width: 200, 
       height: 50,
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 50,
       marginTop: 30,
       backgroundColor:  "#F92E6A",
    },

    textButtonLogin: {
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
        color:"#F92E6A",
        fontSize: 16,
    },

    registration: {
        marginTop: 20,
        color: "#4d5156",
    },

    linkSubscribe: {
        color: "#F92E6A",
        fontSize: 16,
    },






});

export default styles;