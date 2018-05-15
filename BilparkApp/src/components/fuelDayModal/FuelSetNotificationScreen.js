import React from 'react';
import { Dimensions, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
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
      mil: '1000',
      forbruk: '0.8',
      diff: '2',
      resultat: '0',
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
          <TouchableOpacity
            style={styles.exitButtonView}
            onPress={() => this.setState({ isModalVisible: false })}
          >
            <Text style={styles.exitButton}>X</Text>
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Image resizeMode="contain" style={styles.image} source={image} />
              <Text style={styles.title}>Få påminnelse om å fylle tanken!</Text>
            </View>
          </View>
          <View style={styles.inner}>
            <Text style={styles.introText}>
              Visste du at du kan spare mye på å fylle drivstoff på riktig dag?
            </Text>
            <Text style={styles.text}>Mil:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ mil: text });
                this.change();
              }}
              value={this.state.mil}
            />
            <Text style={styles.text}>Forbruk:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ forbruk: text });
                this.change();
              }}
              value={this.state.forbruk}
            />
            <Text style={styles.text}>Differanse billigste/dyreste dag (kr):</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ diff: text });
                this.change();
              }}
              value={this.state.diff}
            />
            <Text style={styles.text}>
              Du kan spare {this.state.resultat} kr i året på å fylle den billigste dagen!
            </Text>
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
    height: window.height * 0.8,
    marginLeft: window.width * 0.1,
    marginRight: window.width * 0.1,
  },
  outer: {
    display: 'flex',
    flex: 1,
    width: window.width * 0.8,
  },
  exitButtonView: {
    height: window.height * 0.05,
    alignItems: 'flex-end',
  },
  exitButton: {
    fontSize: 22,
    color: 'white',
    padding: 8,
  },
  topContainer: {
    display: 'flex',
    flex: 1,
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
    fontSize: 20,
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
    display: 'flex',
    flex: 2,
    width: window.width * 0.8,
  },
  introText: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'white',
  },
  input: {
    color: 'white',
  },
  button: {
    alignSelf: 'center',
  },
});
