import React from 'react';
import t from 'tcomb-form-native';

import { StyleSheet, View, Button, ScrollView, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserService from '../actions/userAction';

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
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; // or any other regexp
  return reg.test(email);
});

const User = t.struct({
  Email: mailCheck,
  Fname: t.String,
  Lname: t.String,
  Address: t.String,
  Password: t.String,
});

const options = {
  fields: {
    Email: {
      label: 'Epost',
      error: 'Vennligst fyll inn en korrekt epost',
    },
    Fname: {
      label: 'Fornavn',
      error: 'Vennligst fyll inn fornavnet ditt',
    },
    Lname: {
      label: 'Etternavn',
      error: 'Vennligst fyll inn etternavnet ditt',
    },
    Address: {
      label: 'Adresse',
      error: 'Vennligst fyll inn adressen ditt',
    },
    Password: {
      label: 'Passord',
      error: 'Passord må ha minst 8 tegn',
      password: true,
      secureTextEntry: true,
    },
  },
};

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

class userScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: {
        Email: 'emips@live.no',
        Fname: 'Giulio',
        Lname: 'Canti',
        Address: 'singsasdas',
        Password: 'hgavdbaslkasd',
      },
    });
  }

  async handleSubmit() {
    const value = this.form.getValue(); // use that ref to get the form value
    if (value) {
      await UserService.postUserExample(value).then(res => console.log(res));
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#002776' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.keyboard}
      >
        <ScrollView>
          <View style={styles.container}>
            <Form
              ref={c => this.form = c}
              type={User}
              options={options}
              value={this.state.value}
            />
            <Button
              title="Registrer"
              onPress={this.handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

export default userScreen;
