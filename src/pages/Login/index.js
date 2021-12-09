import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from "react-native";

import firebase from "../../config/firebase";
import styles from "./styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"; 

export default function Login({ navigation}){
    
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");

    const [errorLogin, setErrorLogin] = useState("");
    const [hidePass, setHidePass] = useState(true);
    const [messageLoginError, setMessageLoginError] = useState("");


    function requiredFields() {
        if (!email || !password) {
          return false; }
        else
          return true;
      }

      const database = firebase.firestore();

    const loginFirebase = () => {
        if (!requiredFields()) {
            setMessageLoginError('Todos os campos são de \npreenchimento obrigatório!');
            setErrorLogin(true);
          } else {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                database.collection('Perfis').doc(userCredential.user.uid).get()
                .then((dadosPerfil) => {
                global.idUsuario = userCredential.user.uid;
                global.nomeUsuario = dadosPerfil.data().nome;
                global.emailUsuario = dadosPerfil.data().email;
                global.telefoneUsuario = dadosPerfil.data().telefone;
                global.tipoUsuario = dadosPerfil.data().tipoUsuario;
              });

              navigation.replace("Routes", {
                screen: "Home",
                params: {uid: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email}
            });
      
            })
            .catch((error) => {
                //let errorCode = error.code;
                //let errorMessage = error.message;
                switch (error.code) {
                    case 'auth/wrong-password':
                      setMessageLoginError('"Senha" inválida!');
                      break;
                    case 'auth/user-not-found':
                      setMessageLoginError('"E-mail" (Usuário) não cadastrado!');
                      break;
                    case 'auth/too-many-requests':
                      setMessageLoginError('Bloqueio temporário. Várias tentativas\ncom senha inválida. Tente mais tarde!');
                      break;
                    case 'auth/user-disabled':
                      setMessageLoginError('Conta de e-mail desativada. Contacte\no administrador do sistema!');
                      break;
                    default:
                      setMessageLoginError('"Email" e/ou "Senha" inválidos!');
        
                  }
                  setErrorLogin(true);
            });
        };
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar
                barStyle = "dark-content"
                hidden = {false}
                backgroundColor = "#FFF"
                translucent = {false}
                networkActivityIndicatorVisible = {true}
            />

            <Image 
                style={styles.img}
                source={require('../../img/BHimg.png')}
            />

            <Text style={styles.title}>Beautiful Hair</Text>
            
            <TextInput 
                style={styles. inputEmail}
                placeholder="E-mail"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <View style={styles.inputArea}>
                <TextInput 
                    style={styles.inputPassword}
                    secureTextEntry={hidePass}
                    placeholder="Senha"
                    type="text"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                    {hidePass 
                        ?
                            <Ionicons name="eye" color="#F92E6A" size={25}/>
                        :
                            <Ionicons name="eye-off" color="#F92E6A" size={25}/>
                    }
                </TouchableOpacity>
            </View>

            {errorLogin === true
            ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#F92E6A"
                    />
                    <Text style={styles.warninAlert}>{messageLoginError}</Text>
                </View>
            :
                <View></View>
            }

            {email === "" || password === "" 
            ?
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonLogin}
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginFirebase}
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            }

            <Text style={styles.registration}>
                Ainda não está cadastrado? 
                <Text 
                    style={styles.linkSubscribe}
                    onPress={() => navigation.navigate("Cadastrar")}
                >
                {" "}Cadastra-se!</Text>
            </Text>

            <View style={{height:100}}></View>
            
        </KeyboardAvoidingView>
    );
}