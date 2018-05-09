import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002776',
  },
});

const DamageReportScreen = () => (
  <View style={styles.container}>
    <Text>This is the DamageReportScreen</Text>
  </View>
);

DamageReportScreen.navigationOptions = {
  title: 'Registrer skader på din bil',
};

export default DamageReportScreen;
