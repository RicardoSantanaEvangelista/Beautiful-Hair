import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 5,
    },
    
    title: {
        color: '#F92E6A',
        fontSize: 35,
        textAlign: "center",
    },

    agendamentos:{
        width: "98%",
        flexDirection: "row-reverse",
        alignSelf: "center",
        backgroundColor: '#F92E6A',
        marginTop: 5,
        borderRadius: 5,
    },

    deleteAgendamentos:{
        width: "10%",
        height: 40,
        backgroundColor: "#1E1B1B",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 3,
    },

    textAgendamentos: {
        width: "90%",
        height: "100%",
        color: "white",
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },

    titleNome: {
        fontWeight: "bold",
        fontSize: 17,
    },

    titleDados: {
        fontWeight: "bold",
        fontSize: 17,
    },
});

export default styles;