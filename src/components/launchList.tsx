/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../App';
import {RootState} from '../redux/store';
import {fetchLaunches, Launch} from '../redux/launchListSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import type {Order, SortText} from '../types';
import {yearList} from '../constants';
const LaunchList: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const screenState = useSelector((state: RootState) => state.launchList);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(yearList);

  const [order, setOrder] = useState<Order>('asc');
  const [sort] = useState('launch_date_utc');
  const [launchYear, setLaunchYear] = useState<number>();

  const [sortText, setSortText] = useState<SortText>('Descending');

  useEffect(() => {
    dispatch(fetchLaunches({page: 1, sort, order, launchYear}));
  }, [dispatch, launchYear, order, sort]);

  const reloadDataHandler = () => {
    if (!screenState.loading) {
      dispatch(fetchLaunches({page: 1, sort, order, launchYear}));
      setOrder('asc');
      setSortText('Descending');
      setLaunchYear(undefined);
      setValue(null);
    }
  };

  const buttonSortHandle = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setSortText(sortText === 'Ascending' ? 'Descending' : 'Ascending');
  };

  const handleOnEndReached = () => {
    if (!screenState.loading) {
    }
  };
  const yearFilterHandler = (val: number | null) => {
    if (val) {
      setLaunchYear(val);
    }
  };

  DropDownPicker.setTheme('DARK');

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/img/launch-home-2.png')}
          resizeMode="cover">
          <View style={styles.headContainer}>
            <View style={styles.spacexLogoContainer}>
              <Image
                style={styles.spacexLogo}
                source={require('../../assets/spacex-logo.png')}
              />
            </View>
            <View>
              <Text>LAUNCHES</Text>
            </View>
            <View style={styles.spacexLogoContainer}>
              <TouchableOpacity
                onPress={reloadDataHandler}
                style={styles.reloadButton}>
                <Text style={styles.textButton}>Reload data</Text>
                <Image source={require('../../assets/icon/refresh.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filtersContainer}>
            <View style={styles.dropDownPickerContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Filter by Year"
                ArrowDownIconComponent={() => (
                  <Image source={require('../../assets/icon/select.png')} />
                )}
                placeholderStyle={{
                  color: 'white',
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#025288',
                  borderColor: 'white',
                  width: 150,
                }}
                listItemLabelStyle={{
                  color: 'white',
                }}
                style={styles.select}
                onChangeValue={val => yearFilterHandler(val)}
              />
            </View>
            <View style={styles.sortButtonContainer}>
              <TouchableOpacity
                onPress={buttonSortHandle}
                style={styles.sortButton}>
                <Text style={styles.textButton}>{'Sort ' + sortText}</Text>
                <Image source={require('../../assets/icon/sort.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flatListContainer}>
            {!screenState.loading ? (
              <FlatList
                data={screenState.launches}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({index, item}) => (
                  <View style={styles.card}>
                    <LaunchListItem index={index + 1} launch={item} />
                  </View>
                )}
                onEndReached={handleOnEndReached}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const LaunchListItem: FunctionComponent<{index: number; launch: Launch}> = ({
  index,
  launch,
}) => {
  return (
    <View style={styles.launchList}>
      <Text adjustsFontSizeToFit style={styles.numbers}>
        {'#' + index}
      </Text>
      <Text adjustsFontSizeToFit style={styles.misionName}>
        {launch.mission_name}
      </Text>
      <View style={styles.rightContentContainer}>
        <Text adjustsFontSizeToFit style={styles.date}>
          {moment(launch.launch_date_utc).format('MMM Do YYYY')}
        </Text>
        <Text adjustsFontSizeToFit style={styles.rocketName}>
          {launch.rocket.rocket_name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  headContainer: {
    flex: 1,
    paddingTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  filtersContainer: {
    flex: 1,
    width: '100%',
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 999,
  },
  dropDownPickerContainer: {
    flex: 1,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 20,
  },
  select: {
    backgroundColor: '#025288',
    borderColor: '#025288',
    color: '#fff',
    borderRadius: 0,
    width: 150,
    height: 50,
  },
  sortButtonContainer: {
    flex: 1,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    width: 150,
    height: 50,
    backgroundColor: '#025288',
  },
  spacexLogoContainer: {
    width: 150,
    height: 50,
    paddingLeft: 15,
  },
  spacexLogo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  reloadButton: {
    flex: 1,
    flexDirection: 'row',
    width: 150,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#025288',
  },
  flatListContainer: {
    flex: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  launchList: {
    flex: 1,
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card: {
    padding: 5,
    margin: 1,
    borderRadius: 5,
    borderColor: '#ffffff2d',
    borderWidth: 1,
    shadowRadius: 5,
    backgroundColor: '#ffffff2d',
  },
  textButton: {
    color: 'white',
  },
  numbers: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 18,
    marginRight: 10,
  },
  misionName: {
    flex: 3,
    flexWrap: 'wrap',
    fontSize: 16,
  },
  date: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 10,
  },
  rocketName: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rightContentContainer: {
    flex: 2,
    alignItems: 'flex-end',
    paddingVertical: 5,
  },
});

export default LaunchList;
