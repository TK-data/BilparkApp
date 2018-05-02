import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { setDate, setLiters, setPrice, reset } from '../../actions/fuelRefillForm';

import { postFuelRefill } from '../../actions/fuelRefill';


const styles = StyleSheet.create({
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    width: 60,
    fontSize: 20,
    margin: 5,
  },
});

const FuelRefillForm = ({ register, date, liters, price, changePrice, changeLiters, resetInput }) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={() => resetInput()}>
        <Text style={styles.text}> reset </Text>
      </TouchableOpacity>
      <View
        backgroundColor="white"
        borderRadius={3}
      >
        <TextInput
          value={liters}
          style={styles.input}
          selectionColor="black"
          onChangeText={(text) => {
            changeLiters(text);
          }}
          placeholder="liter"
          maxLength={5}
        />
      </View>
      <View
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
          placeholder="kr/l"
          maxLength={5}
        />
      </View>
      <Button
        light
        style={styles.button}
        onPress={() => {
          register(date, liters, price);
        }}
      >
        <Text> Registrer </Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (fueltime, price, liters) => {
      dispatch(postFuelRefill(fueltime, price, liters));
    },
    changePrice: (price) => { dispatch(setPrice(price)); },
    changeLiters: (liters) => { dispatch(setLiters(liters)); },
    resetInput: () => { dispatch(reset()); },
  };
};

const mapStateToProps = (state) => {
  return {
    date: state.fuelRefillForm.date,
    liters: state.fuelRefillForm.liters,
    price: state.fuelRefillForm.price,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillForm);
