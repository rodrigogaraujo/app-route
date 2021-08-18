import React, {useState, useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

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

const LOCATION_TASK_NAME = 'background-location-task';

export function Dashboard() {
  const [init, setInit] = useState(false);

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

        let {status: statusBg} =
          await Location.requestBackgroundPermissionsAsync();
        if (statusBg !== 'granted') {
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
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1, // minimum change (in meters) betweens updates
          deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
          // foregroundService is how you get the task to be updated as often as would be if the app was open
          foregroundService: {
            notificationTitle: 'Using your location',
            notificationBody:
              'To turn off, go back to the app and switch something off.',
          },
        });

        Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(
          value => {
            if (value) {
              console.log(value);
            }
          },
        );
      }
    })();
  }, [init]);

  TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data && init) {
      console.log('data: ', new Date(), data.locations[0].coords);
      // do something with the locations captured in the background
    }
  });

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
          <IconFeather name="power" />
        </UserWrapper>
      </Header>
      <ContentContainer>
        <ButtonItem onPress={() => setInit(!init)}>
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
