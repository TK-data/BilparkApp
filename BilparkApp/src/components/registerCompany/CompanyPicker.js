import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Picker } from 'native-base';
import { connect } from 'react-redux';

import { saveCompany, selectCompany } from '../../actions/registerCompany';

const styles = StyleSheet.create({
});

const CompanyPicker = ({ selectedCompany, changeSelect, postCompany, companies }) => {

  return (
    <View>
      <View>
        <Picker selectedValue={selectedCompany} onValueChange={value => changeSelect(value)}>
          <Picker.Item label="Velg firma" value="" />
          {companies.map(company =>
            (<Picker.Item
              key={company.CompanyID}
              label={company.CompanyName}
              value={company.CompanyID}
            />))}
        </Picker>
      </View>
      <View>
        <Button
          light
          onPress={() => ((selectedCompany === '') ? null : postCompany(selectedCompany))}
        >
          <Text>
            Send
          </Text>
        </Button>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postCompany: value => dispatch(saveCompany(value)),
    changeSelect: value => dispatch(selectCompany(value)),
  };
};

const mapStateToProps = (state) => {
  return {
    companies: state.registerCompany.companies,
    selectedCompany: state.registerCompany.selectedCompany,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPicker);
