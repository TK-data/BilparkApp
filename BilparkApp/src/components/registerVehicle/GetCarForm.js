import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Text, View, H2, Spinner, Icon } from 'native-base';
import { getCar, declineCar, acceptCar, carFormResetOptions } from '../../actions/registerCar';

class GetCarForm extends Component {

  async handleSubmit() {
    const value = this.form.getValue();
    this.props.resetFormOptions();
    if (value) {
      this.props.getCar(value.Registreringsnummer);
    }
  }

  render() {

    const regnrCheck = t.refinement(t.String, (regnr) => {
      const reg = /([a-zA-Z]){2}([0-9]){4,5}/;
      return reg.test(regnr);
    });

    const getCarForm = t.struct({
      Registreringsnummer: regnrCheck,
    });

    const Form = t.form.Form;

    let main = (
      <View style={styles.searchContainer}>
        <Form
          ref={c => this.form = c}
          type={getCarForm}
          options={this.props.options}
          value={{ Registreringsnummer: 'VH11111' }}
        />
        <Button
          bordered
          light
          onPress={() => {
            this.handleSubmit();
          }}
          style={styles.searchButton}
        >
          <Text>Finn din bil</Text>
        </Button>
      </View>
    );

    if (this.props.isAccepted) {
      const car = JSON.parse(this.props.car);
      main = (
        <View>
          <H2>Din bil:</H2>
          <Text>Regnr: {car.Regnr}</Text>
          <Text>Merke: {car.Brand}</Text>
          <Text>Modell: {car.Model}</Text>
          <Text>Registreringsår: {car.RegYear}</Text>
        </View>
      );
    } else if (this.props.isLoading) {
      main = (
        <View>
          <Spinner color="white" />
        </View>
      );
    } else if (this.props.hasErrored) {
      main = (
        <View style={styles.searchContainer}>
          <Form
            ref={c => this.form = c}
            type={getCarForm}
            options={this.props.options}
          />
          <Button
            bordered
            light
            onPress={() => {
              this.handleSubmit();
            }}
            style={styles.searchButton}
          >
            <Text>Finn din bil</Text>
          </Button>
        </View>
      );
    } else if (this.props.car) {
      const car = JSON.parse(this.props.car);
      main = (
        <View style={styles.content}>
          <Text style={styles.header}>ER DETTE DIN BIL?</Text>
          <View style={styles.content}>
            <View style={styles.carContent}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>REGNR:</Text>
                <Text style={styles.text}>{car.Regnr}</Text>
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
    car: state.carFetch.car,
    isLoading: state.carFetch.isLoading,
    hasErrored: state.carFetch.hasErrored,
    isAccepted: state.carFetch.isAccepted,
    options: state.carFetch.options,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: regnr => dispatch(getCar(regnr)),
    declineCar: () => dispatch(declineCar()),
    acceptCar: car => dispatch(acceptCar(car)),
    resetFormOptions: () => dispatch(carFormResetOptions()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetCarForm);
