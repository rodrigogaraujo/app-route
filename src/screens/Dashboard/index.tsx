import React, {useState, useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import * as Location from 'expo-location';

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

export function Dashboard() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (init) {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'ATENÇÃO',
            'Este aplicativo precisa de permissão para utilização do seu GPS',
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [init]);

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
