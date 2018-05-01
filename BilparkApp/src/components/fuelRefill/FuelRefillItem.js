import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';


const styles = StyleSheet.create({
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const weekDays = {
  0: 'Søndag',
  1: 'Mandag',
  2: 'Tirsdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag',
  6: 'Lørdag',
};

const months = {
  0: 'januar',
  1: 'februar',
  2: 'mars',
  3: 'april',
  4: 'mai',
  5: 'juni',
  6: 'juli',
  7: 'august',
  8: 'september',
  9: 'oktober',
  10: 'november',
  11: 'desember',
};

// should be
const FuelRefillItem = ({ FuelTime, RefillID }) => {

  const fuelDate = new Date(FuelTime);

  const month = months[fuelDate.getMonth()];
  const date = fuelDate.getDate();
  const day = weekDays[fuelDate.getDay()];
  const hours = fuelDate.getHours() > 9 ? fuelDate.getHours() : '0' + fuelDate.getHours();
  const minutes = fuelDate.getMinutes() > 9 ? fuelDate.getMinutes() : '0' + fuelDate.getMinutes();

  return (
    <View style={styles.content}>
      <Text style={styles.text}>
        {day} {date}. {month} kl. {hours}:{minutes}
      </Text>
      <Button light style={styles.button} onPress={() => console.log(RefillID)}>
        <Text>
          slett
        </Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  // function from action to delete item
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FuelRefillItem);
