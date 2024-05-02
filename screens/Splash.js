import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import ProgressBar from 'react-native-progress/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
    const navigation = useNavigation();

    const handleScreenVisibility = async () => {
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            navigation.replace('SignIn');
        }
        else {
            navigation.replace('MainTabs');
        }
    }
    useEffect(() => {
        const exitSplashScreen = () => {
            let timer = setTimeout(() => {
                handleScreenVisibility();
            }, 2500);

            return () => clearTimeout(timer);
        }
        exitSplashScreen();
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            {/* <Image source={require('../assets/Images/Logo.png')} style={styles.logo} /> */}
            <View style={styles.headingContainer}>
                <Image source={require('../assets/Images/PLetter.png')} style={{ height: 30, width: 30, marginRight: 7 }} />
                <Text style={styles.heading}>ProjectNest</Text>
            </View>
            <View style={{position: 'absolute', bottom: 70, alignItems: 'center', backgroundColor: 'white'}}>
                <Text style={{color: "#aaa", fontSize: 15, marginLeft: 20}}>from</Text>
                <Image  resizeMode='contain' source={require('../assets/Images/ResotechLogoBlack.png')} style={{height: 50, width: 130}}/>
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <ProgressBar
                    indeterminate
                    width={null}
                    borderWidth={0}
                    color="purple"
                    height={7}
                    borderRadius={10}
                    animationType={'decay'}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 100,
    },
    heading: {
        color: '#6237A0',
        fontSize: 25,
        fontWeight: 'bold',
    },
})