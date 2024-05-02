import { ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const scrollViewRef = useRef();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log("Error while storing token:", error);
        }
    }

    const validateForm = () => {
        let errors = {};
        if (!username) {
            errors.username = "Username is required!";
        }
        if (!password) {
            errors.password = "Password is required!";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const login = async () => {

        setLoading(true);
        let BASE_URL = 'https://snake-promoted-duckling.ngrok-free.app';
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/login`,
            headers: {
                'username': username,
                'password': password
            }
        };

        axios.request(config)
            .then((response) => {
                if (response.data.status.statusCode !== 1) {
                    Alert.alert("Error", "Invalid Username and Password");
                    console.log(response.data);
                    setLoading(false);
                }
                else {
                    console.log("Got token:", response.data.data.userToken);
                    let token = response.data.data.userToken;
                    setToken(token);
                    navigation.replace('MainTabs');
                    setLoading(false);
                }

            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        // console.log("Username", username, "Password", password);
    }

    const handleSubmit = () => {
        if (validateForm()) {
            Keyboard.dismiss();
            login();
        }
    }
    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
                    <View style={styles.headingContainer}>
                        <Image source={require('../assets/Images/PLetter.png')} style={{ height: 30, width: 30, marginRight: 7 }} />
                        <Text style={styles.heading}>ProjectNest</Text>
                    </View>
                    <View style={styles.middleImageContainer}>
                        <Image resizeMode='contain' source={require('../assets/Images/MiddleImage.png')} style={styles.middleImage} />
                    </View>

                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#28104E' }}>Smart Task</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#28104E' }}>Management</Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: '#aaa', lineHeight: 20 }}>
                            Fuel your team's potential, effortlessly navigate projects, boost productivity!
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            label="Username"
                            value={username}
                            mode={'outlined'}
                            outlineStyle={{
                                borderRadius: 12,
                                borderColor: errors.username ? 'red': '#6237A0'
                            }}
                            style={{ backgroundColor: 'white' }}
                            onFocus={scrollToBottom}
                            onChangeText={text => setUsername(text)}
                        />
                        {errors.username && <Text style={{ marginTop: 5, color: 'red' }}>Username is required!</Text>}
                        <TextInput
                            label="Password"
                            value={password}
                            mode={'outlined'}
                            secureTextEntry={isPasswordVisible}
                            right={<TextInput.Icon icon={isPasswordVisible ? "eye" : "eye-off"} color={'#6237A0'} onPress={() => setIsPasswordVisible(prev => !prev)} forceTextInputFocus={false} />}
                            outlineStyle={{
                                borderRadius: 12,
                                borderColor: errors.password ? 'red': '#6237A0'
                            }}
                            style={{ backgroundColor: 'white', marginTop: 10 }}
                            textColor='#28104E'
                            onFocus={scrollToBottom}
                            onChangeText={text => setPassword(text)}
                        />
                        {errors.password && <Text style={{ marginTop: 5, color: 'red' }}>Password is required!</Text>}
                    </View>
                    {loading ? (
                        <View style={{ marginTop: 38 }}>
                            <ActivityIndicator size={'large'} color={'#6237A0'} />
                        </View>) : (
                        <View>
                            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>)}
                    <StatusBar style='auto' />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
    },
    heading: {
        color: '#6237A0',
        fontSize: 22,
        fontWeight: 'bold',
    },
    middleImageContainer: {
        marginTop: 20
    },
    formContainer: {
        marginTop: 20
    },
    middleImage: {
        width: '100%',
        height: 270,
        // backgroundColor: 'cyan'
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#6237A0',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 38,
        borderRadius: 12
    }
})