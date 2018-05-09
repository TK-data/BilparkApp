import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'native-base';

const styles = StyleSheet.create({

});

class DamageReportForm extends Component {
  onChange(values) {
    this.props.addValues(values);
    console.log(values);
  }


  render() {
    const formOptions = {
    };
    const Damages = t.struct({
      KarosseriVenstre: t.Boolean,
      KarosseriHøyre: t.Boolean,
      StøtfangerFront: t.Boolean,
      StøtfangerBak: t.Boolean,
      LysUtvendig: t.Boolean,
      Glass: t.Boolean,
      FelgHjul: t.Boolean,
    });
    const Form = t.form.Form;
    return (
      <View style={styles.searchContainer}>
        <Form
          ref={c => this.form = c}
          type={Damages}
          options={formOptions}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DamageReportForm);
