import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from 'native-base';
import { connect } from 'react-redux';

import { saveCompany, selectCompany } from '../../actions/registerCompany';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    marginTop: 20,
  },
  button: {
    alignSelf: 'stretch',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  picker: {
    backgroundColor: 'white',
  },
});

const CompanyPicker = ({ selectedCompany, changeSelect, postCompany, companies }) => {

  return (
    <View style={styles.container}>
      <View>
        <Picker style={styles.picker} selectedValue={selectedCompany} onValueChange={value => changeSelect(value)}>
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
        <TouchableOpacity
          onPress={() => ((selectedCompany === '') ? null : postCompany(selectedCompany))}
        >
          <Text style={styles.text}>
            Send
          </Text>
        </TouchableOpacity>
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
