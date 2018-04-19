import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';

import { getFuelRefills } from '../../actions/fuelRefill';
import FuelRefillForm from './FuelRefillForm';
import FuelRefillList from './FuelRefillList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#002776',
  },
  content: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#002776',
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
  },
});

class FuelRefillScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.getItems();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
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
});

const mapStateToProps = (state) => {
  return {
  };
};

// to be done. Dispatch to get items on component did mount

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillScreen);
