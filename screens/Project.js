import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Project({ route }) {

    const { projectId } = route.params;
    const navigation = useNavigation();
    const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
    const [endDate, setEndDate] = useState();
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [end, setEnd] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const loadTaskInfo = (task) => {
        navigation.navigate('Task', { task: task });
    }

    let sampleTeam = [
        "https://randomuser.me/api/portraits/thumb/women/61.jpg",
        "https://randomuser.me/api/portraits/thumb/women/12.jpg",
        "https://randomuser.me/api/portraits/thumb/women/8.jpg",
        "https://randomuser.me/api/portraits/thumb/men/88.jpg"
    ];

    let sampleTasks = [
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

    const toggleEndDatePicker = () => {
        // console.log('toggle called');
        setShowEndDatePicker(!showEndDatePicker);
    }

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (January is 0) and pad with leading zero if necessary
        const year = date.getFullYear(); // Get full year

        return `${day}-${month}-${year}`;
    }

    const onEndDateChange = ({ type }, selectedDate) => {
        // console.log('end date change called')
        if (type == 'set') {
            const currentDate = selectedDate;
            setEnd(currentDate);
            console.log(currentDate);
            if (Platform.OS == 'android') {
                toggleEndDatePicker();
                setEndDate(formatDate(currentDate));
            }
        }
        else {
            toggleEndDatePicker();
        }
    }

    const toggleSubTask = () => {
        console.log('TODO: Toggle the subtask')
    }

    const handleSubmit = () => {
        console.log('Title:', title)
        console.log('Desc:', description);
        console.log('Deadline:', end);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>Project Title <Text>{projectId ? projectId : 0}</Text></Text>

            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Progress.Circle size={120} progress={0.6}
                    color='#07da63'
                    unfilledColor='#ddd'
                    showsText={true}
                    formatText={() => `50%`}
                    textStyle={{ color: '#28104e', fontWeight: 'bold' }}
                    strokeCap='round'
                    borderWidth={0}
                    thickness={15}
                />
                <View style={{ width: '48%' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>10 Members</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        {sampleTeam.map((thumbnail, index) => {
                            return <Image key={index} source={{ uri: thumbnail }} style={{
                                width: 45, height: 45, borderRadius: 25,
                                marginLeft: index == 0 ? 0 : -18,
                                borderWidth: 2.5,
                                borderColor: 'white'
                            }} />
                        })}
                        <TouchableOpacity onPress={() => console.log("TODO: redirect to edit project")}>
                            <Image source={require('../assets/Images/plus.png')} style={{
                                width: 45, height: 45, borderRadius: 25,
                                marginLeft: -18,
                                borderWidth: 2.5,
                                borderColor: 'white'
                            }} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View style={{ marginTop: 18 }}>
                <Text style={{ fontSize: 20, color: '#28104e', fontWeight: 900 }}>Description</Text>
                <Text style={{ marginTop: 8, color: '#6237a0', lineHeight: 17, fontWeight: 300, }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>

            <View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 900, fontSize: 25 }}>Tasks</Text>
                <TouchableOpacity onPress={() => setIsAddTaskModalVisible(true)}>
                    <Image source={require('../assets/Images/plus.png')} style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        borderWidth: 2.5,
                        borderColor: 'white'
                    }} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 2, fontSize: 13, color: 'gray', fontWeight: 300 }}>Select a task to view its associated sub-tasks</Text>
            <View style={{ height: '47%', paddingTop: 5 }}>
                <FlatList
                    data={sampleTasks}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => loadTaskInfo(item)} style={{ borderRadius: 15, elevation: 3, marginBottom: 10, marginHorizontal: 2, paddingVertical: 12, shadowColor: 'black', backgroundColor: 'white', paddingHorizontal: 10, marginTop: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ color: '#6237a0', fontWeight: 500, fontSize: 15 }}>{item}</Text>
                                    <Text style={{ marginTop: 5, color: 'gray', fontSize: 13 }}>15 Subtasks</Text>
                                </View>
                                <MaterialIcons name="task-alt" size={24} color="#07da63" />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <Modal
                visible={isAddTaskModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsAddTaskModalVisible(false)}
            >
                <View
                    style={styles.modalContainer}
                    activeOpacity={1}
                // onPress={onClose}
                >
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.modalHeading}>New Task</Text>
                            <TouchableOpacity onPress={() => setIsAddTaskModalVisible(false)}>
                                <Text style={{ fontSize: 15, fontWeight: '300' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            label="Title"
                            value={title}
                            mode={'outlined'}
                            outlineStyle={{
                                borderRadius: 12,
                                borderColor: errors.title ? 'red' : '#6237A0'
                            }}
                            style={{ backgroundColor: 'white', marginTop: 12 }}
                            onChangeText={text => setTitle(text)}
                        />
                        <TextInput
                            label="Description"
                            multiline
                            numberOfLines={4}
                            value={description}
                            mode={'outlined'}
                            outlineStyle={{
                                borderRadius: 12,
                                borderColor: errors.description ? 'red' : '#6237A0'
                            }}
                            style={{ backgroundColor: 'white', marginTop: 10 }}
                            onChangeText={text => setDescription(text)}
                        />

                        {showEndDatePicker &&
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={end}
                                onChange={onEndDateChange}
                                minimumDate={new Date()}
                            />
                        }

                        {!showEndDatePicker &&
                            <Pressable onPress={toggleEndDatePicker}>
                                <TextInput
                                    label="Deadline"
                                    value={endDate}
                                    mode={'outlined'}
                                    maxLength={12}
                                    outlineStyle={{
                                        borderRadius: 12,
                                        borderColor: errors.tag ? 'red' : '#6237A0'
                                    }}
                                    style={{ backgroundColor: 'white', marginTop: 10 }}
                                    onChangeText={setEndDate}
                                    editable={false}
                                />
                            </Pressable>
                        }
                        
                        <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>CREATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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

    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 18,
    },
    modalButton: {
        backgroundColor: '#6237a0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 15,
        marginTop: 18,
    },
    modalHeading: {
        color: '#6237A0',
        fontSize: 24,
        fontWeight: 'bold',
        // paddingHorizontal: 18,
    },
})