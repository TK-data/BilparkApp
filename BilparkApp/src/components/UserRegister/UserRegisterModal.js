import React from 'react';
import { connect } from 'react-redux';
import { Text, Modal, StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import { postUser } from '../../actions/auth';


const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#002776',
  },
  modalText: {
    color: '#fff',
  },
  button: {
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
});

const UserRegisterModal = ({ modalVisible, modalTransparent, values, login }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={modalTransparent}
      onRequestClose={() => {
      }}
    >
      <View style={styles.modal}>
        <Text style={styles.modalText} testID="RegisterModalTextField">Registrering godkjent</Text>
        <Button
          style={styles.button}
          light
          onPress={() => {
            login(values);
          }}
        >
          <Text>Logg inn</Text>
        </Button>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    modalVisible: state.registerUserModalVisible,
    modalTransparent: state.registerUserModalTransparent,
    values: state.values,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: values => dispatch(postUser(values.Email, values.Password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterModal);
