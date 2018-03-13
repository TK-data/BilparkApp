import React from 'react';
import t from 'tcomb-form-native';

import { StyleSheet, View, Button, ScrollView, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserService from '../actions/userAction';

const width = Dimensions.get('window').width;

t.form.Form.stylesheet.textbox.normal.color = '#000';
t.form.Form.stylesheet.formGroup.normal.width = (width - 20);
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

const User = t.struct({
  Email: t.String,
  Fname: t.String,
  Lname: t.String,
  Address: t.String,
  Password: t.String,
});

const options = {
  fields: {
    Email: {
      label: 'Epost',
      error: 'Uten eposten din så vil det ikke være mulig å gjennopprette passord',
    },
    Fname: {
      label: 'Fornavn',
      error: 'Tjenesten er avhengig av fornavnet for å autorisere deg.',
    },
    Lname: {
      label: 'Etternavn',
      error: 'Tjenesten er avhengig av etternavnet for å autorisere deg.',
    },
    Address: {
      label: 'Adresse',
      error: 'Tjenesten er avhengig av adressen din for å autorisere deg.',
    },
    Password: {
      label: 'Passord',
      error: 'Uten passord vil det ikke være mulig å logge inn.',
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
      users: [],
    };

    this.getUsers = this.getUsers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
  }

  async getUsers() {
    await UserService.getUsers().then(res => this.setState({
      users: res,
    }));
    console.log(this.state.users);
  }

  async handleSubmit() {
    const value = this.form.getValue(); // use that ref to get the form value
    console.log('value: ', JSON.stringify(value));
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
