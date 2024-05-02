import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

export default function Profile() {
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.replace('SignIn');
        } catch (error) {
            console.log("Error logging out:", error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <Text style={styles.heading}>My Profile</Text>
            <View style={{ alignItems: 'center', marginTop: 20, backgroundColor: '#fff' }}>
                <View style={{
                    elevation: 4, shadowColor: 'black', height: 120,
                    width: 120,
                    borderRadius: 100,
                    marginBottom: 12,
                }}>
                    <Image source={require('../assets/Images/User.png')} style={styles.profileImage} />
                </View>
                <Text style={styles.profileName}>Rohan Rana</Text>
                <Text style={styles.profileDesignation}>Front-End Developer</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15, paddingHorizontal: 10 }}>
                <View style={{ ...styles.shadowContainer, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 13, width: '41%' }}>
                    <Text style={{ color: '#6237A0', fontWeight: 'bold', fontSize: 14 }}>150</Text>
                    <Text style={{ color: 'gray', fontWeight: 300, fontSize: 14 }}>Completed Tasks</Text>
                </View>
                <View style={{ ...styles.shadowContainer, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 13, width: '41%' }}>
                    <Text style={{ color: '#6237A0', fontWeight: 'bold', fontSize: 14 }}>26</Text>
                    <Text style={{ color: 'gray', fontWeight: 300, fontSize: 14 }}>Ongoing Tasks</Text>
                </View>
            </View>
            <View style={{ width: '100%', backgroundColor: '#f2e6ff', height: '52%', borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 15, justifyContent: 'center' }}>
                    <View style={styles.squareButton}>
                        <FontAwesome5 name="user-edit" size={22} color="#6237a0" />
                        <Text style={{ marginTop: 6, color: '#3d3d5c', fontSize: 13, fontWeight: 'bold' }}>Edit Profile</Text>
                    </View>

                    <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('TeamList')}>
                        <FontAwesome name="group" size={22} color="#6237a0"/>
                        <Text style={{ marginTop: 6, color: '#3d3d5c', fontSize: 13, fontWeight: 'bold' }}>My Team</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.squareButton} onPress={handleLogout}>
                        <AntDesign name="logout" size={22} color="#6237a0" />
                        <Text style={{ marginTop: 6, color: '#3d3d5c', fontSize: 13, fontWeight: 'bold' }}>Logout</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ alignItems: 'center', marginBottom: 25, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: "#6237a0", fontSize: 12, marginRight: 10 }}>All Rights Reserved © </Text>
                    <Image resizeMode='contain' source={require('../assets/Images/ResotechLogoBlack.png')} style={{ height: 40, width: 100 }} />
                </View>
            </View>
            {/* <Button title='Logout' onPress={handleLogout} /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        // paddingHorizontal: 18,
        backgroundColor: '#fff'
    },
    heading: {
        color: '#6237A0',
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 18,
        width: '75%'
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 100,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#330066',
        marginBottom: 5,
    },
    profileDesignation: {
        color: 'gray',
        fontWeight: '400'
    },
    shadowContainer: {
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 8,
    },
    squareButton: {
        width: 95,
        height: 95,
        backgroundColor: '#fff', margin: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    }
})