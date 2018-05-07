import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Text, View, H2, Spinner, Icon } from 'native-base';
import CarForm from './CarForm';
import { declineCar, acceptCar } from '../../actions/registerCar';

class GetCarForm extends Component {

  render() {

    let main = (
      <CarForm />
    );

    if (this.props.carSaved && this.props.carSaved !== 'null') {

      const car = JSON.parse(this.props.carSaved);
      main = (
        <View>
          <H2 style={styles.header}>DIN BIL:</H2>
          <Text style={styles.text}>Regnr: {car.RegNr}</Text>
          <Text style={styles.text}>Merke: {car.Brand}</Text>
          <Text style={styles.text}>Modell: {car.Model}</Text>
          <Text style={styles.text}>Registreringsår: {car.RegYear}</Text>
        </View>
      );
    } else if (this.props.isLoading) {
      main = (
        <View>
          <Spinner color="white" />
        </View>
      );
    } else if (this.props.carFetched) {
      const car = JSON.parse(this.props.carFetched);

      main = (
        <View style={styles.content}>
          <Text style={styles.header}>ER DETTE DIN BIL?</Text>
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
          <View style={styles.buttonContent}>
            <Button
              bordered
              light
              onPress={() => {
                this.props.acceptCar(this.props.car);
              }}
              style={styles.button}
            >
              <Icon name="md-checkmark" style={{ fontSize: 40 }} />
            </Button>
            <Button
              bordered
              light
              onPress={() => {
                this.props.declineCar();
              }}
              style={styles.button}
            >
              <Icon name="md-close" style={{ fontSize: 40 }} />
            </Button>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        {main}
      </View>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchButton: {
    alignSelf: 'center',
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
  },
  carContent: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
  },
  card: {
    width: (width - 20),
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
  text: {
    color: 'white',
  },
});

const mapStateToProps = (state) => {

  return {
    carSaved: state.auth.car,
    carFetched: state.carFetch.car,
    isLoading: state.carFetch.isLoading,
    hasErrored: state.carFetch.hasErrored,
    isAccepted: state.carFetch.isAccepted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    declineCar: () => dispatch(declineCar()),
    acceptCar: car => dispatch(acceptCar(car)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetCarForm);
