import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerUserModalVisible } from '../../actions/registerUser';
import TravelLogInput from './TravelLogInput';

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: '#002776',
  },
  logo: {
    height: 25,
    width: 112,
  },
});

class TravelLogScreen extends React.Component {

  componentDidMount() {
    this.props.visibleModal(false);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#002776' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.keyboard}
      >
        <TravelLogInput />
      </KeyboardAwareScrollView>
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

TravelLogScreen.navigationOptions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelLogScreen);
