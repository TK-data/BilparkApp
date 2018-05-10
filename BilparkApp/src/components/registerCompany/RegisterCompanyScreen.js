import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import CompanyPicker from './CompanyPicker';
import { getCompanies } from '../../actions/registerCompany';


const styles = StyleSheet.create({
});

const RegisterCompanyScreen = ({ getCompanyList }) => {
  getCompanyList();

  return (
    <View>
      <View>
        <Text> Velg tilhørighet </Text>
      </View>
      <View>
        <CompanyPicker />
      </View>
    </View>
  );
};

RegisterCompanyScreen.navigationOptions = {
  title: 'Selskap',
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyList: () => dispatch(getCompanies()),
  };
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompanyScreen);
