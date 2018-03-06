import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

// you need to manually change this IP during production. Gonna make a config file and make a production one that will point to the actual host of our backend.
const endpoint = "http://192.168.1.101:1337/api/User";

export default class App extends React.Component {
  state = {
    resultFetch: null,
    resultPost: null,
  };

  componentDidMount() {
    this._exampleGetUsers();
  }

  // make sure there are user objects in the backend before trying this huhu
  _exampleGetUsers = async () => {
    try {
      let response = await fetch(endpoint);
      let resultFetch = await response.json();
      this.setState({resultFetch});
    } catch(e) {
      this.setState({resultFetch: "oh oh error"});
    }
  };

  _examplePostUser = async () => {
    try {
      let response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Address: 'Krok80',
          Fname: 'Tom',
          Lname: 'Buttonpress',
          FuelDay: 2,
          CompanyID: 123123
        }),
      });
      let resultPost = await response.json();
      this.setState({resultPost});
    } catch(e) {

    }
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
              <Text>Fetching users from {endpoint}</Text>
            )
          }
          {
            <Button
              onPress={this._examplePostUser}
              title="Post set user"
              color="#841584"
            />
          }
          {
            this.state.resultPost ? (
              <Text>{JSON.stringify(this.state.resultPost)}</Text>
            ) : (
              <Text>waiting for you to post a user {endpoint}</Text>
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
