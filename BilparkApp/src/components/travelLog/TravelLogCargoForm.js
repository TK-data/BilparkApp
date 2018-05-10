import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { travelLogCargo } from '../../actions/travelLog';

class TravelLogCargoForm extends Component {

  onChange(value) {
    this.props.cargoValue(value);
  }

  render() {

    const Cargo = t.struct({
      Cargo: t.Boolean,
    });

    const Form = t.form.Form;

    const formOptions = {
      fields: {
        Cargo: {
          label: 'Bagasje'
        },
      },
    };

    return (
      <View style={styles.container}>
        <Form
          ref={c => this.form = c}
          type={Cargo}
          options={formOptions}
          value={this.props.cargo}
          onChange={value => this.onChange(value)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cargo: state.travelLog.cargoValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cargoValue: cargoValue => dispatch(travelLogCargo(cargoValue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TravelLogCargoForm);


const styles = StyleSheet.create({
  container: {
  },
  input: {
    height: 37,
    width: 250,
  },
  text: {
    color: '#fff',
  },
  button: {
    alignSelf: 'center',
  },
});
