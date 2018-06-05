import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class MyTeamScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: "Meu Time",
      headerRight: (
        <Button title="Ver Todos" onPress={() => {
          navigation.navigate({ key: 'searchTeam'})
        }} />
      )
    }
  }

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

export default MyTeamScreen;
