import React, {useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CourseComponent from './components/CourseComponent';
import {RouteContext} from './contexts/route';
import MapComponent from './components/MapComponent';
import {setI18nConfig} from './localize/i18n';
import {I18n} from 'i18n-js';

function App(): React.JSX.Element {
  const [i18n, setI18n] = useState<I18n>();
  const RouteProvider = useContext(RouteContext);

  useEffect(() => {
    setI18n(setI18nConfig());
  }, []);

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
        <Text style={styles.title}>{i18n?.t('routes')}</Text>
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
