import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'native-base';
import { getCar, carFormValue } from '../../actions/registerCar';

class CarForm extends Component {

  onChange(value) {
    this.props.carFormValue(value);
  }

  async handleSubmit() {
    const value = this.form.getValue();
    if (value) {
      this.props.getCar(value.Registreringsnummer);
    }
  }

  render() {

    const Form = t.form.Form;

    const regnrCheck = t.refinement(t.String, (regnr) => {
      const reg = /([a-zA-Z]){2}([0-9]){4,5}/;
      return reg.test(regnr);
    });

    const getCarForm = t.struct({
      Registreringsnummer: regnrCheck,
    });

    const initialFormOptions = {
      auto: 'placeholders',
      fields: {
        Registreringsnummer: {
          error: 'Vennligst fyll inn et gyldig Registreringsnummer',
          autoCapitalize: 'characters',
          autoCorrect: false,
        },
      },
    };

    let errorMsg = null;

    if (this.props.hasErrored) {
      errorMsg = (
        <Text style={styles.errorMsg}>{this.props.hasErrored}</Text>
      );
    }

    return (
      <View style={styles.searchContainer}>
        {errorMsg}
        <Form
          ref={c => this.form = c}
          type={getCarForm}
          options={initialFormOptions}
          value={this.props.formValue}
          onChange={value => this.onChange(value)}
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
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchButton: {
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'white',
    margin: 5,
    fontSize: 17,
  },
});

const mapStateToProps = (state) => {
  return {
    hasErrored: state.carFetch.hasErrored,
    formValue: state.carForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: regnr => dispatch(getCar(regnr)),
    carFormValue: value => dispatch(carFormValue(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarForm);
