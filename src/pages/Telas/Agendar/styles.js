import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 20,
    },
    
    title: {
        color: "#F92E6A",
        fontSize: 35,
        paddingBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
       
    },

    containerPicker:{
        backgroundColor: "#F92E6A",
        width: "95%",
        height: "10%",
        alignSelf: "center",
        borderRadius: 10,

    },

    picker:{
        width: 300,
        height: 45,
        borderWidth: 2,
        alignSelf: "center",
        color: "#FFF",

    }, 

    DataHoraContainer: {
        flexDirection: "row",   
    },

    titleData: {
        color: "#F92E6A",
        paddingLeft: 50,
        fontSize: 30,
        fontWeight: "bold",
    },

    titleHorario:{
        color: "#F92E6A",
        paddingLeft: "20%",
        marginLeft: 50,
        fontSize: 30,
        fontWeight: "bold",
    },

    contaiberCentral: {
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        paddingTop: 10,
    },

    dataContainer: {
        width: "50%",
        height: "100%",
        backgroundColor:"#F92E6A",
        alignItems: "center",
        borderRadius: 10,
    },
    
    datePicker: {
        color: "#FFF",
    },

    containerHora:{
        width: "50%",
        marginLeft: 1,
        paddingLeft: 10,
        height: "100%",
        flexDirection: "row",
        backgroundColor: "#F92E6A",
        borderRadius: 10,
    },

    pickerHora: {
        width: "80%",
        marginTop: 5,
        color: "#FFF",
    },

    pickerRelogio: {
        marginTop: 8,
        marginRight: 10,
        width: "20%",
    },

    tileObs: {
        marginTop: 10,
        color: "#F92E6A",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },

    containerObs: {
        marginTop: 10,
        backgroundColor: "#F92E6A",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
    },

    pickerObs: {
        width: 300,
        height: 45,
        borderWidth: 2,
        alignSelf: "center",
        color: "#FFF",
    },

    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    warningAlert: {
        paddingLeft: 10,
        color:"#F92E6A",
        fontSize: 12,
    },

    buttonagendar:{
        width: 200, 
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 50,
        marginTop: 20,
        backgroundColor:  "#F92E6A",
    },

    textAgendar: {
        color: "#FFF",
    },
});

export default styles;