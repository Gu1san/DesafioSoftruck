import React, {useContext} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ICourseData, IVehicleData} from '../Interfaces';
import moment from 'moment';
import {RouteContext} from '../contexts/route';

interface ICourseComponent {
  courseData: ICourseData;
  vehicleData: IVehicleData;
}

const CourseComponent: React.FC<ICourseComponent> = ({
  courseData,
  vehicleData,
}) => {
  const RouteProvider = useContext(RouteContext);
  return (
    <Pressable
      onPress={() => {
        RouteProvider.setCourse(courseData);
      }}>
      <View
        style={[
          styles.vehicleInfoCnt,
          RouteProvider.currentCourse?.start_at === courseData.start_at
            ? {borderWidth: 1}
            : {},
        ]}>
        <Image
          style={styles.vehicleImage}
          source={{uri: vehicleData.picture.address}}
          resizeMode="contain"
        />
        <View style={styles.vehicleTxtsCnt}>
          <Text style={styles.vehiclePlate}>{vehicleData.plate}</Text>
          <Text style={styles.vehicleVin}>{vehicleData.vin}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>{moment(courseData.start_at).format('L')},</Text>
          <Text>{moment(courseData.start_at).format('LT')}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  vehicleImage: {
    height: 100,
    width: 100,
  },
  vehicleInfoCnt: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#000',
    paddingHorizontal: 5,
  },
  vehicleTxtsCnt: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 5,
    flex: 1,
  },
  vehiclePlate: {
    fontSize: 18,
    color: '#000',
  },
  vehicleVin: {
    fontSize: 13,
    color: '#000',
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
});

export default CourseComponent;
