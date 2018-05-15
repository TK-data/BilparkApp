import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Picker, Spinner, View, Text, Button, Icon } from 'native-base';
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
  pickerios: {
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  placeholder: {
    color: 'black',
  },
  sendButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

const CompanyPicker = ({ hasErrored, isLoading, selectedCompany, changeSelect, postCompany, companies }) => {

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Noe gikk galt når firmaer skulle hentes..</Text>
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

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <View>
          <Picker
            iosHeader="Velg Selskap"
            iosIcon={<Icon android="md-arrow-dropdown" color="black" />}
            mode="dropdown"
            style={styles.picker}
            selectedValue={selectedCompany}
            onValueChange={value => changeSelect(value)}
            placeholder="Velg selskap"
          >
            { Platform.OS === 'android' && <Picker.Item label="Velg" value="" /> }
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
            bordered
            light
            onPress={() => ((selectedCompany === '') ? null : postCompany(selectedCompany))}
            style={styles.sendButton}
          >
            <Text>
              Send
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  // if ios
  return (
    <View style={styles.container}>
      <View>
        <Picker
          iosHeader="Velg Selskap"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          mode="dropdown"
          style={styles.pickerios}
          selectedValue={selectedCompany}
          onValueChange={value => changeSelect(value)}
          placeholder="Velg selskap"
          placeholderStyle={styles.placeholder}
          headerBackButtonText="<"
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
        <Button
          bordered
          light
          onPress={() => ((selectedCompany === '') ? null : postCompany(selectedCompany))}
          style={styles.sendButton}
        >
          <Text>
            Lagre
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
    hasErrored: state.registerCompany.hasErrored,
    isLoading: state.registerCompany.isLoading,
    selectedCompany: state.registerCompany.selectedCompany,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPicker);
