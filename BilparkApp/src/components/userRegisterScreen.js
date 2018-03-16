import React from 'react';
import t from 'tcomb-form-native';
// Ikke skriv om emil sin kode

import { Text, Modal, StyleSheet, View, Button, ScrollView, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserService from '../actions/userRegisterAction';

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

const formOptions = {
  fields: {
    Email: {
      hasError: false,
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
      error: 'Vennligst fyll inn adressen din',
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#002776',
  },
  modalText: {
    color: '#fff',
  },
});

class registerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      options: {},
      modalVisible: false,
      modalTransparent: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    // Sets state for dev
    this.setState({
      value: {
        Email: 'emips@live.no',
        Fname: 'Giulio',
        Lname: 'Canti',
        Address: 'singsasdas',
        Password: 'hgavdbaslkasd',
      },
      options: formOptions,
    });
  }

  onChange(values) {
    this.setState({
      value: values,
    });
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  async handleSubmit(visible) {
    const value = this.form.getValue(); // use that ref to get the form value
    console.log('Value: ', value);
    if (value) {
      await UserService.postUserExample(value).then((res) => {
        if (res.Error === 'Email') {
          this.setState({
            options: {
              fields: {
                Email: {
                  hasError: true,
                  label: 'Epost',
                  error: 'Eposten er allerede i bruk',
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
                  error: 'Vennligst fyll inn adressen din',
                },
                Password: {
                  label: 'Passord',
                  error: 'Passord må ha minst 8 tegn',
                  password: true,
                  secureTextEntry: true,
                },
              },
            },
          });
        } else {
          this.setState({
            options: {
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
                  error: 'Vennligst fyll inn adressen din',
                },
                Password: {
                  label: 'Passord',
                  error: 'Passord må ha minst 8 tegn',
                  password: true,
                  secureTextEntry: true,
                },
              },
            },
          });
          this.setModalVisible(visible);
          this.setState({
            value: null,
          });
        }
      });
    } else {
      this.setState({
        options: {
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
              error: 'Vennligst fyll inn adressen din',
            },
            Password: {
              label: 'Passord',
              error: 'Passord må ha minst 8 tegn',
              password: true,
              secureTextEntry: true,
            },
          },
        },
      });
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
              options={this.state.options}
              value={this.state.value}
              onChange={this.onChange}
            />
            <Button
              title="Registrer"
              onPress={() => {
                this.handleSubmit(!this.state.modalVisible);
              }}
            />
          </View>
        </ScrollView>
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent={this.state.modalTransparent}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.modalText}>Registrering godkjent</Text>
            <Button
              title="Gå til innlogging"
              onPress={() => {
                this.setModalVisible(false);
              }}
            />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}

export default registerScreen;
