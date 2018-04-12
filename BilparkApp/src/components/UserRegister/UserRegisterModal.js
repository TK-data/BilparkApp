import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Modal, StyleSheet, View, Button } from 'react-native';
import { registerUserModalVisible } from '../../actions/registerUser';


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
});

const UserRegisterModal = ({ modalVisible, modalTransparent, visibleModal, navigateToLogin }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={modalTransparent}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}
    >
      <View style={styles.modal}>
        <Text style={styles.modalText}>Registrering godkjent</Text>
        <Button
          title="Gå til innlogging"
          onPress={() => {
            visibleModal(false);
            navigateToLogin();
          }}
        />
      </View>
    </Modal>
  );
};

UserRegisterModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  modalTransparent: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    modalVisible: state.registerUserModalVisible,
    modalTransparent: state.registerUserModalTransparent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    visibleModal: bool => dispatch(registerUserModalVisible(bool)),
    navigateToLogin: () => dispatch(NavigationActions.back()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterModal);
