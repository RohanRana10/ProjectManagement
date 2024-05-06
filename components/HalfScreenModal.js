import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Image, Pressable, Platform, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const HalfScreenModal = ({ isVisible, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [endDate, setEndDate] = useState();
    const [end, setEnd] = useState(new Date());

    const data = [
        { label: 'Pending', value: 'pending' },
        { label: 'Complete', value: 'complete' },

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

    const validateForm = () => {
        let errors = {};
        if (!title) {
            errors.title = "Username is required!";
        }
        if (!description) {
            errors.description = "Description is required!";
        }
        if (!endDate) {
            errors.endDate = "End Date is required!";
        }
        if (!status) {
            errors.status = "Status is required!";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = () => {
        if (validateForm()) {
            Keyboard.dismiss();
            onClose();
        }
        console.log("sub task title:", title);
        console.log("sub task description", description);
        console.log("sub task status", status);
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View>
            <StatusBar style='auto' />
            <Modal
                visible={isVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View
                    style={styles.modalContainer}
                    activeOpacity={1}
                // onPress={onClose}
                >
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 8 }} onPress={onClose}>
                                <AntDesign name="back" size={26} color="#6237a0" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeading}>New Sub-Task</Text>
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
                        {errors.title && <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="warning" size={24} color="red" /><Text style={{ color: 'black', marginLeft: 5 }}>Title is required!</Text></View>}

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
                        {errors.description && <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="warning" size={24} color="red" /><Text style={{ color: 'black', marginLeft: 5 }}>Description is required!</Text></View>}

                        {showEndDatePicker &&
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={end}
                                onChange={onEndDateChange}
                                minimumDate={new Date()}
                            />
                        }

                        {!showEndDatePicker && <View>
                            <Pressable onPress={toggleEndDatePicker}>
                                <TextInput
                                    label="Deadline"
                                    value={endDate}
                                    mode={'outlined'}
                                    maxLength={12}
                                    outlineStyle={{
                                        borderRadius: 12,
                                        borderColor: errors.endDate ? 'red' : '#6237A0'
                                    }}
                                    style={{ backgroundColor: 'white', marginTop: 10 }}
                                    onChangeText={setEndDate}
                                    editable={false}
                                />
                            </Pressable>
                            {errors.endDate && <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="warning" size={24} color="red" /><Text style={{ color: 'black', marginLeft: 5 }}>End Date is required!</Text></View>}
                        </View>
                        }
                        <Dropdown
                            style={{ ...styles.dropdown, borderColor: errors.status ? 'red' : '#6237a0', borderWidth: 1 }}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Status"
                            value={status}
                            onChange={item => {
                                setStatus(item.value);
                            }}
                            renderItem={renderItem}
                        />
                        {errors.status && <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons name="warning" size={24} color="red" /><Text style={{ color: 'black', marginLeft: 5 }}>Status is required!</Text></View>}

                        <View style={{ marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17 }}>Task assigned to: <Text style={{ color: 'gray', fontWeight: '300' }}>{"2"} People</Text></Text>
                                <TouchableOpacity onPress={() => console.log("TODO: open search modal to select people")}>
                                    <Image source={require('../assets/Images/plus.png')} style={{
                                        width: 42, height: 42, borderRadius: 25,
                                        marginLeft: -18,
                                    }} />
                                </TouchableOpacity>
                            </View>
                            {/* <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 0 }}>
                                {thumbnails.map((thumbnail, index) => {
                                    return <Image key={index} source={{ uri: thumbnail }} style={{
                                        width: 50, height: 50, borderRadius: 25,
                                        marginLeft: index == 0 ? 0 : -18,
                                    }} />
                                })}
                            </ScrollView> */}
                        </View>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>CREATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
    dropdown: {
        marginTop: 15,
        height: 52,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,

        // elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    item: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default HalfScreenModal;
