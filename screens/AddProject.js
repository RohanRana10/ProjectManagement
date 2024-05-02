import { ActivityIndicator, Button, FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Searchbar, TextInput } from 'react-native-paper'
import { FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import filter from 'lodash.filter';
import CheckBox from 'expo-checkbox';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const URL = 'https://randomuser.me/api/?results=20';

export default function AddProject() {
    const [errors, setErrors] = useState({});

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [start, setStart] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);

    const [end, setEnd] = useState(new Date());
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [seachQuery, setSeachQuery] = useState('');
    const [searchLoading, setSearchLoading] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [fullSearchData, setFullSearchData] = useState('');

    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);

    const extractThumbnails = (selectedMembers, data) => {
        const thumbnailURLs = [];

        data.forEach(person => {
            if (selectedMembers.includes(person.login.username)) {
                thumbnailURLs.push(person.picture.thumbnail);
                console.log('url added')
            }
        });

        return thumbnailURLs;
    }

    const updateMemberList = (username) => {
        if (selectedMembers.includes(username)) {
            setSelectedMembers(selectedMembers.filter(item => item !== username));
        } else {
            setSelectedMembers([...selectedMembers, username]);
        }
    }

    const updateThubnailList = (url) => {
        if (thumbnails.includes(url)) {
            setThumbnails(thumbnails.filter(item => item !== url));
        } else {
            setThumbnails([...thumbnails, url]);
        }
    }


    const data = [
        { label: 'Web', value: 'web' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'UI', value: 'ui' },
        { label: 'Design', value: 'design' },
        { label: 'Testing', value: 'testing' },
    ];

    const [value, setValue] = useState(null);

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    useEffect(() => {
        setSearchLoading(true);
        fetchSearchData(URL);
    }, []);

    const fetchSearchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setSearchData(json.results);
            setFullSearchData(json.results);
            setSearchLoading(false);
            // console.log(json.results);
        } catch (error) {
            setSearchError(error);
            setSearchLoading(false);
            console.log(error);
        }
    }


    const toggleStartDatePicker = () => {
        setShowStartDatePicker(!showStartDatePicker);
    }

    const toggleEndDatePicker = () => {
        setShowEndDatePicker(!showEndDatePicker);
    }

    const handleSearch = (query) => {
        setSeachQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullSearchData, (user) => {
            return contains(user, formattedQuery);
        });
        setSearchData(filteredData);
    }

    const contains = ({ name, email }, query) => {
        const { first, last } = name;
        if (first.includes(query) || last.includes(query) || email.includes(query)) {
            return true;
        }
        else {
            return false;
        }
    }

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (January is 0) and pad with leading zero if necessary
        const year = date.getFullYear(); // Get full year

        return `${day}-${month}-${year}`;
    }

    const onStartDateChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setStart(currentDate);
            if (Platform.OS == 'android') {
                toggleStartDatePicker();
                setStartDate(formatDate(currentDate));
            }
        }
        else {
            toggleStartDatePicker();
        }
    }

    const onEndDateChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setEnd(currentDate);
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
        if (!username) {
            errors.username = "Username is required!";
        }
        if (!password) {
            errors.password = "Password is required!";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = () => {
        // if (validateForm()) {
        //     Keyboard.dismiss();
        // }
        console.log("title", title);
        console.log("desc", description);
        console.log("tag", tag);
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        console.log('Member Ids:', selectedMembers);

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView>
                <Text style={styles.heading}>New Project</Text>
                <Text style={{ paddingHorizontal: 18, marginTop: 8, fontWeight: '300', color: 'gray' }}>Welcome! Let's start by filling out the information below to create your new project.</Text>
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
                    {/* <TextInput
                    label="Tag"
                    value={tag}
                    mode={'outlined'}
                    maxLength={12}
                    outlineStyle={{
                        borderRadius: 12,
                        borderColor: errors.tag ? 'red' : '#6237A0'
                    }}
                    style={{ backgroundColor: 'white', marginTop: 10 }}
                    onChangeText={text => setTag(text)}
                /> */}

                    <Dropdown
                        style={{ ...styles.dropdown, borderColor: '#6237a0', borderWidth: 1 }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Tag"
                        value={tag}
                        onChange={item => {
                            setTag(item.value);
                        }}
                        renderItem={renderItem}
                    />

                    {showStartDatePicker &&
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={start}
                            onChange={onStartDateChange}
                        />
                    }

                    {!showStartDatePicker &&
                        <Pressable onPress={toggleStartDatePicker}>
                            <TextInput
                                label="Start Date"
                                value={startDate}
                                mode={'outlined'}
                                maxLength={12}
                                outlineStyle={{
                                    borderRadius: 12,
                                    borderColor: errors.tag ? 'red' : '#6237A0'
                                }}
                                style={{ backgroundColor: 'white', marginTop: 10 }}
                                onChangeText={setStartDate}
                                editable={false}
                            />
                        </Pressable>
                    }

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
                                label="End Date"
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

                    <Modal visible={isSearchModalVisible} animationType='slide' presentationStyle='pageSheet' onRequestClose={() => setIsSearchModalVisible(false)}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ flex: 1, backgroundColor: 'white' }}
                        >
                            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                                <Text style={{
                                    color: '#6237A0', fontSize: 24, fontWeight: 'bold',
                                }}>Add Members</Text>
                                <TouchableOpacity onPress={() => setIsSearchModalVisible(false)}>
                                    <Text style={{ fontSize: 17, fontWeight: '400' }}>Close</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginHorizontal: 15, marginVertical: 18, backgroundColor: 'white', height: '80%' }}>
                                {searchLoading ? (
                                    <ActivityIndicator size={'large'} color={'#6237a0'} />
                                ) : (
                                    <View style={{ height: '100%' }}>
                                        <Searchbar
                                            placeholder='Search People...'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            value={seachQuery}
                                            onChangeText={(query) => handleSearch(query)}
                                            style={{ backgroundColor: '#f2e6ff', borderRadius: 10 }}
                                        />
                                        {searchError ? (
                                            <Text style={{ marginTop: 12, alignSelf: 'center' }}>Error Fetching Members!</Text>
                                        ) : (
                                            <FlatList
                                                style={{ height: '100%', marginVertical: 2, }}
                                                data={searchData}
                                                keyExtractor={(item) => item.login.username}
                                                renderItem={({ item }) => (

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                        <TouchableOpacity onPress={() => {
                                                            updateMemberList(item.login.username)
                                                            updateThubnailList(item.picture.thumbnail)
                                                        }} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 12 }}>
                                                            <Image source={{ uri: item.picture.thumbnail }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                                            <View>
                                                                <Text style={{ fontSize: 17, marginLeft: 10, fontWeight: '600' }}>{item.name.first} {item.name.last}</Text>
                                                                <Text style={{ fontSize: 14, marginLeft: 10, color: 'gray', fontWeight: '300' }}>{item.email}</Text>
                                                            </View>

                                                        </TouchableOpacity>
                                                        <View>
                                                            <CheckBox
                                                                disabled={false}
                                                                value={selectedMembers.includes(item.login.username)}
                                                                onValueChange={(newValue) => {
                                                                    updateMemberList(item.login.username)
                                                                    updateThubnailList(item.picture.thumbnail)
                                                                }}
                                                                style={{ marginRight: 10 }}
                                                                color={'#6237a0'}
                                                            />
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        )}
                                    </View>

                                )}
                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <TouchableOpacity style={styles.modalButton} onPress={() => setIsSearchModalVisible(false)}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>SAVE CHANGES</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>

                    <View style={{ marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17 }}>Managers: <Text style={{ color: 'gray', fontWeight: '300' }}>{selectedMembers.length} Members</Text></Text>
                            <TouchableOpacity onPress={() => console.log("TODO: add manager functionality")}>
                                <Image source={require('../assets/Images/plus.png')} style={{
                                    width: 42, height: 42, borderRadius: 25,
                                    marginLeft: -18,
                                }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 0 }}>
                            {thumbnails.map((thumbnail, index) => {
                                return <Image key={index} source={{ uri: thumbnail }} style={{
                                    width: 50, height: 50, borderRadius: 25,
                                    marginLeft: index == 0 ? 0 : -18,
                                    borderWidth: 2.5,
                                    borderColor: 'white'
                                }} />
                            })}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17 }}>Team: <Text style={{ color: 'gray', fontWeight: '300' }}>{selectedMembers.length} Members</Text></Text>
                            <TouchableOpacity onPress={() => setIsSearchModalVisible(true)}>
                                <Image source={require('../assets/Images/plus.png')} style={{
                                    width: 42, height: 42, borderRadius: 25,
                                    marginLeft: -18,
                                }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 0 }}>
                            {thumbnails.map((thumbnail, index) => {
                                return <Image key={index} source={{ uri: thumbnail }} style={{
                                    width: 50, height: 50, borderRadius: 25,
                                    marginLeft: index == 0 ? 0 : -18,
                                }} />
                            })}
                        </ScrollView>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>CREATE</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
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
    form: {
        paddingHorizontal: 18
    },
    button: {
        backgroundColor: '#6237a0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 15,
        marginVertical: 18,
        // width: '47%',
    },
    modalButton: {
        backgroundColor: '#6237a0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 10,
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
    // icon: {
    //     marginRight: 5,
    // },
    item: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
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
})