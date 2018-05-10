import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text, Button, TouchableOpacity } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { travelLogDistance, travelLogDatepickerVisible, travelLogSaveDate } from '../../actions/travelLog';
import GooglePlacesInputFrom from './GooglePlacesAutocompleteFrom';
import GooglePlacesInputTo from './GooglePlacesAutocompleteTo';


const distance = require('../../../node_modules/react-native-google-matrix/index.js');

class TravelLogInput extends React.Component {

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  handleSubmit() {
    distance.get(
      {
        origin: this.props.from,
        destination: this.props.to,
      },
      (err, data) => {
        if (err) return console.log(err);
        this.props.saveDistance(data.distance);
      },
    );
  }


  render() {


    return (
      <View>
        <GooglePlacesInputFrom />
        <GooglePlacesInputTo />
        <View>
          <Text style={styles.distance}>
            Distanse: {this.props.distance}
          </Text>
          <Button
            bordered
            light
            onPress={() => {
              this.handleSubmit();
            }}
          >
            <Text>
              Regn ut distanse
            </Text>
          </Button>
          <DateTimePicker
            isVisible={this.props.datepickerVisible}
            onConfirm={data => this.props.saveDatepickerDate((data.getDate() + '.' + (data.getMonth() + 1) + '.' + (data.getFullYear())))}
            onCancel={() => this.props.datepickerVisibility(false)}
          />
          <Button
            bordered
            light
            onPress={() => {
              this.props.datepickerVisibility(true);
            }}
          >
            <Text>
              {this.props.datepickerDate}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  distance: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
  },
  logo: {
    height: 25,
    width: 112,
  },
});

const mapStateToProps = (state) => {
  return {
    distance: state.travelLog.distance,
    from: state.travelLog.positionFrom,
    to: state.travelLog.positionTo,
    datepickerVisible: state.travelLog.datepickerVisible,
    datepickerDate: state.travelLog.datepickerDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDistance: distanceFromTo => dispatch(travelLogDistance(distanceFromTo)),
    datepickerVisibility: bool => dispatch(travelLogDatepickerVisible(bool)),
    saveDatepickerDate: date => dispatch(travelLogSaveDate(date)),
  };
};

TravelLogInput.navigationOptions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelLogInput);
