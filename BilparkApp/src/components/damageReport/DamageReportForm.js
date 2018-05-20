import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Alert } from 'react-native';
import { Content, Button, Text, View, Spinner } from 'native-base';

import { postDamageReport, getCurrentDamageReport, damageReportOptions, damageReportValues } from '../../actions/damageReportForm';

const Items = [
  {
    ItemType: 'Wheel',
    Damaged: false,
  },
  {
    ItemType: 'Window',
    Damaged: false,
  },
  {
    ItemType: 'CarLight',
    Damaged: false,
  },
  {
    ItemType: 'FrontBumper',
    Damaged: false,
  },
  {
    ItemType: 'BackBumper',
    Damaged: false,
  },
  {
    ItemType: 'RightBodyWork',
    Damaged: false,
  },
  {
    ItemType: 'LeftBodyWork',
    Damaged: false,
  },
];

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
  },
  finnBil: {
    color: 'white',
    fontSize: 18,
    marginBottom: '8%',
  },
  button: {
    alignSelf: 'center',
    marginBottom: '3%',
  },
});

class DamageReportForm extends Component {
  componentDidMount() {
    this.props.getValues();
    this.props.changeOptions(this.props.values);
  }

  onChange(values) {
    this.props.changeOptions(values);
    Items[0].Damaged = values.FelgHjul;
    Items[0].Description = values.FelgHjulBeskrivelse;
    Items[1].Damaged = values.Glass;
    Items[1].Description = values.GlassBeskrivelse;
    Items[2].Damaged = values.LysUtvendig;
    Items[2].Description = values.LysUtvendigBeskrivelse;
    Items[3].Damaged = values.StøtfangerFront;
    Items[3].Description = values.StøtfangerFrontBeskrivelse;
    Items[4].Damaged = values.StøtfangerBak;
    Items[4].Description = values.StøtfangerBakBeskrivelse;
    Items[5].Damaged = values.KarosseriHøyre;
    Items[5].Description = values.KarosseriHøyreBeskrivelse;
    Items[6].Damaged = values.KarosseriVenstre;
    Items[6].Description = values.KarosseriVenstreBeskrivelse;
    this.props.updateValues(Items);
  }

  handleSubmit() {
    Items[0].Damaged = this.props.values.FelgHjul;
    Items[0].Description = this.props.values.FelgHjulBeskrivelse;
    Items[1].Damaged = this.props.values.Glass;
    Items[1].Description = this.props.values.GlassBeskrivelse;
    Items[2].Damaged = this.props.values.LysUtvendig;
    Items[2].Description = this.props.values.LysUtvendigBeskrivelse;
    Items[3].Damaged = this.props.values.StøtfangerFront;
    Items[3].Description = this.props.values.StøtfangerFrontBeskrivelse;
    Items[4].Damaged = this.props.values.StøtfangerBak;
    Items[4].Description = this.props.values.StøtfangerBakBeskrivelse;
    Items[5].Damaged = this.props.values.KarosseriHøyre;
    Items[5].Description = this.props.values.KarosseriHøyreBeskrivelse;
    Items[6].Damaged = this.props.values.KarosseriVenstre;
    Items[6].Description = this.props.values.KarosseriVenstreBeskrivelse;
    this.props.changeValues(Items);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View>
          <Spinner color="white" />
        </View>
      );
    }

    if (this.props.car === 'null') {
      return (
        <View>
          <Text style={styles.finnBil}>Du har ikke registrert en bil enda.. </Text>
          <Button
            bordered
            light
            onPress={() => { this.props.navigate('RegisterCar'); }}
            style={styles.button}
          >
            <Text>Finn din bil</Text>
          </Button>
        </View>
      );
    }

    const Damages = t.struct({
      KarosseriVenstre: t.Boolean,
      KarosseriVenstreBeskrivelse: t.maybe(t.String),
      KarosseriHøyre: t.Boolean,
      KarosseriHøyreBeskrivelse: t.maybe(t.String),
      StøtfangerFront: t.Boolean,
      StøtfangerFrontBeskrivelse: t.maybe(t.String),
      StøtfangerBak: t.Boolean,
      StøtfangerBakBeskrivelse: t.maybe(t.String),
      LysUtvendig: t.Boolean,
      LysUtvendigBeskrivelse: t.maybe(t.String),
      Glass: t.Boolean,
      GlassBeskrivelse: t.maybe(t.String),
      FelgHjul: t.Boolean,
      FelgHjulBeskrivelse: t.maybe(t.String),
    });
    const Form = t.form.Form;
    return (
      <View style={styles.form}>
        <Content style={styles.content}>
          <Form
            ref={c => this.form = c}
            type={Damages}
            options={this.props.formOptions}
            value={this.props.values}
            onChange={value => this.onChange(value)}
          />
        </Content>
        <Button
          bordered
          light
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'Bekreft skademelding',
              'Er du sikker på at informasjonen er riktig?',
              [
                { text: 'Avbryt', style: 'cancel' },
                { text: 'Lagre', onPress: () => this.handleSubmit() },
              ],
            );
          }}
        >
          <Text> Registrer </Text>
        </Button>
        {this.props.success ? Alert.alert(
          '',
          'Skademeldingen ble lagret',
          [
            { text: 'OK' },
          ],
        ) : null }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.damageReportForm.isLoading,
    hasErrored: state.damageReportForm.hasErrored,
    currentDamageReport: state.damageReportForm.currentDamageReport,
    values: state.damageReportValues,
    car: state.auth.car,
    formOptions: state.damageReportOptions,
    success: state.damageReportForm.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeOptions: options => dispatch(damageReportOptions(options)),
    changeValues: ItemArray => dispatch(postDamageReport(ItemArray)),
    updateValues: values => dispatch(damageReportValues(values)),
    getValues: ItemArray => dispatch(getCurrentDamageReport(ItemArray)),
    navigate: (routeName) => {
      dispatch(NavigationActions.navigate({ routeName }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DamageReportForm);
