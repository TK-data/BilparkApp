import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Spinner } from 'native-base';
import { postUser, postCurrent, loginMail } from '../../actions/auth';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.props.postCurrent();
  }

  handleSubmit() {
    const value = this.form.getValue();
    if (value) {
      this.props.loginMail({ Epost: value.Epost });
      this.props.postUser(value.Epost, value.Passord);
    }
  }

  render() {

    const mailCheck = t.refinement(t.String, (email) => {
      const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return reg.test(email);
    });

    const passwordCheck = t.refinement(t.String, (pass) => {
      return (pass.length >= 8);
    });

    const Login = t.struct({
      Epost: mailCheck,
      Passord: passwordCheck,
    });

    const Form = t.form.Form;

    if (this.props.isLoading) {
      return <View style={styles.container}><Spinner color="white" /></View>;
    }

    return (
      <View style={styles.container}>
        <Form
          ref={c => this.form = c}
          type={Login}
          options={this.props.formOptions}
          value={this.props.mail}
        />
        <Button
          transparent
          light
          onPress={() => {
            this.handleSubmit();
          }}
          style={styles.button}
        >
          <Text> Logg inn </Text>
        </Button>
        <Button
          transparent
          light
          onPress={() => this.props.registerScreen()}
          style={styles.button}
        >
          <Text>Registrer deg her</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    hasErrored: state.auth.hasErrored,
    user: state.auth.user,
    mail: state.loginMail,
    formOptions: state.loginOptions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUser: (username, password) => dispatch(postUser(username, password)),
    postCurrent: () => dispatch(postCurrent()),
    loginMail: mail => dispatch(loginMail(mail)),
    registerScreen: () => {
      dispatch(NavigationActions.navigate({ routeName: 'Register' }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);


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
