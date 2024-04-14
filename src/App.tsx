import React, {useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import CourseComponent from './components/CourseComponent';
import {RouteContext} from './contexts/route';
import MapComponent from './components/MapComponent';

function App(): React.JSX.Element {
  const RouteProvider = useContext(RouteContext);

  const listRenderer = ({item, index}: any) => {
    return (
      <CourseComponent
        key={`course-${index}`}
        courseData={item}
        vehicleData={RouteProvider.route.vehicle}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapComponent />
      <View style={styles.bottom}>
        <Text style={styles.title}>Rotas</Text>
        <FlatList
          style={styles.flatlist}
          data={RouteProvider.route.courses}
          renderItem={listRenderer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#fafafa',
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: '#000',
  },
  flatlist: {
    flex: 1,
  },
});

export default App;
