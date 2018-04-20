import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import FuelRefillItem from './FuelRefillItem';


const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

// should be
const FuelRefillList = ({ fuelRefills }) => {

  return (
    <ScrollView style={styles.container}>
      {(fuelRefills.length < 1) ? (
        <Text style={styles.text}> No refills </Text>
      ) : (
        fuelRefills
          .sort((a, b) => {
            return a.FuelTime < b.FuelTime ? 1 : -1;
          })
          .map(data =>
            (<FuelRefillItem
              key={data.RefillID}
              FuelTime={data.FuelTime}
            />))
      )}
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = (state) => {
  return {
    hasErrored: state.fuelRefill.hasErrored,
    isLoading: state.fuelRefill.isLoading,
    fuelRefills: state.fuelRefill.fuelRefills,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillList);
