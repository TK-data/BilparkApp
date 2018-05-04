import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'native-base';
import { getCar, carFormValue } from '../../actions/registerCar';

class CarForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: 'Vennligst fyll inn et gyldig registreringsnummer',
    };
  }

  onChange(value) {
    this.props.carFormValue(value);
  }

  handleSubmit() {
    this.setState({ hasError: false });
    const value = this.form.getValue();
    if (value) {
      this.props.getCar(value.Registreringsnummer);
    }
  }

  render() {
    const formOptions = {
      auto: 'placeholders',
      fields: {
        Registreringsnummer: {
          error: this.state.errorMessage,
          hasError: this.state.hasError,
          autoCapitalize: 'characters',
          autoCorrect: false,
        },
      },
    };

    if (this.props.hasErrored) {
      formOptions.fields.Registreringsnummer.hasError = true;
      formOptions.fields.Registreringsnummer.error = this.props.hasErrored;
    }

    const Form = t.form.Form;

    const regnrCheck = t.refinement(t.String, (regnr) => {
      const reg = /([a-zA-Z]){2}([0-9]){4,5}/;
      return reg.test(regnr);
    });

    const getCarForm = t.struct({
      Registreringsnummer: regnrCheck,
    });

    return (
      <View style={styles.searchContainer}>
        <Form
          ref={c => this.form = c}
          type={getCarForm}
          options={formOptions}
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
