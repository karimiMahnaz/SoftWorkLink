import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart';
import Icon0 from 'react-native-vector-icons/MaterialCommunityIcons';

import {MyStatusBar, Screen} from '../components';
import {styles} from '../styles/chartScreen';
const ChartScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

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
        const mail = await AsyncStorage.getItem('email');
        setEmail(mail);
        if (mail !== null && mail !== '') {
        } else {
          GfGToast('Please Login to Access your document in SofTesting');
        }
      }
    };
    checkForNet();
  }, []);
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
      {email ? (
        <View style ={{ width: "100%", marginTop: 10}}>
          <Chart
            style={{height: "23%", width: "90%", margin: 10}}
            data={[
              {x: -2, y: 15},
              {x: -1, y: 10},
              {x: 0, y: 12},
              {x: 5, y: 8},
              {x: 6, y: 12},
              {x: 7, y: 14},
              {x: 8, y: 12},
              {x: 9, y: 13.5},
              {x: 10, y: 18},
            ]}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: 0, max: 10}}
            yDomain={{min: 0, max: 20}}>
            <VerticalAxis
              tickCount={5}
              theme={{labels: {formatter: v => v.toFixed(2)}}}
            />
            <HorizontalAxis tickCount={3} />
            <Area
              theme={{
                gradient: {
                  from: {color: 'green'},
                  to: {color: 'deeppink', opacity: 0.2},
                },
              }}
            />
            <Line theme={{stroke: {color: 'forestgreen', width: 5}}} />
          </Chart>

          <Text   style={{ alignSelf: 'center', margin: 10}}>Tickets</Text>

          <Chart
            style={{ height: "23%", width: "90%", marginTop: 10}}
            data={[
              {x: 4, y: 15},
              {x: 6, y: 6},
              {x: 7, y: 10},
              {x: 8, y: 3},
            ]}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: 5, max: 8}}>
            <VerticalAxis
              tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 25, 30]}
              theme={{
                axis: {stroke: {color: '#aaa', width: 2}},
                ticks: {stroke: {color: '#aaa', width: 2}},
                labels: {formatter: v => v.toFixed(2)},
              }}
            />
            <HorizontalAxis
              tickCount={5}
              theme={{
                axis: {stroke: {color: '#aaa', width: 2}},
                ticks: {stroke: {color: '#aaa', width: 2}},
                labels: {label: {rotation: 50}, formatter: v => v.toFixed(1)},
              }}
            />
            <Line theme={{stroke: {color: 'red', width: 2}}} />
            <Line
              smoothing="bezier"
              tension={0.1}
              theme={{stroke: {color: 'blue', width: 2}}}
            />
            <Line
              smoothing="bezier"
              tension={0.3}
              theme={{stroke: {color: 'green', width: 2}}}
            />
            <Line
              smoothing="cubic-spline"
              tension={0.6}
              theme={{stroke: {color: 'orange', width: 2}}}
            />
          </Chart>

          <Text style={{ alignSelf: 'center', margin: 10}} >Team Member Activity </Text>
          <Chart
            style={{height: "23%", width: "90%", marginTop: 10}}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: 0, max: 10}}
            yDomain={{min: 0, max: 30}}>
            <VerticalAxis
              tickCount={5}
              theme={{labels: {formatter: v => v.toFixed(2)}}}
            />
            <HorizontalAxis />
            <Area
              theme={{
                gradient: {
                  from: {color: '#1abc9c', opacity: 0.4},
                  to: {color: 'gold', opacity: 0.4},
                },
              }}
              smoothing="cubic-spline"
              data={[
                {x: 0, y: 12},
                {x: 5, y: 8},
                {x: 6, y: 12},
                {x: 9, y: 13},
                {x: 10, y: 15},
                {x: 12, y: 14},
                {x: 18, y: 19},
              ]}
            />
            <Area
              theme={{
                gradient: {
                  from: {color: '#f39c12', opacity: 0.4},
                  to: {color: '#f39c12', opacity: 0.4},
                },
              }}
              smoothing="cubic-spline"
              data={[
                {x: 0, y: 7},
                {x: 2, y: 5},
                {x: 3, y: 12},
                {x: 7, y: 16},
                {x: 9, y: 17},
                {x: 10, y: 12},
                {x: 12, y: 14},
                {x: 18, y: 19},
              ]}
            />
          </Chart>

          <Text style={{ alignSelf: 'center', margin: 10}}>Projects and Tasks</Text>
        </View>
      ) : (
        <Text style={{ alignSelf: 'center', margin: 10}}>Please Login to Access.. </Text>
      )}
    </ImageBackground>
  );
};

export default ChartScreen;
