import React from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { registerUserFetchData, registerUserModalVisible, registerUserResetOptionUpdateValue, registerUserUpdateValue } from '../../actions/registerUser';

const width = Dimensions.get('window').width;

t.form.Form.stylesheet.textbox.normal.color = '#000';
t.form.Form.stylesheet.formGroup.normal.width = (width - 20);
t.form.Form.stylesheet.formGroup.error.width = (width - 20);
t.form.Form.stylesheet.textbox.normal.height = 40;
t.form.Form.stylesheet.textbox.error.height = 40;
t.form.Form.stylesheet.textbox.normal.fontSize = 20;
t.form.Form.stylesheet.textbox.error.fontSize = 20;
t.form.Form.stylesheet.textbox.normal.backgroundColor = '#fff';
t.form.Form.stylesheet.textbox.error.backgroundColor = '#fff';
t.form.Form.stylesheet.textbox.error.borderWidth = 3;
t.form.Form.stylesheet.errorBlock.color = '#db2b1e';
t.form.Form.stylesheet.controlLabel.normal.color = '#fff';
t.form.Form.stylesheet.controlLabel.error.color = '#fff';

const mailCheck = t.refinement(t.String, (email) => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const passwordCheck = t.refinement(t.String, (pass) => {
  return (pass.length >= 8);
});

const stringCheck = t.refinement(t.String, (string) => {
  const reg = /[a-zA-Z0-9-]/;
  return reg.test(string);
});

const User = t.struct({
  Email: mailCheck,
  Fname: stringCheck,
  Lname: stringCheck,
  Address: stringCheck,
  Password: passwordCheck,
});

const Form = t.form.Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002776',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  keyboard: {
    backgroundColor: '#002776',
  },
});

class UserRegisterForm extends React.Component {

  onChange(values) {
    this.props.addValues(values);
  }

  async handleSubmit() {
    const value = this.form.getValue();
    // use that ref to get the form value
    this.props.resetOptions();
    if (value) {
      this.props.fetchData(value);
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this.form = c}
          type={User}
          options={this.props.options}
          value={this.props.values}
          onChange={value => this.onChange(value)}
        />
        <Button
          title="Registrer"
          onPress={() => {
            this.handleSubmit();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.options,
    values: state.values,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: values => dispatch(registerUserFetchData(values)),
    visibleModal: bool => dispatch(registerUserModalVisible(bool)),
    resetOptions: () => dispatch(registerUserResetOptionUpdateValue()),
    addValues: value => dispatch(registerUserUpdateValue(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterForm);
