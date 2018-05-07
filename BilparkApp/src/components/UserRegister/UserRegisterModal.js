import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Modal, StyleSheet, View, Button } from 'react-native';
import { registerUserModalVisible } from '../../actions/registerUser';
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
});

const UserRegisterModal = ({ modalVisible, modalTransparent, visibleModal, navigateToLogin, values, login }) => {
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
          title="Du er logget inn og blir videresendt"
          onPress={() => {
            login(values.Email, values.Password);
            // visibleModal(false);
            // navigateToLogin();
          }}
        />
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
    visibleModal: bool => dispatch(registerUserModalVisible(bool)),
    navigateToLogin: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
    login: (username, password) => dispatch(postUser(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterModal);
