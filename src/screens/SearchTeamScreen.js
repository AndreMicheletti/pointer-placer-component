import React from 'react';
import { View, Text } from 'react-native';

class SearchTeamScreen extends React.PureComponent {
  static navigationOptions = {
    title: "Times",
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          Hello from TEAM SCREEN
        </Text>
      </View>
    );
  }
}

export default SearchTeamScreen;
