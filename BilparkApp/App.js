import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import UserService from './src/common/UserService';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    resultFetch: null,
    resultPost: null,
  };

  componentDidMount() {
    UserService.getUsers().then((resultFetch) => {
      this.setState({ resultFetch });
    });
  }

  handleClick() {
    UserService.postUserExample().then((resultPost) => {
      this.setState({ resultPost });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {
            // waiting for response from fetch
            this.state.resultFetch ? (
              <Text>{JSON.stringify(this.state.resultFetch)}</Text>
            ) : (
              <Text>Fetching users</Text>
            )
          }
          {
            <Button
              onPress={this.handleClick}
              title="Post set user"
              color="#841584"
            />
          }
          {
            this.state.resultPost ? (
              <Text>{JSON.stringify(this.state.resultPost)}</Text>
            ) : (
              <Text>waiting for you to post a user</Text>
            )
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
