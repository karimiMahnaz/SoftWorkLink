import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon0 from 'react-native-vector-icons/MaterialCommunityIcons';
///import {Picker} from '@react-native-picker/picker';

import {styles} from '../styles/ticketScreen';
import {CustomText, MyStatusBar} from '../components';
import ItemSeparator from '../components/itemSeparator';
import {saveTicket, getProjects} from '../../api/ticket';
import noImage from '../assets/favicon.png';

const TicketScreen = ({navigation}) => {
  const [ticketText, setTicketText] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);

  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [ticket,setTicket] = useState(null);

  //// const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const richText = useRef();

  const GfGToast = toasText => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        toasText,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      Alert.alert(toasText);
    }
  };

  useEffect(() => {
    const checkForNet = async () => {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        if (!state.isConnected) {
          GfGToast('please connect to the internet');
        }
      }
    };
    checkForNet();
  }, []);

  useEffect(() => {
   // GfGToast('Connecting...');

    try {
      const readStorage = async () => {
        const mail = await AsyncStorage.getItem('email');
            setEmail(JSON.parse(mail));
          

        if (mail !== null && mail !=='' && projectList.length === 0) {
            let data0 = await getProjects(mail);
            
            if (data0) {
              for (let i = 0; i < data0.length ; i++) {

                const projectItem = {
                  value: (projectList[(i, 0)] = data0[i].projectId),
                  label: (projectList[(i, 1)] = data0[i].projectName),
                };
               if (projectItem.label !== undefined){
                  projectList.push(projectItem);
               //   console.log('projectList0', projectList)
               } else {
                GfGToast('Please Login to Access..');
              }
              }
              setProjectList(projectList.filter(item => item.label !== undefined));
             
            }
        }
    }
      readStorage();

    } catch (err) {
      GfGToast('Connection error');
      console.log(err);
    }
  }, [setEmail]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );

        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = useCallback(async type => {
    if (email === null) {
      GfGToast('Please Login first!');
      return;
    }
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    let selectedImage = null;

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);

        setAttachedImage(response.assets[0]);
      });
    }
  }, []);

  const chooseFile = useCallback(async type => {
    if (email === null) {
      GfGToast('Please Login first!');
      return;
    }

    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    let selectedImage = null;

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      //console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);

      setAttachedImage(response.assets[0]);
    });
  }, []);

  const showModal = () => {
    if (email === null) {
      GfGToast('Please Login first!');
      return;
    }

    setVisible(true);
    Alert.alert(
      'Avator Picker',
      '',
      [
        {
          text: 'Choose Image',
          onPress: () => chooseFile('photo'),
        },
        {
          text: 'Launch Camera for Image',
          onPress: () => captureImage('photo'),
        },
        {
          text: 'Cancel',
          //   onPress: () => Alert.alert("Cancel Pressed"),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  };

  

  const handleSendButton = async() => {
    if (email === null) {
      GfGToast('Please Login first!');
      return;
    }

    if(showDescError) {
      GfGToast('Please input description!');
      return;
    }
    
    try{
      console.log('projectName999', projectName)
      console.log('setTicket', ticket)
        const status = await saveTicket(email, attachedImage, projectId, ticket) ;
           
        if (status === 200) {    
           GfGToast('Ticket is sent!');
    
       } else {
           GfGToast( 'Ticket is failed');
    
            }
  
      }
     catch(err){
           console.log(err);
     }
    // Implement your logic for submitting the ticket and attached image
    console.log('Ticket Text:', ticket);
    console.log('Attached Image:', attachedImage);
    // Clear the form after submission
    setTicketText('');
    setAttachedImage(null);
    GfGToast("Ticket Sent! You will get a response soon in your email box.")
  };

  const handleCancelButton = () => {
    setTicketText('');
    setAttachedImage(null);

    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const handleRichTextChange = async descriptionText => {
    
    if (descriptionText) {
      setShowDescError(false);
      setTicket(descriptionText);
    } else {
      setShowDescError(true);
      setTicket('');
    }
  };

  const submitContentHandle = () => {
    /// const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
      console.log('ShowDescError' , showDescError)
      return;
    } else {
      console.log('ProjectName' , projectName)
      // send data to your server!
    }
  };
  
  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}>
      <MyStatusBar
        backgroundColor="rgb(181,181,201)"
        barStyle="light-content"
      />
        <TouchableOpacity
                style={styles.icon0}
                onPress={() => navigation.navigate('Home')}>
                <Icon0  style={styles.icon0} name={'keyboard-backspace'} size={18} color="royalblue" />
       </TouchableOpacity> 
    <View  style={styles.container}>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={errors => handleSendButton(errors)}>
        <CustomText
          fontFamily="System"
          size="1.5"
          color="rgba(9,19,128,1)"
          styles={styles.buttonText}>
          Send
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sendButton}
        onPress={errors => handleCancelButton(errors)}>
        <CustomText
          fontFamily="System"
          size="1.5"
          color="rgba(9,19,128,1)"
          styles={styles.buttonText}>
          Cancel
        </CustomText>
      </TouchableOpacity>
      <View style = {styles.imageContainer}>
      {attachedImage && (
            <Image
              source={{uri: attachedImage.uri}}
              style={[styles.attachedImage, {height: 50 , width: 50}] }
            />
          )}
           {!attachedImage && (
            <Image
              source={noImage}
              style={[styles.attachedImage, {height: 50 , width: 50}] }
            />
          )}
      <TouchableOpacity style={styles.attachButton} onPress={showModal}>
            <CustomText
              fontFamily="System"
              size="1.5"
              color="rgba(9,19,128,1)"
              styles={styles.buttonText}>
              Attach Image
            </CustomText>
         </TouchableOpacity>

          </View>
      {/* style={[styles.label, isFocus && { color: 'blue' }]} */}
      <View style={styles.DropBox}>


    {/*   <View>
      <Text>Select an option:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
       { projectList.map((project) => {
            return (
              <Picker.Item label={project.label} value={project.value} />
             );
             })
        }
             
      </Picker>
      <Text>Selected Value: {selectedValue}</Text>
    </View> */}

      <Text style={styles.label}>
           Select Project Name
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={projectList}
        search
        maxHeight={800}
        labelField="label"
        valueField="value"
        placeholder={'Select item'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          console.log('item.value', item.value);
          console.log('item.label', item.label);
          setProjectName(item.label);
          setProjectId(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Icon
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
      </View>
      </View>

     

        <View style={styles.richTextContainer}>
          <RichEditor
            ref={richText}
            onChange = {(descriptionText) => {handleRichTextChange(descriptionText)}}
          //   onChange={descriptionText => {
          //     setTicket(descriptionText)
          // }}
            placeholder="Write your content here ..."
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={250}
            autoCorrect
            autoCompleteType
            spellCheck
          />
          <RichToolbar
            editor={richText}
             selectedIconTint="#873c1e"
             iconTint="rgba(9,19,128,1)"
            actions={[
              actions.keyboard,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.undo,
              actions.redo,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View>
      
        {showDescError && (
          <Text style={styles.errorTextStyle}>
            Your content shouldn't be empty 🤔
          </Text>
        )}

        {/* <TextInput
          placeholder="Write your ticket here..."
          multiline
          value={ticketText}
          onChangeText={text => setTicketText(text)}
          style={styles.textInput}
        /> */}
      
      
       
        
    </ImageBackground>
  );
};

export default TicketScreen;
