import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerUserModalVisible } from '../../actions/registerUser';
import GooglePlacesInputFrom from './GooglePlacesAutocompleteFrom';
import GooglePlacesInputTo from './GooglePlacesAutocompleteTo';


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

  componentDidMount() {
    this.props.visibleModal(false);
  }

  render() {
    const distance = require('../../../node_modules/react-native-google-matrix/index.js');

    distance.get(
      {
        origin: '-7.841879,110.409193',
        destination: '-7.741194,110.342588',
      },
      (err, data) => {
        if (err) return console.log(err);
        console.log(data);
      },
    );
    return (
      <View>
        <GooglePlacesInputFrom />
        <GooglePlacesInputTo />
        <View>
          <Text>
            test
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    visibleModal: bool => dispatch(registerUserModalVisible(bool)),
  };
};

TravelLogInput.navigationOptions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelLogInput);
