import React, {useState} from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
} from "react-native";

import { FontAwesome } from '@expo/vector-icons'; 
import styles from "./styles";

export default function Home({route}){    
  
    const[name, setName] = useState(route.params.name);
    
    return(
        <View style={styles.container}>

            <StatusBar
                barStyle = "dark-content"
                hidden = {false}
                backgroundColor = "#FFF"
                translucent = {false}
                networkActivityIndicatorVisible = {true}
            />

            <Image 
                style={styles.img}
                source={require('../../../img/BHimg.png')}
            />
             <Text style={styles.title}>"{name}" seja</Text>
            <Text style={styles.title}>Bem-Vinda(o)  {"\n"}ao{"\n"}Beautiful Hair !</Text>
            <Text style={styles.agendarHorario}>
                    "Não perca tempo, agende seu horário !" {"\n"}
                <FontAwesome name="arrow-down" size={30} color='#F92E6A'/>
            </Text>
        </View>
        
    );
}