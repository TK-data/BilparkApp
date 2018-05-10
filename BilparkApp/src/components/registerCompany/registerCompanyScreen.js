import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import CompanyPicker from './CompanyPicker';
import { getCompanies } from '../../actions/registerCompany';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
  title: {
    // marginTop: window.width / 0.1,
    color: 'white',
    fontSize: 30,
  },
});

const RegisterCompanyScreen = ({ getCompanyList }) => {
  getCompanyList();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Velg tilhørighet </Text>
      <CompanyPicker />
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
