import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { HomeScreen, MyTeamScreen, SearchTeamScreen } from './src/screens';

const pointerImage = require('./src/assets/pointer.png')

export default class App extends React.PureComponent {

  render() {
    const RootNavigator = createBottomTabNavigator({
      home: { screen: HomeScreen },
      team: createStackNavigator({
        myTeam: { screen: MyTeamScreen },
        searchTeam: { screen: SearchTeamScreen }
      }),
    }, {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'home') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'team') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: '#333',
        },
      },
    })

    return (
      <View style={rootStyle}>
        <RootNavigator />
      </View>
    )
  }
};

const rootStyle = {
  flex: 1
};
