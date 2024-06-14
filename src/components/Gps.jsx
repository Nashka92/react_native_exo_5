import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, Text } from 'react-native';

const Gps = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [localisation, setLocalisation] = useState({pays: '', ville: ''});

  function getApiPosition() {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=4hbzP8OWliXo3wDa2YFm6pEa8PwBDVX6&q=${latitude}%2C${longitude}`,
      )
      .then(response =>{setLocalisation({pays: response.data.country.LocalizedName, ville: response.data.LocalizedName})});
  }

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <>
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
        <Text>Longitude: {localisation.pays} - {localisation.ville} </Text>
        <Button title="Get Localisation" onPress={getApiPosition}/>
    </>
  );
};

export default Gps;
