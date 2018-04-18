import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Notifications, Permissions, Constants } from 'expo';
import moment from 'moment';
import { StyleSheet, Text, View, Button } from 'react-native';
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
  async componentDidMount() {
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.');
    }
    Notifications.addListener(this.handleNotification);
  }

  // Private methods

  handleNotification = ({ origin, data }) => {
    console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

 sendImmediateNotification = () => {
   const localNotification = {
     title: 'Superdupertestingnotification',
     body: 'Trykk på meg for å åpne den beste appen på den beste siden',
     data: { type: 'immediate' },
   };

   console.log('Scheduling immediate notification:', { localNotification });

   Notifications.presentLocalNotificationAsync(localNotification)
     .then(id => console.info(`Immediate notification scheduled (${id})`))
     .catch(err => console.error(err));
 };

 sendDelayedNotification = () => {
   const localNotification = {
     title: 'Delayed testing Title',
     body: 'Testing body',
     data: { type: 'delayed' },
   };
   const schedulingOptions = {
     time: (new Date()).getTime() + 5000,
   };

   console.log('Scheduling delayed notification:', { localNotification, schedulingOptions });

   Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
     .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
     .catch(err => console.error(err));
 };


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
       <Button title="Send Immediate Notification" onPress={() => this.sendImmediateNotification()} />
       <Button title="Send Delayed Notification" onPress={() => this.sendDelayedNotification()} />
       <Text>Current day: {user.FuelDay} Current value: {user.FuelNotification.toString()} </Text>
       <Text>Velg dag og om du ønsker notification</Text>
       <Field
         func={postWeekday}
         selectedValue={user.FuelDay}
         placeholder="Velg dag"
         name="weekday"
         component={renderPicker}
         iosHeader="Velg dag"
         mode="dropdown"
       >
         <Item label="Mandag" value={0} />
         <Item label="Tirsdag" value={1} />
         <Item label="Onsdag" value={2} />
         <Item label="Torsdag" value={3} />
         <Item label="Fredag" value={4} />
         <Item label="Lørdag" value={5} />
         <Item label="Søndag" value={6} />
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
