import { FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import HalfScreenModal from '../components/HalfScreenModal';
import { StatusBar } from 'expo-status-bar';


export default function AddTask() {

    const navigation = useNavigation();

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

    const [errors, setErrors] = useState({});

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [end, setEnd] = useState(new Date());

    const [modalVisible, setModalVisible] = useState(false);

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
            <StatusBar style='auto'/>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                <Text style={styles.heading}>New Task</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 15, fontWeight: '300' }}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ paddingHorizontal: 18, marginTop: 8, fontWeight: '300', color: 'gray' }}>Craft your next task by filling in the details below.</Text>
            <View style={styles.form}>
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
            </View>
            <View style={{ marginTop: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 900, fontSize: 25 }}>Sub-Tasks</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image source={require('../assets/Images/plus.png')} style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                    }} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginHorizontal: 18, marginTop: 4, fontSize: 13, color: 'gray', fontWeight: 300 }}>Enhance your task by adding sub-tasks for greater detail and organization.</Text>
            <HalfScreenModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <View style={{ height: '35%', paddingTop: 5, paddingHorizontal: 8 }}>
                <FlatList
                    data={sampleSubTasks}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => toggleSubTask()} style={{ borderRadius: 15, elevation: 3, marginBottom: 10, marginHorizontal: 10, paddingVertical: 12, shadowColor: 'black', backgroundColor: 'white', paddingHorizontal: 10, marginTop: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ color: '#6237a0', fontWeight: 500, fontSize: 15 }}>{item}</Text>
                                    <Text style={{ marginTop: 5, color: 'gray', fontSize: 13, width: "95%" }}>Sub-task Description</Text>
                                </View>
                                {/* <MaterialIcons name="task-alt" size={24} color="#07da63" /> */}
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>CREATE</Text>
            </TouchableOpacity>
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
        // paddingHorizontal: 18,
    },
    form: {
        paddingHorizontal: 18
    },
    button: {
        backgroundColor: '#6237a0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 15,
        marginTop: 28,
        marginHorizontal: 18
    },
})