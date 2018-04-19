import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, H2 } from 'native-base';
import { TextInput } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { getCar, declineCar, acceptCar } from '../../actions/registerCar';

const renderInput = ({ input: { onChange, ...restInput } }) => {
  return (
    <TextInput
      onChangeText={onChange}
      {...restInput}
      placeholder="VH00000"
    />
  );
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
  }

  submit(values) {
    this.props.getCar(values.regnr);
  }

  accept() {
    this.props.acceptCar(this.props.car);
  }

  decline() {
    this.props.declineCar();
  }

  render() {
    const { handleSubmit } = this.props;

    let main = (
      <View>
        <Text>Registreringsnummer:</Text>
        <Field name="regnr" component={renderInput} />
        <Button onPress={handleSubmit(this.submit)}>
          <Text>Finn bil</Text>
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
          <Text>Laster..</Text>
        </View>
      );
    } else if (this.props.hasErrored !== undefined && this.props.hasErrored !== '') {
      main = (
        <View>
          <Text>{this.props.hasErrored} Prøv på nytt:</Text>
          <Field name="regnr" component={renderInput} />
          <Button onPress={handleSubmit(this.submit)}>
            <Text>Finn bil</Text>
          </Button>
        </View>
      );
    } else if (this.props.car) {
      const car = JSON.parse(this.props.car);

      main = (
        <View>
          <Text>Er dette din bil?</Text>
          <Text>Regnr: {car.Regnr}</Text>
          <Text>Merke: {car.Brand}</Text>
          <Text>Modell: {car.Model}</Text>
          <Text>Registreringsår: {car.RegYear}</Text>
          <Button onPress={handleSubmit(this.accept)}>
            <Text>Ja</Text>
          </Button>
          <Button onPress={handleSubmit(this.decline)}>
            <Text>Nei</Text>
          </Button>
        </View>
      );
    }

    return (
      <View>
        {main}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.carFetch.car,
    isLoading: state.carFetch.isLoading,
    hasErrored: state.carFetch.hasErrored,
    isAccepted: state.carFetch.isAccepted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: regnr => dispatch(getCar(regnr)),
    declineCar: () => dispatch(declineCar()),
    acceptCar: car => dispatch(acceptCar(car)),
  };
};

const FormClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default reduxForm({
  form: 'getCar', // a unique name for this form
})(FormClass);

