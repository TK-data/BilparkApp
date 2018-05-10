import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { travelLogDistance } from '../../actions/travelLog';
import GooglePlacesInputFrom from './GooglePlacesAutocompleteFrom';
import GooglePlacesInputTo from './GooglePlacesAutocompleteTo';

const distance = require('../../../node_modules/react-native-google-matrix/index.js');

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: '#002776',
  },
  logo: {
    height: 25,
    width: 112,
  },
});

class TravelLogInput extends React.Component {

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
          <Text>
            {this.props.from}
          </Text>
          <Text>
            {this.props.to}
          </Text>
          <Text>
            {this.props.distance}
          </Text>
          <Button
            bordered
            light
            onPress={() => {
              this.handleSubmit();
            }}
          >
            <Text>
              Click me
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    distance: state.travelLog.distance,
    from: state.travelLog.positionFrom,
    to: state.travelLog.positionTo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDistance: distanceFromTo => dispatch(travelLogDistance(distanceFromTo)),
  };
};

TravelLogInput.navigationOptions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelLogInput);
