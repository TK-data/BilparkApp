import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Icon, Content, Button } from 'native-base';
import { connect } from 'react-redux';


const SettingsButton = ({ navigate }) => {
  return (
    <Content>
      <Button onPress={navigate}>
        <Icon name="settings" color="#fff" />
      </Button>
    </Content>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    navigate: () => dispatch(NavigationActions.navigate({ routeName: 'FuelDay' })),
  };
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsButton);
