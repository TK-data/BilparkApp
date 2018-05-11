import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Picker, Spinner, View, Text } from 'native-base';
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

const CompanyPicker = ({ hasErrored, isLoading, selectedCompany, changeSelect, postCompany, companies }) => {

  if (hasErrored || companies.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Noe gikk galt når firmaer skulle hentes..</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Spinner color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Picker
          iosHeader="Velg Selskap"
          mode="dropdown"
          style={styles.picker}
          selectedValue={selectedCompany}
          onValueChange={value => changeSelect(value)}
          placeholder="Velg selskap"
        >
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
    hasErrored: state.registerCompany.hasErrored,
    isLoading: state.registerCompany.isLoading,
    selectedCompany: state.registerCompany.selectedCompany,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPicker);
