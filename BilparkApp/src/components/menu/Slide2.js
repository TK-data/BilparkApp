import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';

const styles = StyleSheet.create({
  buzzWord: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  carHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  finnBil: {
    color: 'white',
    fontSize: 18,
    marginBottom: '8%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
  button: {
    alignSelf: 'center',
  },
});


class Slide2 extends Component {

  render() {
    const company = JSON.parse(this.props.company);
    const localCompany = this.props.localCompany;

    return (
      <View style={styles.slide1}>
        <Text style={styles.buzzWord}>Du tilhører</Text>
        <Text style={styles.text}>
          { company.CompanyName || localCompany.CompanyName }
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    company: state.auth.company,
    localCompany: state.registerCompany.company,
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slide2);
