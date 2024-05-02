import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HalfScreenModal from '../components/HalfScreenModal';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Task({ route }) {
    const { task } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    let sampleSubTasks = [
        "Write unit tests for feature X",
        "Refactor code for module Y",
        "Review pull requests from team members",
        "Attend daily stand-up meeting",
        "Research new technology/framework",
        "Implement feature Z based on user story",
        "Optimize database queries",
        "Create documentation for API endpoints",
        "Fix bugs reported by QA team",
        "Deploy latest version to production",
        "Create documentation for API endpoints",
        "Fix bugs reported by QA team",
        "Deploy latest version to production",
        "Create documentation for API endpoints",
        "Fix bugs reported by QA team",
        "Deploy latest version to production",
    ];
    const toggleSubTask = () => {
        console.log('TODO: Toggle the subtask')
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>{task ? task : "Task Title"}</Text>
            <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 20, color: '#28104e', fontWeight: 900 }}>Description</Text>
                <Text style={{ marginTop: 8, color: '#6237a0', lineHeight: 17, fontWeight: 300, }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
            <View style={{ marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 900, fontSize: 25 }}>Sub-Tasks</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image source={require('../assets/Images/plus.png')} style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                    }} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 10, fontSize: 13, color: 'gray', fontWeight: 300 }}>Enhance your task by adding sub-tasks for greater detail and organization.</Text>
            <HalfScreenModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <View style={{ paddingTop: 5 }}>
                <FlatList
                    data={sampleSubTasks}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => toggleSubTask()} style={{ borderRadius: 15, elevation: 3, marginBottom: 10, marginHorizontal: 3, paddingVertical: 12, shadowColor: 'black', backgroundColor: 'white', paddingHorizontal: 10, marginTop: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ color: '#6237a0', fontWeight: 500, fontSize: 15 }}>{item}</Text>
                                    <Text style={{ marginTop: 5, color: 'gray', fontSize: 13, width: "95%" }}>Sub-task Description</Text>
                                </View>
                                <MaterialIcons name="task-alt" size={24} color="#07da63" />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 18,
        backgroundColor: '#fff'
    },
    heading: {
        color: '#6237A0',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5
    },
})