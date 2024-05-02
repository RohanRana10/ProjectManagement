import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';


export default function Home() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState(0);
    const [projects, setProjects] = useState([
        { name: "Rohan", id: 1 },
        { name: "Raman", id: 2 },
        { name: "Rishabh", id: 3 },
        { name: "Ravi", id: 4 },
        { name: "Vansh", id: 5 },
        { name: "Vishal", id: 6 },
        { name: "Jai", id: 7 },
        { name: "Rishi", id: 8 },
    ]);

    const loadProjectInfo = (id) => {
        navigation.navigate('Project',{projectId: id});
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 18 }}>
                <Text style={{ color: '#6237A0', fontSize: 24, fontWeight: 'bold', width: '75%' }}>Rohan's Dashboard</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <FontAwesome5 name="user" size={22} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ marginTop: 14 }}>
                <View style={{ width: '94%', height: 60, borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingRight: 5, backgroundColor: '#f2e6ff', alignSelf: 'center' }}>

                    <TouchableOpacity onPress={() => setSelectedTab(0)} style={{ width: '33.33%', height: 50, backgroundColor: selectedTab === 0 ? '#6237a0' : '#f2e6ff', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ color: selectedTab === 0 ? 'white' : '#6237A0', fontSize: 16, fontWeight: '700' }}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedTab(1)} style={{ width: '33.33%', height: 50, backgroundColor: selectedTab === 1 ? '#6237a0' : '#f2e6ff', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ color: selectedTab === 1 ? 'white' : '#6237A0', fontSize: 16, fontWeight: '700' }}>Ongoing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedTab(2)} style={{ width: '33.33%', height: 50, backgroundColor: selectedTab === 2 ? '#6237a0' : '#f2e6ff', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: selectedTab === 2 ? 'white' : '#6237A0', fontSize: 16, fontWeight: '700' }}>Completed</Text>
                    </TouchableOpacity>

                </View>

                {/* <ScrollView style={{marginBottom: 100}}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center'}}>
                        <View style={{...styles.projectContainer}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: 40}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: -10}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: 40}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: -10}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: 40}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: -10}}>
                        </View>
                        <View style={{...styles.projectContainer, marginTop: 40}}>
                        </View>
                    </View>
                </ScrollView> */}
                <View style={{ height: '90%' }}>
                    <FlatList
                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 20, backgroundColor: 'white' }}
                        data={projects} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => loadProjectInfo(item.id)} style={{ ...styles.projectContainer, marginTop: index % 2 === 0 ? -10 : 20 }}>
                                    <Progress.Circle size={40} progress={0.6}
                                        color='#07da63'
                                        unfilledColor='#ddd'
                                        // endAngle={0}
                                        strokeCap='round'
                                        borderWidth={0}
                                        thickness={7}
                                    />
                                    <Text style={{ marginVertical: 10, color: '#aaa', fontSize: 12 }}>15 Tasks</Text>
                                    {/* <Text style={{ fontWeight: '600', fontSize: 17, color: '#28104E', marginBottom: 18 }}>Performance Dashboard (Mobile App) </Text> */}
                                    <Text style={{ fontWeight: '600', fontSize: 17, color: '#28104E', marginBottom: 18 }}>Project Title </Text>
                                    <View style={{backgroundColor: '#f2e6ff', alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 8, paddingVertical: 5}}>
                                        <Text>Mobile</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        // ItemSeparatorComponent={<View style={{height: 0}}/>}
                        keyExtractor={(item) => item.id.toString()} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#fff'
    },
    projectContainer: {
        width: 150,
        minHeight: 200,
        // aspectRatio: 0.75,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 11,
        marginHorizontal: 10,
        // alignItems: 'center',
        color: 'black',
        paddingHorizontal: 15,
        paddingVertical: 20
    }
})