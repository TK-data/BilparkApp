import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Picker, CheckBox, ListItem, Body } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { postFuelDay } from '../../actions/fuelDay';

const renderPicker = ({ func, input, label, children, ...custom }) => (
  <Picker
    {...input}
    selectedValue={input.value}
    onValueChange={(value) => {
      func(value);
    }
    }
    {...custom}
  >
    {children}
  </Picker>
);

const renderCheckbox = ({ func, input, ...custom }) => (
  <ListItem>
    <CheckBox
      {...input}
      checked={input.value ? true : false}
      onPress={() => {
        input.onChange(!input.value);
        func(!input.value);
      }
      }
      {...custom}
    />
    <Body>
      <Text> Gi push-varsel? </Text>
    </Body>
  </ListItem>

);


class FuelDayForm extends Component {


  render() {
    const { user } = this.props;

    const Item = Picker.Item;

    const postToggle = (value) => {
      this.props.postFuelDay(user.FuelDay, value);
    };

    const postWeekday = (value) => {
      this.props.postFuelDay(value, user.FuelNotification);
    };

    return (
      <View style={styles.container}>
        <Text>Current day: {user.FuelDay} Current value: {user.FuelNotification.toString()} </Text>
        <Text>Velg dag og om du ønsker notification</Text>
        <Field
          func={postWeekday}
          selectedValue={user.FuelDay}
          placeholder="velg dag"
          name="weekday"
          component={renderPicker}
          iosHeader="Velg dag"
          mode="dropdown"
        >
          <Item label="mandag" value={0} />
          <Item label="tirsdag" value={1} />
          <Item label="onsdag" value={2} />
          <Item label="torsdag" value={3} />
          <Item label="fredag" value={4} />
          <Item label="lørdag" value={5} />
          <Item label="søndag" value={6} />
        </Field>
        <Field name="toggle" checked={user.FuelNotification} func={postToggle} component={renderCheckbox} />
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
)(FuelDayForm);

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
