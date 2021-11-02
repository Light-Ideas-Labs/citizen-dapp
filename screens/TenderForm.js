import React,{ Component, useState} from 'react'
import { web3, kit } from '../root'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Button, ScrollView, FlatList, Pressable, Image, Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
// import { FloatingAction } from "react-native-floating-action"
import { Icon } from 'react-native-elements'
import styles from "./styles"


export default function TenderForm({ navigation }){
    const [textInputValue, setTextInputValue] = useState('')

    return(
        <ScrollView>
        <View style = {styles.container}>
            <View style={styles.footer}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}>
            
            <Text>Posted on: 12/10/21021</Text>
            <Text>Reference No</Text>
            <TextInput
               style={{ 
                height: 40, 
                borderBottomColor: '#2D466F', 
                borderBottomWidth: 1,
                marginBottom: 20,
            }}
            onChangeText={text => setTextInputValue(text)}
            value={textInputValue}
            placeholder="UGC/RDS/RM/026/2020-2021" />

            <Text>Company name</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                autoComplete
                multiline
                placeholder="Bricks Stationeries Limited"
                underlineColorAndroid="transparent" />
            
            <Text>Category</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                multiline
                placeholder="Delivery"
                underlineColorAndroid="transparent" />
            
            <Text>Task title</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                multiline
                numberOfLines={4}
                placeholder="Stationery supply"
                underlineColorAndroid="transparent" />
            
            <Text>Description</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                placeholder="Supply of 200 notebooks and 100 pens."
                underlineColorAndroid="transparent" />

            <Text>Project Timline</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                placeholder="2 weeks"
                underlineColorAndroid="transparent" />

            <Text>Cost</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                placeholder="Kshs. 20,000"
                underlineColorAndroid="transparent" />

            <Text>Qualifications</Text>
            <TextInput
                style={{ 
                    height: 40,
                    borderBottomColor: '#2D466F', 
                    borderBottomWidth: 1,  
                    marginBottom: 20 }}
                placeholder="Must be a legally registered company"
                underlineColorAndroid="transparent" />

            <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} 
                onPress={() => 
                navigation.navigate('TenderUpload')}>
                    <LinearGradient colors={["#3A95FF", "#3A95FF"]} style={styles.signIn}>
                        <Text style={[ styles.textSign, { color: "#fff" }, ]}>
                            Next
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
            </View>
        </View>
        </ScrollView>
    )
}
