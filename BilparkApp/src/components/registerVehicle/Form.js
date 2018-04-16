import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'native-base';
import { TextInput } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { getCar, declineCar } from '../../actions/registerCar';

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
  }

  submit(values) {
    this.props.getCar(values.regnr);
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

    if (this.props.isLoading) {
      main = (
        <View>
          <Text>Laster..</Text>
        </View>
      );
    } else if (this.props.hasErrored) {
      main = (
        <View>
          <Text>Registreringsnummeret finnes ikke! Prøv på nytt:</Text>
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
          <Button onPress={handleSubmit(this.acceptCar)}>
            <Text>Ja</Text>
          </Button>
          <Button onPress={handleSubmit(this.declineCar)}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: regnr => dispatch(getCar(regnr)),
  };
};

const FormClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default reduxForm({
  form: 'getCar', // a unique name for this form
})(FormClass);

