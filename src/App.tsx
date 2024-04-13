import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import gps from './assets/data/frontend_data_gps.json';

function App(): React.JSX.Element {
  const gpsData = gps.courses[0].gps;
  const filteredData = gpsData.map(({latitude, longitude}) => ({
    latitude,
    longitude,
  }));

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider="google"
        style={styles.map}
        region={{
          latitude: filteredData[0].latitude,
          longitude: filteredData[0].longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Polyline
          coordinates={filteredData}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={3}
        />
        <Marker
          anchor={{x: 0.5, y: 0.5}}
          coordinate={filteredData[0]}
          image={require('./assets/img/car1.png')}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
