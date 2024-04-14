import React, {createContext, useState} from 'react';
import {ICourseData, IRouteData} from '../Interfaces';
import gps from '../assets/data/frontend_data_gps.json';

interface IRouteProvider {
  route: IRouteData;
  currentCourse: ICourseData | undefined;
  setCourse(course: ICourseData): void;
}

export const RouteContext = createContext<IRouteProvider>({} as IRouteProvider);

export const RouteProvider = ({children}: any) => {
  const [currentCourse, setCurrentCourse] = useState<ICourseData>(
    gps.courses[0],
  );
  const [route, setRoute] = useState(gps);

  const setCourse = (course: ICourseData) => {
    setCurrentCourse(course);
  };

  return (
    <RouteContext.Provider value={{currentCourse, route, setCourse}}>
      {children}
    </RouteContext.Provider>
  );
};
