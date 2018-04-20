import React, { Component } from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Notifications, Permissions, Constants } from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';
import { reduxForm } from 'redux-form';
import { postFuelDay } from '../../actions/fuelDay';


class FuelDayForm extends Component {
  async componentDidMount() {
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      // console.log('Notification permissions granted.');
    }
    Notifications.addListener(this.handleNotification);
  }

  // Private methods
  handleNotification = ({ origin, data }) => {
    console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

  /*
 sendImmediateNotification = () => {
   const localNotification = {
     title: 'Superdupertestingnotification',
     body: 'Trykk på meg for å åpne den beste appen på den beste siden',
     data: { type: 'immediate' },
   };

   // console.log('Scheduling immediate notification:', { localNotification });

   Notifications.presentLocalNotificationAsync(localNotification);
   // .then(id => console.info(`Immediate notification scheduled (${id})`))
   // .catch(err => console.error(err));
 };
*/
 sendDelayedNotification = () => {
   const localNotification = {
     title: 'Delayed testing Title',
     body: 'Testing body',
     data: { type: 'delayed' },
   };
   const dayToSet = this.props.user.FuelDay;
   const date = new Date();
   let currentDay = date.getDay();
   if (currentDay === 0) {
     currentDay = 6;
   } else {
     currentDay -= 1;
   }
   const distance = ((dayToSet + 7) - currentDay) % 7;
   date.setDate(date.getDate() + distance);
   date.setHours(7, 0, 0, 0);
   const schedulingOptions = {
     time: date,
     repeat: 'week',
   };

   // console.log('Scheduling delayed notification:', { localNotification, schedulingOptions });

   Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
   // .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
   // .catch(err => console.error(err));
 };

 testSendDelayedNotification = () => {
   console.log("delayed?");
   const dayToSet = this.props.user.FuelDay;
   const date = new Date();
   let currentDay = date.getDay();
   if (currentDay === 0) {
     currentDay = 6;
   } else {
     currentDay -= 1;
   }
   const distance = ((dayToSet + 7) - currentDay) % 7;
   date.setDate(date.getDate() + distance);
   date.setHours(7, 0, 0, 0);
   const localNotification = {
     title: 'CurrentDay:' + currentDay + '!',
     body: 'NotifyDate:' + date + '!',
     data: { type: 'delayed' },
   };
   const schedulingOptions = {
     time: (new Date()).getTime() + 5000,
     repeat: 'minute',
   };
   Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
 };

  stopDelayedNotification = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  };


  render() {

    const Days = t.enums({
      0: 'Mandag',
      1: 'Tirsdag',
      2: 'Onsdag',
      3: 'Torsdag',
      4: 'Fredag',
      5: 'Lørdag',
      6: 'Søndag',
    });

    const Hours = t.enums({
      1: '01',
      2: '02',
      3: '03',
      4: '04',
      5: '05',
      6: '06',
      7: '07',
      8: '08',
      9: '09',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
      17: '17',
      18: '18',
      19: '19',
      20: '20',
      21: '21',
      22: '22',
      23: '23',
      24: '24',
    });

    const Minutes = t.enums({
      0: '00',
      15: '15',
      30: '30',
      45: '45',
    });

    const FuelDay = t.struct({
      Day: Days,
      Hour: Hours,
      Minute: Minutes,
      Notification: t.Boolean,
    });

    const { user } = this.props;

    // const Item = Picker.Item;
    /*
    const postToggle = (value) => {
      this.props.postFuelDay(user.FuelDay, value);
    };

    const postWeekday = (value) => {
      this.props.postFuelDay(value, user.FuelNotification);
    };
    */
    const postFuelForm = (value) => {
      this.props.postFuelDay(value.Day, value.Notification);
    };

    const Form = t.form.Form;

    return (
      <View style={styles.container}>
        <Button title="TEST Delayed Notification" onPress={() => this.testSendDelayedNotification()} />
        <Button title="Send Delayed Notification" onPress={() => this.sendDelayedNotification()} />
        <Button title="Stop Delayed Notification" onPress={() => this.stopDelayedNotification()} />
        <Text
          style={styles.debugColor}
        >
          Current day: {user.FuelDay} Current value: {user.FuelNotification.toString()}
        </Text>
        <Text style={styles.debugColor}>Velg dag og om du ønsker notification</Text>
        <Form
          ref={c => this.form = c}
          type={FuelDay}
          value={{ Day: user.FuelDay, Notification: user.FuelNotification }}
          onChange={postFuelForm}
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FuelDayForm);

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
  debugColor: {
    color: 'white',
  },
});
