import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StatusBar} from 'react-native';

import Input from '../../components/Input';

import {
  Container,
  Logo,
  Content,
  ButtonItem,
  ButtonText,
  ForgotText,
  Icon,
} from './styles';

export function Forgot() {
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" />
      </TouchableOpacity>
      <Logo />
      <Content>
        <ForgotText>
          Digite seu email e siga as instruções que você receberá.
        </ForgotText>
        <Input password={false} placeholder="E-mail" icon="user" />
      </Content>
      <ButtonItem>
        <ButtonText>Recuperar senha</ButtonText>
      </ButtonItem>
    </Container>
  );
}
