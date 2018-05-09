import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CompanyPicker from './CompanyPicker';

const styles = StyleSheet.create({
});

const RegisterCompanyScreen = () => (
  <View>
    <View>
      <Text> Velg tilhørighet </Text>
    </View>
    <View>
      <CompanyPicker />
    </View>
  </View>
);

RegisterCompanyScreen.navigationOptions = {
  title: 'Selskap',
};

export default RegisterCompanyScreen;
