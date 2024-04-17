import React, {createContext, useEffect, useState} from 'react';
import {ICourseData, IRouteData} from '../Interfaces';
import gps from '../assets/data/frontend_data_gps.json';
import {AnimatedRegion} from 'react-native-maps';

interface IRouteProvider {
  route: IRouteData;
  currentCourse: ICourseData | undefined;
  markerSprite: any;
  coordinate: AnimatedRegion;
  setCourse(course: ICourseData): void;
}

export const RouteContext = createContext<IRouteProvider>({} as IRouteProvider);

export const RouteProvider = ({children}: any) => {
  const [currentCourse, setCurrentCourse] = useState<ICourseData>(
    gps.courses[0],
  );
  const [route, setRoute] = useState(gps);
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
  const [coordinate] = useState(
    new AnimatedRegion({
      latitude: currentCourse.gps[0].latitude,
      longitude: currentCourse.gps[0].longitude,
    }),
  );

  useEffect(() => {
    setCurrentLocation(0);

    const interval = setInterval(() => {
      setCurrentLocation(prevLocation =>
        prevLocation < currentCourse.gps.length - 1 ? prevLocation + 1 : 0,
      );
    }, 1000 * 3);

    if (currentLocation >= currentCourse.gps.length - 1) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentCourse]);

  useEffect(() => {
    animateMarker();
    updateMarkerSprite();
  }, [currentLocation]);

  const setCourse = (course: ICourseData) => {
    setCurrentCourse(course);
  };

  const animateMarker = () => {
    const {latitude, longitude} = currentCourse.gps[currentLocation];
    coordinate
      .timing({
        latitude,
        longitude,
        toValue: 0,
        useNativeDriver: false,
        latitudeDelta: 0,
        longitudeDelta: 0,
      })
      .start();
  };

  const updateMarkerSprite = () => {
    const direction = currentCourse.gps[currentLocation].direction;
    const nearestAngle = Math.round(direction / 45) * 45;
    setMarkerSprite(sprites[nearestAngle.toString()]);
  };

  return (
    <RouteContext.Provider
      value={{currentCourse, route, markerSprite, coordinate, setCourse}}>
      {children}
    </RouteContext.Provider>
  );
};
