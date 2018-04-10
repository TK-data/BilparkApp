import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const LoginStatusMessage = ({ user, isLoggedIn, dispatch }) => {
  if (!isLoggedIn) {
    return <Text>Vennligst logg inn</Text>;
  }
  return (
    <View>
      <Text style={styles.welcome}>
        {'Du er logget inn som!'}
      </Text>
      <Text style={styles.weclome}>
        { user.Email}
      </Text>
      <Button
        onPress={() =>
          dispatch(NavigationActions.navigate({ routeName: 'Menu' }))}
        title="Profil"
      />
      <Button
        onPress={() =>
          dispatch(NavigationActions.navigate({ routeName: 'RegisterCar' }))}
        title="Register bil"
      />
      <Button
        onPress={() =>
          dispatch(NavigationActions.navigate({ routeName: 'FuelDay' }))}
        title="Planlegging av tanking"
      />
    </View>
  );
};

LoginStatusMessage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps)(LoginStatusMessage);
