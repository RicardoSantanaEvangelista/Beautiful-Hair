import React from "react";

import{
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function ButtonAgendar({focused ,size, color}){
    return(
        <View style={[styles.conatiner,{backgroundColor: focused ? "#00F0FF" : "#E85989"}]}>
            <Text style={styles.text}>
               <Entypo name="plus" color={color} size={size}/>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    text: {
        color: "#FFF",
    },
});