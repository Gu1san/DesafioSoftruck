import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import gps from './assets/data/frontend_data_gps.json';
import CourseComponent from './components/CourseComponent';

function App(): React.JSX.Element {
  const gpsData = gps.courses[0].gps;
  const sprites: any = {
    '0': require('./assets/img/car3.png'),
    '45': require('./assets/img/car4.png'),
    '90': require('./assets/img/car5.png'),
    '135': require('./assets/img/car6.png'),
    '180': require('./assets/img/car7.png'),
    '225': require('./assets/img/car8.png'),
    '270': require('./assets/img/car1.png'),
    '315': require('./assets/img/car2.png'),
    '360': require('./assets/img/car3.png'),
  };
  const [currentLocation, setCurrentLocation] = useState<number>(0);
  const [markerSprite, setMarkerSprite] = useState(sprites['0']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(prevLocation =>
        prevLocation < gpsData.length - 1 ? prevLocation + 1 : 0,
      );
    }, 1000 * 1);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const direction = gpsData[currentLocation].direction;
    const nearestAngle = Math.round(direction / 45) * 45;
    setMarkerSprite(sprites[nearestAngle.toString()]);
  }, [currentLocation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider="google"
        style={styles.map}
        region={{
          latitude: gpsData[0].latitude,
          longitude: gpsData[0].longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Polyline
          coordinates={gpsData}
          strokeColor="#000"
          strokeColors={[
            '#7F0000',
            '#00000000',
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={3}
        />
        <Marker
          anchor={{x: 0.5, y: 0.5}}
          coordinate={gpsData[currentLocation]}
          image={markerSprite}
        />
      </MapView>
      <View style={styles.bottom}>
        <Text style={styles.title}>Rotas</Text>
        <CourseComponent
          courseData={gps.courses[0]}
          vehicleData={gps.vehicle}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  bottom: {
    backgroundColor: '#fafafa',
    padding: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
  },
});

export default App;
