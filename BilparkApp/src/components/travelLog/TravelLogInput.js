import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { View, Text, Button, Spinner } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { travelLogDistance, travelLogDatepickerVisible, travelLogSaveDate, postTravelLog, resetComponent } from '../../actions/travelLog';
import GooglePlacesInputFrom from './GooglePlacesAutocompleteFrom';
import GooglePlacesInputTo from './GooglePlacesAutocompleteTo';
import TravelLogPassengerForm from './TravelLogPassengerForm';
import TravelLogCargoForm from './TravelLogCargoForm';

class TravelLogInput extends React.Component {

  render() {
    if (this.props.isLoading) {
      return <Spinner color="white" />;
    }
    return (
      <View style={styles.container}>
        <GooglePlacesInputFrom />
        <GooglePlacesInputTo />
        <View>
          <Text style={styles.distance}>
            Distanse: {this.props.distance}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              Dato:
            </Text>
            <DateTimePicker
              isVisible={this.props.datepickerVisible}
              onConfirm={data => this.props.saveDatepickerDate((data.getDate() + '.' + (data.getMonth() + 1) + '.' + (data.getFullYear())))}
              onCancel={() => this.props.datepickerVisibility(false)}
            />
            <Button
              light
              onPress={() => {
                this.props.datepickerVisibility(true);
              }}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                {this.props.datepickerDate}
              </Text>
            </Button>
          </View>
        </View>
        <TravelLogPassengerForm />
        <TravelLogCargoForm />
        <Button
          bordered
          light
          onPress={() => {
            Alert.alert(
              'Bekreft turen',
              'Er du sikker på at informasjonen er riktig?',
              [
                { text: 'Avbryt', style: 'cancel' },
                { text: 'Lagre', onPress: () => this.props.postTravelLog(this.props.travelLog) },
              ],
            );
          }}
          style={styles.saveButton}
        >
          <Text>
            Lagre kjøring
          </Text>
        </Button>
        {this.props.success ? Alert.alert(
          '',
          'Turen ble lagret i kjøreboken',
          [
            { text: 'OK', onPress: () => this.props.resetComponent() },
          ],
        ) : null }
      </View>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  distance: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  date: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    alignSelf: 'center',
  },
  dateButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
  },
  dateButton: {
    alignSelf: 'flex-end',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (width - 20),
    alignSelf: 'center',
  },
  saveButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    distance: state.travelLog.distance,
    from: state.travelLog.positionFrom,
    to: state.travelLog.positionTo,
    datepickerVisible: state.travelLog.datepickerVisible,
    datepickerDate: state.travelLog.datepickerDate,
    travelLog: state.travelLog,
    isLoading: state.travelLog.isLoading,
    success: state.travelLog.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDistance: distanceFromTo => dispatch(travelLogDistance(distanceFromTo)),
    datepickerVisibility: bool => dispatch(travelLogDatepickerVisible(bool)),
    saveDatepickerDate: date => dispatch(travelLogSaveDate(date)),
    postTravelLog: value => dispatch(postTravelLog(value)),
    resetComponent: () => dispatch(resetComponent()),
  };
};

TravelLogInput.navigationOptions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelLogInput);
