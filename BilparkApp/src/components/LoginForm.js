import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { postUser, postCurrent } from '../actions/auth';

const renderInput = ({ secureTextEntry, placeholder, input: { onChange, ...restInput } }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      {...restInput}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry === 'true'}
    />
  );
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.props.postCurrent();
  }

  submit(values) {
    this.props.postUser(values.username, values.password);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={styles.container}>
        <Text>Skriv inn epost og passord:</Text>
        <Field name="username" component={renderInput} placeholder="email" />
        <Field name="password" component={renderInput} placeholder="password" secureTextEntry="true" />
        <TouchableOpacity onPress={handleSubmit(this.submit)}>
          <Text style={styles.button}>Logg inn</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    hasErrored: state.auth.hasErrored,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUser: (username, password) => dispatch(postUser(username, password)),
    postCurrent: () => dispatch(postCurrent()),
  };
};

const FormClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default reduxForm({
  form: 'login', // a unique name for this form
})(FormClass);


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
    height: 37,
    width: 250,
  },
});
