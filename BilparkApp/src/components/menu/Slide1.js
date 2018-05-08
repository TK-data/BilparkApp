import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  buzzWord: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  carHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  finnBil: {
    color: 'white',
    fontSize: 18,
    marginBottom: '8%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
  button: {
    alignSelf: 'center',
  },
});


class Slide1 extends Component {
  render() {

    if (typeof (this.props.user) === 'undefined' || typeof (this.props.car) === 'undefined') {
      return <View />;
    }

    const user = JSON.parse(this.props.user);
    const car = JSON.parse(this.props.car);

    let content = (
      <View>
        <Text style={styles.finnBil}>Du har ikke registrert en bil enda.. </Text>
        <Button
          bordered
          light
          onPress={() => { this.props.navigate('RegisterCar'); }}
          style={styles.button}
        >
          <Text>Finn din bil</Text>
        </Button>
      </View>
    );

    if (car) {
      content = (
        <View style={styles.carDiv}>
          <Text style={styles.carHeader}>Din bil:</Text>
          <Text style={styles.text}>{car.Brand} {car.Model}</Text>
          <Text style={styles.text}>Registreringsnummer {car.RegNr}</Text>
          <Text style={styles.text}>Forsikrigsselskap: {car.InsuranceCompany}</Text>
        </View>
      );
    }

    return (
      <View style={styles.slide1}>
        <Text style={styles.buzzWord}>Velkommen {user.Fname}!</Text>
        { content }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    car: state.auth.car,
  };
};

const mapDispatchToProps = dispatch => ({
  navigate: (routeName) => {
    dispatch(NavigationActions.navigate({ routeName }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slide1);

