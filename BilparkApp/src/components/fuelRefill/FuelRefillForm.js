import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { setDate, setRate, setPrice, reset } from '../../actions/fuelRefillForm';

import { postFuelRefill } from '../../actions/fuelRefill';


const styles = StyleSheet.create({
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  view: {
    flex: 1,
    margin: 5,
  },
});

const FuelRefillForm = ({ register, date, rate, price, changePrice, changeRate, resetInput }) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.view} onPress={() => resetInput()}>
        <Text style={styles.text}> reset </Text>
      </TouchableOpacity>
      <View
        style={styles.view}
        backgroundColor="white"
        borderRadius={3}
      >
        <TextInput
          value={price}
          style={styles.input}
          selectionColor="black"
          onChangeText={(text) => {
            changePrice(text);
          }}
          placeholder="pris"
          maxLength={5}
        />
      </View>
      <View
        style={styles.view}
        backgroundColor="white"
        borderRadius={3}
      >
        <TextInput
          value={rate}
          style={styles.input}
          selectionColor="black"
          onChangeText={(text) => {
            changeRate(text);
          }}
          placeholder="kr/l"
          maxLength={5}
        />
      </View>
      <Button
        light
        style={styles.view}
        onPress={() => {
          register(date, rate, price);
        }}
      >
        <Text> Registrer </Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (fueltime, price, rate) => {
      dispatch(postFuelRefill(fueltime, price, rate));
    },
    changePrice: (price) => { dispatch(setPrice(price)); },
    changeRate: (rate) => { dispatch(setRate(rate)); },
    resetInput: () => { dispatch(reset()); },
  };
};

const mapStateToProps = (state) => {
  return {
    date: state.fuelRefillForm.date,
    rate: state.fuelRefillForm.rate,
    price: state.fuelRefillForm.price,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillForm);
