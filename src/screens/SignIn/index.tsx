import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Input from '../../components/Input';
import {RootStackParamList} from '../../routes/auth.routes';

import {
  Container,
  Logo,
  Content,
  ButtonItem,
  ButtonText,
  ButtonTextForgot,
  ButtonItemForgot,
} from './styles';

type forgotScreenProp = StackNavigationProp<RootStackParamList, 'Forgot'>;

export function SignIn() {
  const navigation = useNavigation<forgotScreenProp>();

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Logo />
      <Content>
        <Input password={false} placeholder="E-mail" icon="user" />
        <Input password={true} placeholder="Senha" icon="lock" />
      </Content>
      <ButtonItemForgot onPress={() => navigation.navigate('Forgot')}>
        <ButtonTextForgot>Esqueceu sua senha?</ButtonTextForgot>
      </ButtonItemForgot>
      <ButtonItem>
        <ButtonText>Entrar</ButtonText>
      </ButtonItem>
    </Container>
  );
}
