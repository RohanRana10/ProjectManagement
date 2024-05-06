import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HalfScreenModal from '../components/HalfScreenModal';
import { AntDesign, Feather, FontAwesome5, Foundation, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import SubTask from '../components/SubTask';
import { Divider } from '../components/Divider';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default function Task({ route }) {
    const { task } = route.params;
    const ref = useRef();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [subtasks, setSubtasks] = useState([
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
        { title: "Write unit tests for feature X", opened: false },
    ]);

    // let sampleSubTasks = [
    //     "Refactor code for module Y",
    //     "Review pull requests from team members",
    //     "Attend daily stand-up meeting",
    //     "Research new technology/framework",
    //     "Implement feature Z based on user story",
    //     "Optimize database queries",
    //     "Create documentation for API endpoints",
    //     "Fix bugs reported by QA team",
    //     "Deploy latest version to production",
    //     "Create documentation for API endpoints",
    //     "Fix bugs reported by QA team",
    //     "Deploy latest version to production",
    //     "Create documentation for API endpoints",
    //     "Fix bugs reported by QA team",
    //     "Deploy latest version to production",
    // ];

    const toggleSubTask = (index) => {
        console.log(`TODO: Toggle subtask of index ${index}`);
    }

    const openComponent = (ind) => {
        let tempData = subtasks;
        tempData.map((item, index) => {
            if (index == ind) {
                item.opened = true;
            }
            else {
                item.opened = false;
            }
        });
        let temp = [];
        tempData.map((item) => {
            temp.push(item);
        });
        setSubtasks(temp);
    }

    // const leftSwipe = () => {
    //     return (
    //         <View style={{justifyContent: 'center', backgroundColor: '#fff',marginBottom: 10, marginRight: 10}}>
    //         <TouchableOpacity style={{backgroundColor: '#6237a0', width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
    //         <AntDesign name="edit" size={22} color="white" />
    //         </TouchableOpacity>
    //     </View>
    //     )
    // }

    // const rightSwipe = (taskId) => {
    //     return (
    //         <View style={{ justifyContent: 'center', backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
    //             <TouchableOpacity onPress={() => {
    //                 console.log(`TODO: edit sub-task: ${taskId}`);
    //                 ref.current.close();
    //             }} style={{ backgroundColor: '#3d7bed', marginLeft: 14, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
    //                 <AntDesign name="edit" size={22} color="white" />
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => console.log(`TODO: delete sub-task: ${taskId}`)} style={{ backgroundColor: 'red', marginLeft: 14, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
    //                 <AntDesign name="delete" size={22} color="white" />
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    const deleteDubtask = (index) => {
        console.log(`Deleting subtask: ${index}`)
    }
    const editSubtask = (index) => {
        console.log(`Editing subtask: ${index}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <View style={{ alignSelf: 'flex-end' }}>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                        }
                    }}>
                        <AntDesign name="setting" size={24} color="black" />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsContainer: {
                            borderRadius: 10,
                            marginTop: 30,
                        }
                    }}>
                        <MenuOption onSelect={() => alert(`View Project`)}>
                            <View style={{ paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                                <Text style={{ }}>View Project</Text>
                                {/* <FontAwesome5 name="project-diagram" size={24} color="#6237a0" /> */}
                                <Foundation name="graph-trend" size={24} color="#6237a0" />
                            </View>
                        </MenuOption>
                        <Divider />
                        <MenuOption onSelect={() => alert(`Edit`)}>
                            <View style={{ paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                                <Text style={{ }}>Edit Task</Text>
                                <Feather name="edit-3" size={24} color="#3d7bed" />
                            </View>
                        </MenuOption>
                        <Divider />
                        <MenuOption onSelect={() => alert(`Delete`)} >
                            <View style={{ paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                                <Text style={{ }}>Delete Task</Text>
                                <AntDesign name="delete" size={24} color="red" />

                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="back" size={26} color="#6237a0" />
                </TouchableOpacity>
                <Text style={styles.heading}>{task ? task : "Task Title"}</Text>
            </View>
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
            <View style={{ paddingTop: 5, height: '52%' }}>
                <FlatList
                    data={subtasks}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => (
                        <SubTask item={item} index={index} toggle={toggleSubTask} onComponentOpen={x => openComponent(x)} onDelete={deleteDubtask} onEdit={editSubtask} />
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
        marginTop: 5,
        width: '80%'
    },
})