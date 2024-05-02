import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PendingTasks() {

    let samplePendingTasks = [
        {
            'projectId': 1001,
            'projectName': 'Project A',
            "taskTitle": 'write unit tests for feature X',
            "deadline": '12/12/2024'
        },
        {
            'projectId': 1002,
            'projectName': 'Project B',
            "taskTitle": 'debug issue in backend code',
            "deadline": '15/01/2025'
        },
        {
            'projectId': 1003,
            'projectName': 'Project C',
            "taskTitle": 'design user interface for new feature',
            "deadline": '28/02/2025'
        },
        {
            'projectId': 1004,
            'projectName': 'Project D',
            "taskTitle": 'optimize database queries',
            "deadline": '10/03/2025'
        },
        {
            'projectId': 1005,
            'projectName': 'Project E',
            "taskTitle": 'implement authentication system',
            "deadline": '20/04/2025'
        },
        {
            'projectId': 1006,
            'projectName': 'Project F',
            "taskTitle": 'write documentation for API endpoints',
            "deadline": '05/05/2025'
        },
        {
            'projectId': 1007,
            'projectName': 'Project G',
            "taskTitle": 'conduct code review for pull requests',
            "deadline": '30/06/2025'
        },
        {
            'projectId': 1008,
            'projectName': 'Project H',
            "taskTitle": 'test performance of application',
            "deadline": '25/07/2025'
        },
        {
            'projectId': 1009,
            'projectName': 'Project I',
            "taskTitle": 'update dependencies to latest versions',
            "deadline": '15/08/2025'
        },
        {
            'projectId': 1010,
            'projectName': 'Project J',
            "taskTitle": 'create user stories for upcoming sprint',
            "deadline": '10/09/2025'
        }
    ];

    const getProject = (projectId) => {
        console.log(`TODO: Load project with projectId: ${projectId}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Pending Tasks</Text>
            <View style={{ paddingTop: 5, paddingHorizontal: 8, marginBottom: 18}}>
                <FlatList
                contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}
                    data={samplePendingTasks}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => getProject(item.projectId)} style={{ borderRadius: 15, elevation: 3, marginBottom: 10, marginHorizontal: 10, paddingVertical: 18, shadowColor: 'black', backgroundColor: 'white', paddingHorizontal: 18, marginTop: 2, width: 170, height: 'auto'}}>
                            <Text style={{color: '#6237a0', fontWeight: '500', fontSize: 18, marginBottom: 10}}>{item.taskTitle}</Text>
                            <View style={{}}>
                                <Text style={{fontSize: 16, fontWeight: 300}}><Text style={{color: 'gray'}}>Project:</Text> {item.projectName}</Text>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <MaterialCommunityIcons name="calendar-clock-outline" size={20} color="red" />
                                    <Text style={{marginLeft: 6, fontWeight: 'bold'}}>{item.deadline}</Text>
                                </View>
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
        // paddingHorizontal: 18,
        backgroundColor: '#fff'
    },
    heading: {
        color: '#6237A0',
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 18,
    },
})