import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';

import SettingsButton from './SettingsButton';
import { getFuelRefills } from '../../actions/fuelRefill';
import FuelRefillForm from './FuelRefillForm';
import FuelRefillList from './FuelRefillList';
import FuelSetNotificationScreen from '../fuelDayModal/FuelSetNotificationScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002776',
  },
  modal: {
    alignContent: 'center',
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

    let modal = (<View style={styles.modal} />);

    if (this.props.user) {
      const user = JSON.parse(this.props.user);
      if (!user.FuelNotification) {
        modal = (
          <View style={styles.modal}>
            <FuelSetNotificationScreen />
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        {modal}
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
});

const mapStateToProps = () => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillScreen);
