import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Picker } from 'native-base';
import { connect } from 'react-redux';

// import action to get companies

const style = StyleSheet.create({
})

const CompanyPicker = ({ getCompanies, postCompany, companies }) => {

  return (
    <View>
      <View>
        <Picker />
      </View>
      <View>
        <Button light>
          <Text>
            Send
          </Text>
        </Button>
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => null,
    postCompany: () => null,
  };
};

const mapStateToProps = (state) => {
  return {
    companies: state.companies,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPicker);
