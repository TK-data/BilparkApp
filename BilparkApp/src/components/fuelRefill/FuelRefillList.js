import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import FuelRefillItem from './FuelRefillItem';


const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});

// should be
const FuelRefillList = ({ fuelRefills }) => {

  return (
    <ScrollView style={styles.container}>
      {(fuelRefills.length < 1) ? (
        <Text style={styles.text}> Ingen registrerte påfyllninger </Text>
      ) : (
        fuelRefills
          .sort((a, b) => {
            return a.FuelTime < b.FuelTime ? 1 : -1;
          })
          .map(data =>
            (<FuelRefillItem
              key={data.RefillID}
              RefillID={data.RefillID}
              FuelTime={data.FuelTime}
              Price={data.Price}
              Rate={data.Rate}
            />))
      )}
    </ScrollView>
  );
};

const mapDispatchToProps = () => ({
});

const mapStateToProps = (state) => {
  return {
    hasErrored: state.fuelRefill.hasErrored,
    isLoading: state.fuelRefill.isLoading,
    fuelRefills: state.fuelRefill.fuelRefills,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillList);
