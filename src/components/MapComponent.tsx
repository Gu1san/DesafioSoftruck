import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {
  MapOverlay,
  MapType,
  MarkerAnimated,
  Overlay,
  Polyline,
} from 'react-native-maps';
import {RouteContext} from '../contexts/route';
import {IconButton} from 'react-native-paper';

const MapComponent: React.FC = () => {
  const RouteProvider = useContext(RouteContext);
  const gpsData = RouteProvider.currentCourse.gps;
  const [mapType, setMapType] = useState<MapType>('standard');

  return (
    <>
      <MapView
        mapType={mapType}
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
      <IconButton
        icon={'layers'}
        style={styles.layerBurron}
        size={30}
        onPress={() => {
          setMapType(mapType === 'standard' ? 'hybrid' : 'standard');
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  layerBurron: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  marker: {height: 60, width: 60},
});

export default MapComponent;
