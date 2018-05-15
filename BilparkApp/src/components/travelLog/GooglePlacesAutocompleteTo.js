import React from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../config/connections';
import { travelLogTo, calculateDistance, travelLogToAddress } from '../../actions/travelLog';

const width = Dimensions.get('window').width;


const GooglePlacesInputTo = ({ saveTo, saveCordinates, from, saveAddressTo }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Adresse til"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        saveTo((details.geometry.location.lat + ',' + details.geometry.location.lng));
        saveCordinates({
          origin: from,
          destination: (details.geometry.location.lat + ',' + details.geometry.location.lng),
        });
        saveAddressTo(details.formatted_address);
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: GOOGLE_API_KEY,
        language: 'en', // language of the results
        types: 'address', // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          width: (width - 20),
          alignSelf: 'center',
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
          borderRadius: 0,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        listView: {
          backgroundColor: 'white',
          width: (width - 20),
          alignSelf: 'center',
        },
      }}

      debounce={200}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    distance: state.travelLog.distance,
    from: state.travelLog.positionFrom,
    to: state.travelLog.positionTo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTo: positionFrom => dispatch(travelLogTo(positionFrom)),
    saveCordinates: cordinates => dispatch(calculateDistance(cordinates)),
    saveAddressTo: address => dispatch(travelLogToAddress(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GooglePlacesInputTo);
