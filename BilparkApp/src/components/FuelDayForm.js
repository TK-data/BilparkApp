import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Picker, TouchableOpacity, View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { postFuelDay } from '../actions/fuelDay';

const renderPicker = ({
  selectedValue, input: { onChange, value, ...inputProps }, children, ...pickerProps
}) => (
  <Picker
    selectedValue={selectedValue}
    onValueChange={(itemValue) => {
      return onChange(itemValue);
    }
    }
    {...inputProps}
    {...pickerProps}
  >
    {children}
  </Picker>
);


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.postFuelDay(values.weekday, values.toggle);
  }


  render() {
    const { handleSubmit, user } = this.props;

    return (
      <View style={styles.container}>
        <Text>Current day: {user.FuelDay} Current value: {user.FuelNotification.toString()} </Text>
        <Text>Velg dag og om du ønsker notification</Text>
        <Field
          selectedValue={user.FuelDay}
          name="weekday"
          component={renderPicker}
          iosHeader="Velg dag"
          mode="dropdown"
        >
          <Picker.Item label="mandag" value={0} />
          <Picker.Item label="tirsdag" value={1} />
          <Picker.Item label="onsdag" value={2} />
          <Picker.Item label="torsdag" value={3} />
          <Picker.Item label="fredag" value={4} />
          <Picker.Item label="lørdag" value={5} />
          <Picker.Item label="søndag" value={6} />
        </Field>
        <Field
          name="toggle"
          component={renderPicker}
          iosHeader="Ønsker du notification?"
          mode="dropdown"
          selectedValue={user.FuelNotification}
        >
          <Picker.Item label="Ja" value />
          <Picker.Item label="Nei" value={false} />
        </Field>
        <TouchableOpacity onPress={handleSubmit(this.submit)}>
          <Text style={styles.button}>Send info</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.postFuelDayLoading,
    hasErrored: state.postFuelDayFailure,
    hasSucceeded: state.postFuelDaySuccess,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postFuelDay: (weekday, toggle) => dispatch(postFuelDay(weekday, toggle)),
  };
};

const FormClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default reduxForm({
  form: 'fuelday', // a unique name for this form
})(FormClass);


const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250,
  },
});
