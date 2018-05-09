import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CompanyPicker from './CompanyPicker';

const styles = StyleSheet.create({
});

const ChooseCompanyScreen = () => (
  <View>
    <View>
      <Text> Velg tilhørighet </Text>
    </View>
    <View>
      <CompanyPicker />
    </View>
  </View>
);

ChooseCompanyScreen.navigationOptions = {
  title: 'Selskap',
};

export default ChooseCompanyScreen;
