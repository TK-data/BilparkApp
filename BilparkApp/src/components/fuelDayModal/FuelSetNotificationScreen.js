import React from 'react';
import { Dimensions, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { View, Text, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';

const image = require('../../images/menuIcons/gas_station.png');

const window = Dimensions.get('window');

class FuelSetNotificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      mil: '3000',
      forbruk: '0.8',
      diff: '2',
      resultat: '4800',
    };
    this.change = this.change.bind(this);
  }

  change() {
    const value = this.state.mil * this.state.forbruk * this.state.diff;
    this.setState({ resultat: value });
  }

  render() {

    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackdropPress={() => this.setState({ isModalVisible: false })}
        backdropOpacity={0.4}
        style={styles.container}
      >
        <View style={styles.outer}>
          <View style={styles.exitButtonView}>
            <TouchableOpacity
              onPress={() => this.setState({ isModalVisible: false })}
            >
              <Text style={styles.exitButton}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Image resizeMode="contain" style={styles.image} source={image} />
              <Text style={styles.title}>Få påminnelse om å fylle tanken!</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.inner}>
              <Text style={[styles.introText, styles.marginBot]}>
                Visste du at du kan spare mye på å fylle drivstoff på riktig dag?
              </Text>

              <View style={styles.innerText}>
                <Text style={styles.text}>Kjører du i snitt:</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={[styles.input, styles.inputBig]}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      this.setState({ mil: text }, () => {
                        this.change();
                      });
                    }}
                    value={this.state.mil}
                  />
                  <Text style={styles.text}>mil/år</Text>
                </View>
                <Text style={styles.text}>Og har et gjennomsnittlig forbruk på: </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      this.setState({ forbruk: text }, () => {
                        this.change();
                      });
                    }}
                    value={this.state.forbruk}
                  />
                  <Text style={styles.text}>liter/mil</Text>
                </View>
                <Text style={styles.text}>Kan du spare hele:</Text>
                <Text style={styles.textBold}>{Math.round(this.state.resultat)} kr i året</Text>
                <Text style={styles.text}>Dersom differansen mellom billigste og dyreste dag å fylle er:</Text>
                <View style={[styles.inputView, styles.marginBot]}>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      this.setState({ diff: text }, () => {
                        this.change();
                      });
                    }}
                    value={this.state.diff}
                  />
                  <Text style={styles.text}>kr</Text>
                </View>
              </View>
              <Button
                bordered
                light
                onPress={() => {
                  this.setState({ isModalVisible: false });
                  this.props.navigate();
                }}
                style={styles.button}
              >
                <Text>Skru på push-notifikasjon</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: () => dispatch(NavigationActions.navigate({ routeName: 'FuelDay' })),
  };
};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FuelSetNotificationScreen);


const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
    width: window.width * 0.8,
    height: window.height * 0.85,
    marginLeft: window.width * 0.1,
    marginRight: window.width * 0.1,
  },
  outer: {
    display: 'flex',
    flex: 1,
    width: window.width * 0.8,
  },
  exitButtonView: {
    alignItems: 'flex-end',
  },
  exitButton: {
    fontSize: 22,
    color: 'white',
    padding: 8,
    marginBottom: 3,
  },
  topContainer: {
    display: 'flex',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: window.width * 0.8,
  },
  title: {
    color: 'rgb(000, 039, 118)',
    fontSize: 17,
    marginBottom: 5,
    marginTop: -15,
  },
  image: {
    width: window.width * 0.15,
    height: window.height * 0.15,
    zIndex: 5,
    margin: 0,
    marginTop: -10,
  },
  inner: {
    flex: 1,
    width: window.width * 0.8,
    padding: 10,
  },
  introText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  innerText: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    color: 'white',
    fontSize: 15,
    margin: 6,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  inputView: {
    flexDirection: 'row',
  },
  input: {
    flex: 0,
    width: 30,
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  inputBig: {
    width: 55,
  },
  button: {
    alignSelf: 'center',
    marginTop: 'auto',
  },
  marginBot: {
    marginBottom: 16,
  },
});
