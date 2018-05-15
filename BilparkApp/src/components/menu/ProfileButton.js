import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Icon, Content, Button } from 'native-base';
import { connect } from 'react-redux';


const ProfileButton = ({ profileScreen }) => {
  return (
    <Content>
      <Button onPress={profileScreen}>
        <Icon name="person" color="#fff" />
      </Button>
    </Content>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    profileScreen: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' })),
  };
};

const mapStateToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton);
