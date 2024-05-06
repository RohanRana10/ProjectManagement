import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function SubTask({item, index, onComponentOpen, onEdit, onDelete, toggle}) {
    const ref = useRef();

    const rightSwipe = (taskId) => {
        return (
            <View style={{ justifyContent: 'center', backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    onEdit(index);
                    ref.current.close();
                }} style={{ backgroundColor: '#3d7bed', marginLeft: 14, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                    <AntDesign name="edit" size={22} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {onDelete(index); ref.current.close()}} style={{ backgroundColor: 'red', marginLeft: 14, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                    <AntDesign name="delete" size={22} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        if(item.opened == false){
            ref.current.close();
        }
    })
    return (
        <Swipeable ref={ref} renderRightActions={() => rightSwipe(index)} onSwipeableOpen={() =>{ onComponentOpen(index); console.log('open')}}>
            <TouchableOpacity onPress={() => toggle(index)} style={{ borderRadius: 15, elevation: 3, marginBottom: 10, marginHorizontal: 3, paddingVertical: 12, shadowColor: 'black', backgroundColor: 'white', paddingHorizontal: 10, marginTop: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '90%' }}>
                        <Text style={{ color: '#6237a0', fontWeight: 500, fontSize: 15 }}>{item.title}</Text>
                        <Text style={{ marginTop: 5, color: 'gray', fontSize: 13, width: "95%" }}>Sub-task Description</Text>
                    </View>
                    <MaterialIcons name="task-alt" size={24} color="#07da63" />
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

const styles = StyleSheet.create({})