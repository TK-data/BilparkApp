import React, { Component } from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import Timepicker from 'react-native-modal-datetime-picker';
import { Notifications, Permissions, Constants } from 'expo';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { reduxForm } from 'redux-form';
import { showModal, hideModal, postFuelDay } from '../../actions/fuelDay';

const width = Dimensions.get('window').width;

class FuelDayForm extends Component {
  async componentDidMount() {
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      // console.log('Notification permissions granted.');
    }
    Notifications.addListener(this.handleNotification);
  }
  componentDidUpdate() {
    this.stopDelayedNotification();
    if (this.props.user.FuelNotification === true) {
      this.sendDelayedNotification();
    }
  }

  // Private methods
  handleNotification = ({ origin, data }) => {
    console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

  // showTimePicker = () =>
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
    const notificationHour = this.props.user.FuelTime.substring(0, this.props.user.FuelTime.indexOf('-'));
    const notificationMinute = this.props.user.FuelTime.substring(this.props.user.FuelTime.indexOf('-') + 1, this.props.user.FuelTime.length);


    let currentDay = date.getDay();
    if (currentDay === 0) {
      currentDay = 6;
    } else {
      currentDay -= 1;
    }
    let distance = ((dayToSet + 7) - currentDay) % 7;
    if (currentDay === dayToSet) {
      if (notificationHour + ':' + notificationMinute + ':00' < date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()) {
        distance = 7;
      }
    }
    date.setDate(date.getDate() + distance);
    date.setHours(parseInt(notificationHour, 10), parseInt(notificationMinute, 10), 0, 0);
    const schedulingOptions = {
      time: date,
      repeat: 'week',
    };


    // console.log('Scheduling delayed notification:', { localNotification, schedulingOptions });

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    // .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
    // .catch(err => console.error(err));
  };

  stopDelayedNotification = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  };

  render() {
    const { hideModal, showModal, isShowing, user } = this.props;
    const Days = t.enums({
      0: 'Mandag',
      1: 'Tirsdag',
      2: 'Onsdag',
      3: 'Torsdag',
      4: 'Fredag',
      5: 'Lørdag',
      6: 'Søndag',
    });


    const FuelDay = t.struct({
      Day: Days,
      Notification: t.Boolean,
    });
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
    const postTime = (value) => {
      let hour = value.getHours();
      let minute = value.getMinutes();
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      const fueltime = hour + '-' + minute;
      this.props.postFuelTime(fueltime);
      hideModal();
    };
    const Form = t.form.Form;

    // This clones the global Form stylesheet.
    const formStylesheet = JSON.parse(JSON.stringify(t.form.Form.stylesheet));

    // Changes background color for Day picker
    formStylesheet.pickerContainer.normal.backgroundColor = '#fff';
    formStylesheet.pickerContainer.normal.width = width / 1.8;
    formStylesheet.pickerContainer.normal.marginBottom = 20;
    formStylesheet.formGroup.normal.paddingRight = 20;
    formStylesheet.formGroup.normal.paddingLeft = 15;
    formStylesheet.pickerContainer.normal.borderRadius = 0;
    formStylesheet.formGroup.normal.flexDirection = 'row';
    formStylesheet.formGroup.error.flexDirection = 'row';
    formStylesheet.formGroup.normal.justifyContent = 'space-between';
    formStylesheet.textbox.normal.flex = 1;
    formStylesheet.textbox.error.flex = 1;
    // Sets the cloned stylesheet as the new stylesheet
    const FormOptions = {
      stylesheet: formStylesheet,
    };
    console.log(formStylesheet);
    return (
      <View style={styles.container}>
        <Text
          style={styles.debugColor}
        >
          Current time: {user.FuelTime}
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.timeBox}>
            <Text style={styles.textField}>Tidspunkt</Text>
            <View style={styles.buttonBox}>
              <TouchableOpacity onPress={() => showModal()}>
                <View style={styles.button}>
                  <Text>{user.FuelTime.replace('-', ':')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formBox}>
            <Form
              ref={c => this.form = c}
              type={FuelDay}
              value={{ Day: user.FuelDay, Notification: user.FuelNotification }}
              onChange={postFuelForm}
              options={FormOptions}
            />
          </View>
        </View>
        <Timepicker
          mode="time"
          isVisible={isShowing}
          onConfirm={postTime}
          onCancel={hideModal}
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
    isShowing: state.modals.isShowing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postFuelDay: (weekday, toggle) => dispatch(postFuelDay(weekday, toggle)),
    postFuelTime: fueltime => dispatch(postFuelDay(undefined, undefined, fueltime)),
    showModal: () => dispatch(showModal()),
    hideModal: () => dispatch(hideModal()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FuelDayForm);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: width / 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: width,
  },
  buttonBox: {
    // marginLeft: 50,
    paddingLeft: 6,
    width: width / 1.8,
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    width: width / 1.1,
    marginBottom: 20,
    paddingRight: 15,
  },
  formBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: width / 1.1,

  },
  textField: {
    height: width / 8,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
