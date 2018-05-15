import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Icon, Button } from 'native-base';
import LogoutButton from './LogoutButton';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#002776',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  icon: {
    color: '#002776',
    fontSize: 100,
  },
  logoContainer: {
    width: window.width,
    marginTop: window.width / 10,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  userName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  userNameText: {
    fontSize: 20,
    color: 'rgb(000, 039, 118)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carContent: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 20,
  },
  text: {
    color: 'white',
  },
  textContainer: {
    width: (window.width - 40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  logOutButton: {
    marginBottom: 20,
  },
  registerCar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    width: window.width / 4,
    justifyContent: 'center',
  },
  registerButtonText: {
    color: 'white',
  },
});
class ProfileScreen extends Component {
  render() {
    let user;
    let content = (
      <Text style={styles.userNameText}>-</Text>
    );

    if (typeof (this.props.user) !== 'undefined') {
      user = JSON.parse(this.props.user);
      content = (
        <Text style={styles.userNameText}>{ user.Fname }</Text>
      );
    }

    if (!this.props.carSaved || this.props.carSaved === null) {
      return <View style={styles.container} />;
    }
    let carContent = (
      <View style={styles.registerCar}>
        <Text style={styles.text}> Din bil er ikke registrert </Text>
        <View>
          <Button
            bordered
            light
            onPress={() => { this.props.navigate('RegisterCar'); }}
            style={styles.button}
          >
            <Text style={styles.registerButtonText}>Finn din bil</Text>
          </Button>
        </View>
      </View>
    );

    if (this.props.carSaved && this.props.carSaved !== 'null') {
      const car = JSON.parse(this.props.carSaved);
      carContent = (
        <View style={styles.carContent}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>REGNR:</Text>
            <Text style={styles.text}>{car.RegNr}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>MERKE:</Text>
            <Text style={styles.text}>{car.Brand}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>MODELL:</Text>
            <Text style={styles.text}>{car.Model}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>REGISTRERINGSÅR:</Text>
            <Text style={styles.text}>{car.RegYear}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View>
            <Icon style={styles.icon} name="person" />
          </View>
          <View style={styles.userName}>
            { content }
          </View>
        </View>
        <View style={styles.content}>
          {carContent}
          <View style={styles.logOutButton}>
            <LogoutButton />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    carSaved: state.auth.car,

  };
};
const mapDispatchToProps = dispatch => ({
  navigate: (routeName) => {
    dispatch(NavigationActions.navigate({ routeName }));
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profil',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
