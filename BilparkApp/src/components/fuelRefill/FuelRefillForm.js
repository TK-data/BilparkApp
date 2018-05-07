import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import Timepicker from 'react-native-modal-datetime-picker';
import { showFuelRefillModal, hideModal } from '../../actions/fuelDay';
import { setDate, setRate, setPrice, reset } from '../../actions/fuelRefillForm';

import { postFuelRefill } from '../../actions/fuelRefill';

const months = {
  0: 'januar',
  1: 'februar',
  2: 'mars',
  3: 'april',
  4: 'mai',
  5: 'juni',
  6: 'juli',
  7: 'august',
  8: 'september',
  9: 'oktober',
  10: 'november',
  11: 'desember',
};

const styles = StyleSheet.create({
  whitetext: {
    color: 'white',
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  view: {
    flex: 1,
    margin: 5,
  },
});

const FuelRefillForm = ({ register, date, rate, price, changePrice, changeRate, changeDate, resetInput, isShowing, showModal, hideModal }) => {


  const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  return (
    <View style={styles.content}>
      {/* <TouchableOpacity style={styles.view} onPress={() => resetInput()}>
        <Text style={styles.whitetext}> reset </Text>
      </TouchableOpacity> */}
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
      <TouchableOpacity style={styles.view} onPress={() => showModal()}>
        <View>
          <Text style={styles.whitetext}>{hours + ':' + minutes}</Text>
          <Text style={styles.whitetext}>{date.getDate() + '. ' + months[date.getMonth()].substring(0, 3)}</Text>
        </View>
      </TouchableOpacity>
      <Timepicker
        mode="datetime"
        isVisible={isShowing}
        onConfirm={changeDate}
        onCancel={hideModal}
      />
      <Button
        light
        style={styles.button}
        onPress={() => {
          register(date, price, rate);
        }}
      >
        <Text style={styles.text}>Registrer</Text>
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
    changeDate: (time) => {
      dispatch(setDate(time));
      dispatch(hideModal());
    },
    resetInput: () => { dispatch(reset()); },
    showModal: () => dispatch(showFuelRefillModal()),
    hideModal: () => dispatch(hideModal()),
  };
};

const mapStateToProps = (state) => {
  return {
    date: state.fuelRefillForm.date,
    rate: state.fuelRefillForm.rate,
    price: state.fuelRefillForm.price,
    isShowing: state.modals.fuelRefill,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillForm);
