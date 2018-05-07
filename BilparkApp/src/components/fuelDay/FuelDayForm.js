import React, { Component } from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import Timepicker from 'react-native-modal-datetime-picker';
import { Notifications, Permissions, Constants } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { showModal, hideModal, postFuelDay } from '../../actions/fuelDay';

const width = Dimensions.get('window').width;
const window = Dimensions.get('window');

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

  sendDelayedNotification = () => {
    const localNotification = {
      title: 'Fyll bensin!',
      body: 'Det er billigst i dag - husk å fylle',
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

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
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
    formStylesheet.formGroup.normal.paddingRight = 20;
    formStylesheet.formGroup.normal.paddingLeft = 15;
    formStylesheet.pickerContainer.normal.borderRadius = 0;
    formStylesheet.formGroup.normal.flexDirection = 'row';
    formStylesheet.formGroup.error.flexDirection = 'row';
    formStylesheet.formGroup.normal.justifyContent = 'space-between';
    formStylesheet.textbox.normal.flex = 1;
    formStylesheet.textbox.error.flex = 1;
    formStylesheet.formGroup.normal.alignItems = 'center';
    formStylesheet.formGroup.normal.marginBottom = 40;
    formStylesheet.pickerValue.normal.paddingLeft = 0;
    formStylesheet.pickerValue.normal.marginLeft = 'auto';
    formStylesheet.pickerValue.normal.marginRight = 'auto';

    // Sets the cloned stylesheet as the new stylesheet
    const FormOptions = {
      stylesheet: formStylesheet,
      fields: {
        Day: {
          label: 'Ukedag',
        },
        Notification: {
          label: 'Påminnelse',
        },
      },
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.introText}>
            Sett inn ønsket tidspunkt for påminnelse om bensinfylling.
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.timeBox}>
              <Text style={styles.textField}>Tidspunkt</Text>
              <View style={styles.buttonBox}>
                <TouchableOpacity onPress={() => showModal()}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{user.FuelTime.replace('-', ':')}</Text>
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
        </ScrollView>
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
    height: window.height / 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.8,
  },
  buttonText: {
    fontSize: 15,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    color: 'white',
    fontSize: 18,
    width: width / 1.1,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    marginTop: window.height / 20,
  },
  buttonBox: {
    paddingLeft: 6,
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.1,
    marginBottom: 20,
    paddingRight: 15,
  },
  formBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.1,

  },
  textField: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: window.height / 50,
    paddingLeft: 5,
  },
});
