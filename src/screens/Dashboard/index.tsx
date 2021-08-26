import React, {useState, useEffect} from 'react';
import {Alert, StatusBar, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  SyncDatabaseChangeSet,
  synchronize,
  SyncPullArgs,
} from '@nozbe/watermelondb/sync';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  UserGreeting,
  UserName,
  IconFeather,
  ContentContainer,
  ButtonText,
  ButtonItem,
  Logo,
} from './styles';

import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';
import {database} from '../../database';
import {PointUser} from '../../database/models/PointUser';

const LOCATION_TASK_NAME = 'background-location-task';

interface TaskProps {
  locations: [
    {
      coords: {
        latitude: string;
        longitude: string;
      };
    },
  ];
}

export function Dashboard() {
  const [isConected, setIsConected] = useState(false);
  const [init, setInit] = useState(false);
  const {signOut, user} = useAuth();
  const netInfo = useNetInfo();

  async function offlineSynchronize() {
    try {
      await synchronize({
        database,
        pullChanges: async () => {
          const resp = await api.get('routes-item-user');
          return {
            timestamp: resp.data.latestVersion,
            changes: [] as unknown as SyncDatabaseChangeSet,
          };
        },
        pushChanges: async ({changes}) => {
          const routePoints = changes.routeuserpoints;
          await api.post('sync/position', {changes: routePoints.created});
        },
      });
    } catch (er) {
      console.log(er);
    }
  }

  useEffect(() => {
    (async () => {
      if (init) {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'ATENÇÃO',
            'Este aplicativo precisa de permissão para utilização do seu GPS',
          );
          return;
        }

        // await Location.watchPositionAsync(
        //   {
        //     accuracy: Location.Accuracy.High,
        //     timeInterval: 5000,
        //     distanceInterval: 3,
        //   },
        //   location => {
        //     console.log({
        //       lat: location.coords.latitude,
        //       lng: location.coords.longitude,
        //     });
        //   },
        // );
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1, // minimum change (in meters) betweens updates
          deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
          // foregroundService is how you get the task to be updated as often as would be if the app was open
          foregroundService: {
            notificationTitle: 'Virginia',
            notificationBody: 'Para finalizar o percurso abra o aplicativo.',
          },
        });

        Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(
          value => {
            if (value) {
              // console.log('value', value);
            }
          },
        );
      }
    })();
  }, [init]);

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({data, error}) => {
    const {locations} = data as TaskProps;

    if (error) {
      console.log('error', error);
      return;
    }
    setInit(true);
    if (locations) {
      // do something with the locations captured in the background
      try {
        const obj = {
          lat: locations[0].coords.latitude,
          lng: locations[0].coords.longitude,
          date: new Date(),
          offline: false,
        };
        if (isConected) {
          // const dataStorage = await AsyncStorage.getItem(
          //   `@km@virginia@user:${user.id}`,
          // );
          // if (dataStorage) {
          //   const itensData = JSON.parse(dataStorage);
          //   for (const itemDt of itensData) {
          //     await api.post('position', itemDt);
          //   }
          //   await AsyncStorage.removeItem(`@km@virginia@user:${user.id}`);
          // }
          // setLatLng(stt => `${stt} - ${obj.lat}/${obj.lng}`);
          await offlineSynchronize();
          await api.post('position', obj);
        } else {
          const routeUser = database.get<PointUser>('routeuserpoints');
          await database.write(async () => {
            const responseDt = await routeUser.create(newUser => {
              newUser.lat = String(obj.lat);
              newUser.lng = String(obj.lng);
              newUser.date = obj.date.getTime();
            });
          });
        }
        // } else {
        //   const routeUser = database.get<PointUser>('routeuserpoints');
        //   await database.write(async () => {
        //     await routeUser.create(newUser => {
        //       newUser.lat = obj.lat;
        //       newUser.lng = obj.lng;
        //       newUser.date = obj.date.getTime();
        //     });
        //   });

        // const dataStorage = await AsyncStorage.getItem(
        //   `@km@virginia@user:${user.id}`,
        // );
        // if (dataStorage) {
        //   const itensData = JSON.parse(dataStorage);
        //   const newItens = [...itensData, {...obj, offline: true}];
        //   await AsyncStorage.setItem(
        //     `@km@virginia@user:${user.id}`,
        //     JSON.stringify(newItens),
        //   );
        // } else {
        //   await AsyncStorage.setItem(
        //     `@km@virginia@user:${user.id}`,
        //     JSON.stringify([obj]),
        //   );
        // }
        // }
      } catch (er) {
        console.log('er', er);
      }
    }
  });

  const handleName = (name: string) => {
    if (name && name.split(' ')) {
      return name.split(' ')[0];
    }
    return name;
  };

  useEffect(() => {
    if (netInfo.isConnected) {
      setIsConected(netInfo.isConnected);
    } else {
      setIsConected(false);
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Header>
        <UserWrapper>
          <UserInfo>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{handleName(user.name || '')}</UserName>
            </User>
          </UserInfo>
          <TouchableOpacity onPress={async () => await signOut()}>
            <IconFeather name="power" />
          </TouchableOpacity>
        </UserWrapper>
      </Header>
      <ContentContainer>
        <ButtonItem
          onPress={async () => {
            if (init) {
              TaskManager.unregisterAllTasksAsync();
              await AsyncStorage.removeItem(`@km@virginia@user:${user.id}`);
            }
            setInit(!init);
          }}>
          <ButtonText>
            {!init ? 'Iniciar percurso' : 'Pausar percurso'}
          </ButtonText>
        </ButtonItem>
      </ContentContainer>
      <ContentContainer>
        <Logo />
      </ContentContainer>
    </Container>
  );
}
