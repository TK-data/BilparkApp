import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Body } from 'native-base';
import { connect } from 'react-redux';

import SettingsButton from './SettingsButton';
import { getFuelRefills } from '../../actions/fuelRefill';
import FuelRefillForm from './FuelRefillForm';
import FuelRefillList from './FuelRefillList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002776',
  },
  content: {
    flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: '#002776',
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    margin: 15,
  },
  button: {
    alignSelf: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
});

class FuelRefillScreen extends React.Component {
  static navigationOptions = {
    title: 'Drivstoff',
    headerRight: <SettingsButton />,
  }

  constructor(props) {
    super(props);
    this.props.getItems();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FuelRefillForm />
          <Content contentContainerStyle={styles.content}>
            <FuelRefillList />
          </Content>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getItems: () => {
    dispatch(getFuelRefills());
  },
  register: () => {
    dispatch(postFuelRefill());
  },
});

const mapStateToProps = (state) => {
  return {
  };
};

// to be done. Dispatch to get items on component did mount

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillScreen);
