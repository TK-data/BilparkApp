import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Spinner } from 'native-base';
import { travelLogFormValue, travelLogFormType } from '../../actions/travelLog';

function getType(value) {

  const Passengers = t.enums({
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  });

  if (value.Passenger === '1') {
    return t.struct({
      Passenger: Passengers,
      Passenger1: t.String,
    });
  } else if (value.Passenger === '2') {
    return t.struct({
      Passenger: Passengers,
      Passenger1: t.String,
      Passenger2: t.String,
    });
  } else if (value.Passenger === '3') {
    return t.struct({
      Passenger: Passengers,
      Passenger1: t.String,
      Passenger2: t.String,
      Passenger3: t.String,
    });
  } else if (value.Passenger === '4') {
    return t.struct({
      Passenger: Passengers,
      Passenger1: t.String,
      Passenger2: t.String,
      Passenger3: t.String,
      Passenger4: t.String,
    });
  } else if (value.Passenger === '5') {
    return t.struct({
      Passenger: Passengers,
      Passenger1: t.String,
      Passenger2: t.String,
      Passenger3: t.String,
      Passenger4: t.String,
      Passenger5: t.String,
    });
  }
  return t.struct({
    Passenger: Passengers,
  });

}

class TravelLogPassengerForm extends Component {

  componentWillMount() {
    const Passengers = t.enums({
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
    });

    const Passenger = t.struct({
      Passenger: Passengers,
    });

    this.props.type = Passenger;
  }

  onChange(value) {
    console.log(this.props.value);
    console.log(value);
    this.props.formValue(value);
    this.props.formType(getType(value));
  }

  handleSubmit() {
    const value = this.form.getValue();
    console.log(value);
    if (value) {
      // this.props.loginMail({ Epost: value.Epost });
      // this.props.postUser(value.Epost, value.Passord);
      this.props.formValue(value);
      this.props.formType(getType(value));
    }
  }

  render() {

    const Form = t.form.Form;

    if (this.props.isLoading) {
      return <Spinner color="white" />;
    }

    return (
      <View style={styles.container}>
        <Form
          ref={c => this.form = c}
          type={this.props.type}
          options={this.props.formOptions}
          value={this.props.value}
          onChange={value => this.onChange(value)}
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
    value: state.travelLog.formValue,
    type: state.travelLog.formType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formValue: value => dispatch(travelLogFormValue(value)),
    formType: type => dispatch(travelLogFormType(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TravelLogPassengerForm);


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
