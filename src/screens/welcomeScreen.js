import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  ToastAndroid,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Menu, Provider} from 'react-native-paper';
import Dialog from 'react-native-dialog';

import {styles} from '../styles/welcomeScreen';
import CustomButton from '../components/customButton';
import {MyStatusBar} from '../components';
import {deleteUser} from '../../api/users';
import { lightBlue100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WelcomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);
  const openMenu = v => setMenuVisible(true);

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
        GfGToast('please connect to the internet');
      } else {
        navigation.setOptions({
          tabBarStyle: {display: 'none'},
        });
      }
    };
    checkForNet();
  }, []);

  useEffect(() => {
    const readStorage = async () => {
      const x = await AsyncStorage.getItem('email');
      if (x !== null && x !== ''){
      setEmail(JSON.parse(x));
      return email;
      }
      // else {
      //   GfGToast('Please Login to Access..');
      // }
    };
    readStorage();
  }, [setEmail]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('Image');
    setEmail(null);
    ///   navigation.dispatch(StackActions.replace("Welcome"));
    GfGToast('Logout');
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleDelete = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
  if (email === null){GfGToast('Please login!'); }
    Keyboard.dismiss();
    try {
      const status = await deleteUser(email);
      setDialogVisible(false);
      if (status === 200) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('Image');
        setEmail(null);

        GfGToast('Account is deleted!');

        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Home'}],
        // });
      } else {
        GfGToast('Delete is failed');
      }
    } catch (err) {
      setDialogVisible(false);
      GfGToast('connection is failed');

      console.log(err);
    }
  };

  const deleteAccount = async email => {
    console.log('acacaccacac', email);
    if (email === null) {
      GfGToast('Account was not found');
    } else {
      showDialog();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/abs.jpg')}
      style={styles.background}
      blurRadius={1}>
      {/* <SafeAreaView style={styles.background}>  */}

      <MyStatusBar
        backgroundColor="rgb(181,181,201)"
        barStyle="light-content"
      />

      <Provider>
        <View style={styles.container}>
          
          <Menu
            style={{ backgroundColor: 'lightBlue', flexWrap: "wrap", }} 
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
               <Button onPress={openMenu} mode="outlined" style={styles.menu}>
                <Icon name={'menu'} size={18} color="royalblue" />
              </Button>
            }>
              
          
            <Menu.Item
              onPress={() => {
                navigation.navigate('login');
              }}
              title="Login"
            />
            <Menu.Item
              onPress={() => {
                navigation.navigate('profile');
              }}
              title="Profile"
            />
             <Menu.Item
               style={{ backgroundColor: 'lightBlue' }} 
              onPress={() => {
                navigation.navigate('chart');
              }}
              title="Charts"
            />

              <Menu.Item
               style={{ backgroundColor: 'lightBlue' }} 
              onPress={() => {
                navigation.navigate('signature');
              }}
              title="Contracts"
            />
            <Menu.Item
              onPress={() => {
                navigation.navigate('task');
              }}
              title="Tasks"
            />
             <Menu.Item
              onPress={() => {
                navigation.navigate('ticket');
              }}
              title="Tickets"
            />
            <Menu.Item onPress={handleLogout} title="Logout" />
            <Menu.Item onPress={deleteAccount} title="Delete Account" />

            <View>
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={e => handleCancel(e)} />
          <Dialog.Button label="Delete" onPress={e => handleDelete(email)} />
        </Dialog.Container>
      </View>


          </Menu>
        </View>
  

      <View style={styles.buttonContainer}>
        <Text style={[styles.title, style.marginBottom1 , {flexWrap: "wrap"}]}>SoftWorkLink</Text>
        {email ? <Text style={[styles.useremail]}>  {email} </Text> : <Text style={[styles.useremail]}>Please Login to Access...</Text>}
      </View>

      </Provider>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const style = StyleSheet.create({
  marginBottom1: {
    marginBottom: 0.4 * screenHeight,
  },
});
