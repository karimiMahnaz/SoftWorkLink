import React, {useState, useRef, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Platform,
  Alert,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon0 from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../styles/taskScreen';
import ItemSeparator from '../components/itemSeparator';
import {ProjectProgress, CustomText, Screen, MyStatusBar} from '../components';
import {getTasks, getProjectTasks, getProjects} from '../../api/task';

const TaskScreen = ({navigation}) => {
  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [projectName, setProjectName] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [task, setTask] = useState(null);
  const [email, setEmail] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  

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
      } else {

        /// console.log('AsyncStorage sign', await AsyncStorage.getItem('sign'))

    //    GfGToast('Connecting...');

        try {
          const mail = await AsyncStorage.getItem('email');
          setEmail(JSON.parse(mail));
        ///  console.log('email', mail);
          if (mail !== null && mail !== '') {
            setProjectId(null)
            let data0 = await getTasks(mail, projectId);
            
         //   console.log('first data', data);
            if (data0 && data0 !== '' && data0 != undefined) {
             
                 setTaskList(data0);

                 data0 = '';
            }
          } else{
            GfGToast('Please Login to Access your document in SofTesting');
            setTaskList([]);
          }
        } catch (err) {
          GfGToast('Connection error');
          console.log(err);
        }
      }
    }
    checkForNet();
  }, []);

  useEffect(() => {
   // GfGToast('Connecting...');

    try {
      const readStorage = async () => {
        const mail = await AsyncStorage.getItem('email');
        setEmail(JSON.parse(mail));

        if (mail !== null && mail !== '' && projectList.length === 0) {
          let data0 = await getProjects(mail);

          if (data0) {
            for (let i = 0; i < data0.length; i++) {
              const projectItem = {
                value: (projectList[(i, 0)] = data0[i].projectId),
                label: (projectList[(i, 1)] = data0[i].projectName),
              };
              if (projectItem.label !== undefined) {
                projectList.push(projectItem);
                //   console.log('projectList0', projectList)
              }
            }
            setProjectList(
              projectList.filter(item => item.label !== undefined),
            );
          }
        }
      };
      readStorage();
    } catch (err) {
      GfGToast('Connection error');
      console.log(err);
    }
    
  }, [setEmail]);

 
   const handleChangeProject = async (item) => {
    try {
     // setTaskList([]);
       console.log('projectId000999', item.value);
       console.log('email000999', email);
      if (email !== null && email !== '' ) {
        let data1 = await getTasks(email, item.value);
        
        console.log('data000999', data1);
        if (data1) {
          data1 !== null && data1 !== '' && data1 != undefined?
           setTaskList(data1): 
           null;
        
          data1 = '';
        }
      } else{
        GfGToast('Please Login to Access your document in SofTesting');
        setTaskList([]);
      }
    } catch (err) {
      GfGToast('Connection error');
      console.log(err);
    }
  }
 
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
        <Icon0
          style={styles.icon0}
          name={'keyboard-backspace'}
          size={18}
          color="royalblue"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.label}>Select Project Name</Text>
        <View style={styles.DropBox}>
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
               handleChangeProject(item);
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

          <View className = { styles.container}>
            {
               taskList ? (
            <>
             <FlatList
                data={taskList}
                keyExtractor={item => item._id.toString()}
              //  style={styles.List}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.card}>
                    {/* onPress={() => viewDocument(item.role)}> */}
                    <Text  style={styles.projectName} > {item.projectName}</Text>
                    <CustomText fontFamily="System" size="1.6"  color="black"  styles={styles.task}> {item.role}</CustomText>
                    <CustomText fontFamily="System" size="1.6"  color="black"  styles={styles.task}> {item.task}</CustomText>
                    <CustomText fontFamily="System" size="1.6"  color="black"  styles={styles.task}> From : {item.startDate.substring(0, item.startDate.length-11)} </CustomText>
                    <CustomText fontFamily="System" size="1.6"  color="black"  styles={styles.task}>  To : {item.endDate.substring(0, item.endDate.length-11)}</CustomText>
                   <View style = {styles.column}>
                        <Text style={styles.taskStatus}>  {item.taskStatus}</Text>
                        <ProjectProgress item = {item}/>
                    </View> 
                  </TouchableOpacity>
                )}
              />

            </>
                ):(
                  <CustomText fontFamily="System" size="1.8" color="rgba(9,19,128,1)"  styles={styles.noTask}>
                    There is no SofTesting task 
                  </CustomText>
                )
              
            }
        </View>
       
   
    </ImageBackground>
  );
};

export default TaskScreen;
