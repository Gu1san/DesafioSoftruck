import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {RouteContext} from '../contexts/route';

const MapComponent: React.FC = () => {
  const sprites: any = {
    '0': require('../assets/img/car3.png'),
    '45': require('../assets/img/car4.png'),
    '90': require('../assets/img/car5.png'),
    '135': require('../assets/img/car6.png'),
    '180': require('../assets/img/car7.png'),
    '225': require('../assets/img/car8.png'),
    '270': require('../assets/img/car1.png'),
    '315': require('../assets/img/car2.png'),
    '360': require('../assets/img/car3.png'),
  };
  const [currentLocation, setCurrentLocation] = useState<number>(0);
  const [markerSprite, setMarkerSprite] = useState(sprites['0']);
  const RouteProvider = useContext(RouteContext);

  const gpsData = RouteProvider.currentCourse.gps;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(prevLocation =>
        prevLocation < gpsData.length - 1 ? prevLocation + 1 : 0,
      );
    }, 1000 * 1);
    return () => {
      console.log('clear interval');
      setCurrentLocation(0);
      clearInterval(interval);
    };
  }, [RouteProvider.currentCourse]);

  useEffect(() => {
    const direction = gpsData[currentLocation].direction;
    const nearestAngle = Math.round(direction / 45) * 45;
    setMarkerSprite(sprites[nearestAngle.toString()]);
  }, [currentLocation]);

  return (
    <MapView
      provider="google"
      style={styles.map}
      region={{
        latitude: gpsData[0].latitude,
        longitude: gpsData[0].longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Polyline coordinates={gpsData} strokeColor="#000" strokeWidth={3} />
      <Marker
        anchor={{x: 0.5, y: 0.5}}
        coordinate={gpsData[currentLocation]}
        image={markerSprite}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;
