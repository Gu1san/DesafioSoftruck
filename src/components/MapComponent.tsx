import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {MarkerAnimated, Polyline} from 'react-native-maps';
import {RouteContext} from '../contexts/route';

const MapComponent: React.FC = () => {
  const RouteProvider = useContext(RouteContext);
  const gpsData = RouteProvider.currentCourse.gps;

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
      <MarkerAnimated
        style={styles.marker}
        anchor={{x: 0.5, y: 0.5}}
        coordinate={RouteProvider.coordinate}
        image={RouteProvider.markerSprite}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  layerBurron: {
    position: 'absolute',
    top: 30,
    right: 30,
    borderRadius: 50,
  },
  marker: {height: 60, width: 60},
});

export default MapComponent;
