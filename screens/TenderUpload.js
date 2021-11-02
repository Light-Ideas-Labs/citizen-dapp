import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { IconButton } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker'
import * as Progress from 'react-native-progress';
// import { Theme } from "../../constants";
// const { COLORS, FONTS, SIZES } = Theme; // Theme
import { LinearGradient } from "expo-linear-gradient";
// import { FloatingAction } from "react-native-floating-action";
import { Icon } from "react-native-elements";
import styles from "./styles";

export default function ProjectUpoadScreen({ navigation }) {
  const [image, setImage] = useState(null);

  // useEffect( async() => {
  //   if(Platform.OS !== 'web') {

  //   }
  // })

  // state = { image: null };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };

  // todo add 
  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    alert(result.uri);
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  // let { image } = this.state;

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={{ marginBottom: 20, textStyle: 'wrap' }}>
          <Text>Requirements</Text>
          <Text>
            Kindly upload the certified copies of the documents below (PDF
            Format)
          </Text>
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}>
              <TouchableOpacity onPress={_pickDocument}>
                <Icon name="attach-file" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDoc}>
            <Text style={styles.itemText}>Business registration certificate</Text>
            <Progress.Bar progress={0.9} width={250} style={styles.progress}/>
            </View>
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity onPress={_pickDocument}>
              <Icon name="cancel" color='#ACACAC' size={26} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="sync" color='#ACACAC' size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}>
              <TouchableOpacity onPress={_pickDocument}>
                <Icon name="attach-file" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDoc}>
            <Text style={styles.itemText}>KRA Pin Certficate</Text>
            <Progress.Bar progress={0.3} width={250} style={styles.progress}/>
            </View>
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity>
              <Icon name="cancel" color='#ACACAC'  type="material" size={26} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="sync" color='#ACACAC' type="material" size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}>
              <TouchableOpacity onPress={_pickDocument}>
                <Icon name="attach-file" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDoc}>
            <Text style={styles.itemText}>Tax compliance certificate</Text>
            <Progress.Bar progress={3} width={250} style={styles.progress}/>
            </View>
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity>
              <Icon name="cancel" color='#ACACAC' size={26} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="sync" color='#ACACAC' size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}>
              <TouchableOpacity onPress={_pickDocument}>
                <Icon name="attach-file" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDoc}>
            <Text style={styles.itemText}>Copy of ID documents of the Directors</Text>
            <Progress.Bar progress={0.6} width={250} style={styles.progress}/>
            </View>
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity>
              <Icon name="cancel" color='#ACACAC' size={26} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="sync" color='#ACACAC' size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}>
              <TouchableOpacity onPress={_pickDocument}>
                <Icon name="attach-file" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDoc}>
            <Text style={styles.itemText}>Business permit</Text>
            <Progress.Bar progress={0.5} width={250} style={styles.progress}/>
            </View>
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity>
              <Icon name="cancel" color='#ACACAC' type="material" size={26} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="sync" color='#ACACAC' type="material" size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}>
              <TouchableOpacity onPress={_pickDocument}> 
                <Icon name="attach-file" size={26} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDoc}>
            <Text style={styles.itemText}>Company profile</Text>
            <Progress.Bar progress={0.1} width={250} style={styles.progress}/>
            </View>
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity>
              <Icon
                name="cancel"
                color='#ACACAC'
                type="material"
                size={26}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="sync"
                color='#ACACAC'
                type="material"
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <UploadItem/> */}
        {/* <Button title="Select Document" onPress={_pickDocument} /> */}

        {/* <View style={{ 'marginTop': 20}}>
          <Button
          title="Select Image"
          onPress={_pickImage} />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View> */}

        <View style={styles.button}>
          <TouchableOpacity
              onPress={() => 
              navigation.navigate('ConfirmationProposal')} >
            <View style={[styles.signIn]}>
              <LinearGradient
                colors={["#3A95FF", "#3A95FF"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "#fff" }]}>Submit</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
