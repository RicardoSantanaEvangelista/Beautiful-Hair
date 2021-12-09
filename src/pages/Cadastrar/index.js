import React, {useState} from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from "react-native";

import styles from "./styles";
import firebase from "../../config/firebase";
import { TextInputMask } from "react-native-masked-text";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"; 

export default function Cadastrar({ navigation }){
    
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const [confiPassword, setConfiPassword] = useState("");
    
    
    const [typeUser, setTypeUser] = useState("cliente");
    const [errorRegister, setErrorRegister] = useState("");
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);
    const [messageRegisterError, setMessageRegisterError] = useState("");

    const database = firebase.firestore();

    function requiredFields() {
        if (!name || !phone || !email ||
          !password || !confiPassword)
          return false;
        else
          return true;
      }

      function validPassword() {
        if (password !== confiPassword)
          return false;
        else
          return true;
      }

    const register = () => {
        if (!requiredFields()) {
            setMessageRegisterError('Todos os campos são de \npreenchimento obrigatório!');
            setErrorRegister(true);
          }
        else {
            if (!validPassword()) {
              setMessageRegisterError('Os campos "Senha" e "Confirma Senha" \nnão coincidem!');
              setErrorRegister(true);
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            let userName = name,
                                userEmail = email;

                        userCredential.user.updateProfile({
                            displayName: name,
                        });
            
                        database.collection("Perfis").doc(userCredential.user.uid).set({
                            nome: name,
                            email: email,
                            telefone: phone,
                            tipoUsuario: typeUser,
                        })

                        global.idUsuario = userCredential.user.uid;
                        global.emailUsuario = email;
                        global.nomeUsuario = name;
                        global.telefoneUsuario = phone;
                        global.tipoUsuario = typeUser;

                        setName(""),
                        setEmail(""),
            
                        navigation.replace("Routes", {
                            screen: "Home",
                            params: {uid: userCredential.user.uid, name: userName, email: userEmail}
                        });
                    })
                    .catch((error) => {
                        if (error.code === 'auth/email-already-in-use')
                            setMessageRegisterError('"E-mail" (Usuário) já cadastrado!');
                        else
                            setMessageRegisterError('"E-mail" e/ou "Senha" inválidos!\n(Senha com mínimo de 6 caracteres)');
                            setErrorRegister(true);
                        //let errorCode = error.code;
                        //let errorMessage = error.message;
                    });
            }
        }
    };

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


            <Text style={styles.title}>Cadastrar-se</Text>

            <TextInput 
                style={styles.input}
                placeholder="Nome"
                type="text"
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <TextInputMask
                style={styles.input}
                type={'cel-phone'}
                options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: '(99) ',
                }}
                placeholder="Telefone"
                keyboardType= "numeric"
                onChangeText={(text) => setPhone(text)}
                value={phone}
            />

            <TextInput 
                style={styles.input}
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

            <View style={styles.inputArea}>
                <TextInput 
                    style={styles.inputPassword}
                    secureTextEntry={hidePassConfirm}
                    placeholder="Comfirmar a senha"
                    type="text"
                    onChangeText={(text) => setConfiPassword(text)}
                    value={confiPassword}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setHidePassConfirm(!hidePassConfirm)}>
                    {hidePassConfirm 
                        ?
                            <Ionicons name="eye" color="#F92E6A" size={25}/>
                        :
                            <Ionicons name="eye-off" color="#F92E6A" size={25}/>
                    }
                </TouchableOpacity>
            </View>

            {errorRegister === true
            ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#F92E6A"
                    />
                    <Text style={styles.warninAlert}>{messageRegisterError}</Text>
                </View>
            :
                <View></View>
            }

            {!requiredFields()
            ?
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonRegister}
                >
                    <Text style={styles.textButtonRegister}>Cadastar</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => (
                        register()
                    )}
                >
                    <Text style={styles.textButtonRegister}>Cadastrar</Text>
                </TouchableOpacity>
            }

            <Text style={styles.registration}>
               Já está cadastrado?
                <Text 
                    style={styles.linkLogin}
                    onPress={() => navigation.navigate("Login")}
                >
                {" "}Acesse!</Text>
            </Text>

            <View style={{height:100}}></View>



        </KeyboardAvoidingView>
    );
}