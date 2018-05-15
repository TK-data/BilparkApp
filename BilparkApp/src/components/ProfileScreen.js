import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { Button, Text } from 'native-base';
import LogoutButton from './LogoutButton';

const image = require('../images/user_icon.png');


const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002776',
  },
  logoContainer: {
    width: window.width,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
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
  profileContent: {
    flex: 6,
  },
  logOutButton: {
    marginBottom: 20,
    flex: 1,
  },
  registerCar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 5,
  },
  registerCarText: {
    color: 'white',
    margin: window.width / 30,
  },
  companyButton: {
    alignSelf: 'center',
    margin: window.width / 30,
  },
  image: {
    width: window.width * 0.15,
    height: window.width * 0.15,
    marginTop: window.width / 35,
    marginBottom: 5,
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
        <Text style={styles.userNameText}>{ user.Fname + ' ' + user.Lname }</Text>
      );
    }

    if (!this.props.carSaved || this.props.carSaved === null) {
      return <View style={styles.container} />;
    }
    let carContent = (
      <View style={styles.registerCar}>
        <Text style={styles.registerCarText}> Ditt kjøretøy er ikke registrert </Text>
        <View>
          <Button
            bordered
            light
            onPress={() => { this.props.navigate('RegisterCar'); }}
          >
            <Text>Finn din bil</Text>
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
          <Image resizeMode="contain" style={styles.image} source={image} />
          <View style={styles.userName}>
            { content }
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.profileContent}>
            {carContent}
            <View style={styles.companyButton}>
              <Button
                bordered
                light
                onPress={() => { this.props.navigate('RegisterCompany'); }}
              >
                <Text>Endre bedrift</Text>
              </Button>
            </View>
          </View>
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
