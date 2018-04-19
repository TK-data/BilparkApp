import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';


const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

// should be
const FuelRefillItem = ({ FuelTime }) => {
  return (
    <View>
      <Text style={styles.text}>
        {FuelTime}
      </Text>
      <Button>
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
