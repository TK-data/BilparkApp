import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
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

  onChange(value) {
    this.props.formValue(value);
    this.props.formType(getType(value));
  }

  render() {

    const Form = t.form.Form;

    const formOptions = {
      fields: {
        Passenger: {
          label: 'Antall passasjerer:',
          nullOption: { value: '', text: 'Velg antall Passasjerer' },

        },
        Passenger1: {
          label: 'Passasjer 1:',
        },
        Passenger2: {
          label: 'Passasjer 2:',
        },
        Passenger3: {
          label: 'Passasjer 3:',
        },
        Passenger4: {
          label: 'Passasjer 4:',
        },
        Passenger5: {
          label: 'Passasjer 5:',
        },
        Comment: {
          label: 'Kommentar (Valgfritt)',
          multiline: true,
          numberOfLines: 3,
        },
      },
    };

    return (
      <View style={styles.container}>
        <Form
          ref={c => this.form = c}
          type={this.props.type}
          options={formOptions}
          value={this.props.value}
          onChange={value => this.onChange(value)}
        />
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
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
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
