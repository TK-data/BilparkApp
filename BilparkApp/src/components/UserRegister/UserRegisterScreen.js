import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerUserModalVisible } from '../../actions/registerUser';
import UserRegisterModal from './UserRegisterModal';
import UserRegisterForm from './UserRegisterForm';

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: '#002776',
  },
});

class UserRegisterScreen extends React.Component {

  componentDidMount() {
    this.props.visibleModal(false);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#002776' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.keyboard}
      >
        <ScrollView>
          <UserRegisterForm />
        </ScrollView>
        <UserRegisterModal />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    visibleModal: bool => dispatch(registerUserModalVisible(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterScreen);
