import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Button, Text, H2 } from 'native-base';
import { NavigationActions } from 'react-navigation';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buzzWord: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  finnBil: {
    color: 'white',
    fontSize: 18,
    marginBottom: '8%',
    alignSelf: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'center',
  },
  carContent: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
  },
  content: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: (width - 20),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  textContainer: {
    width: (width - 40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});


class Slide1 extends Component {
  render() {

    if (typeof (this.props.user) === 'undefined') {
      return (
        <View style={styles.slide1}>
          <Text>Du må logge inn og ut</Text>
        </View>
      );
    }

    const user = JSON.parse(this.props.user);

    let content = (
      <View>
        <Text style={styles.buzzWord}>Velkommen {user.Fname}!</Text>
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


    if (typeof (this.props.car) !== 'undefined') {
      const car = JSON.parse(this.props.car);

      if (car) {
        content = (
          <View style={styles.container}>
            <View>
              <H2 style={styles.header}>DIN BIL:</H2>
              <View style={styles.content}>
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
              </View>
            </View>
          </View>
        );
      }
    }

    return (
      <View style={styles.slide1}>
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
