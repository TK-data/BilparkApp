import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { getCar } from '../../actions/registerCar';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250,
  },
  container: {
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250,
  },
});

const renderInput = ({ input: { onChange, ...restInput } }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      {...restInput}
      placeholder="VH00000"
    />
  );
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.getCar(values.regnr);
  }

  render() {
    const { handleSubmit } = this.props;

    let main = (
      <View>
        <Text>Registreringsnummer:</Text>
        <Field name="regnr" component={renderInput} />
        <TouchableOpacity onPress={handleSubmit(this.submit)}>
          <Text style={styles.button}>Finn bil</Text>
        </TouchableOpacity>
      </View>
    );


    if (this.props.isLoading) {
      main = (
        <View style={styles.container}>
          <Text>Laster..</Text>
        </View>
      );
    } else if (this.props.hasErrored) {
      main = (
        <View>
          <Text>Registreringsnummeret finnes ikke! Prøv på nytt:</Text>
          <Field name="regnr" component={renderInput} />
          <TouchableOpacity onPress={handleSubmit(this.submit)}>
            <Text style={styles.button}>Finn bil</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.car) {
      main = (
        <View>
          <Text>Er dette din bil?</Text>
          <Text>{this.props.car}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {main}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car,
    isLoading: state.carFetchLoading,
    hasErrored: state.carFetchFailure,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: regnr => dispatch(getCar(regnr)),
  };
};

const FormClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default reduxForm({
  form: 'getCar', // a unique name for this form
})(FormClass);

