import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Content } from 'native-base';

import postDamageReport from '../../actions/damageReportForm';

const styles = StyleSheet.create({

});

const Items = [
  {
    ItemType: 'Wheel',
    Damaged: true,
    Description: 'cracked or something',
  },
  {
    ItemType: 'Window',
    Damaged: true,
    Description: 'smashed',
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


class DamageReportForm extends Component {
  onChange(values) {
    // this.props.addValues(values);
    // console.log(values);
    Items[0].Damaged = this.form.getValue().FelgHjul;
    Items[0].Description = this.form.getValue().FelgHjulBeskrivelse;
    Items[1].Damaged = this.form.getValue().Glass;
    Items[1].Description = this.form.getValue().GlassBeskrivelse;
    Items[2].Damaged = this.form.getValue().LysUtvendig;
    Items[2].Description = this.form.getValue().LysUtvendigBeskrivelse;
    Items[3].Damaged = this.form.getValue().StøtfangerBak;
    Items[3].Description = this.form.getValue().StøtfangerBakBeskrivelse;
    Items[4].Damaged = this.form.getValue().StøtfangerFront;
    Items[4].Description = this.form.getValue().StøtfangerFrontBeskrivelse;
    Items[5].Damaged = this.form.getValue().KarosseriHøyre;
    Items[5].Description = this.form.getValue().KarosseriHøyreBeskrivelse;
    Items[6].Damaged = this.form.getValue().KarosseriVenstre;
    Items[6].Description = this.form.getValue().KarosseriVenstreBeskrivelse;
    console.log(Items);
    // this.props.changeValues(Items);
  }

  render() {
    const formOptions = {
    };
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
      <Content>
        <Form
          ref={c => this.form = c}
          type={Damages}
          options={formOptions}
          value={this.props.values}
          onChange={value => this.onChange(value)}
        />
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeValues: ItemArray => dispatch(postDamageReport(ItemArray)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DamageReportForm);
