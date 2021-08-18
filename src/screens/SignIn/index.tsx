import React from 'react';
import {StatusBar} from 'react-native';

import Input from '../../components/Input';

import {
  Container,
  Logo,
  Content,
  ButtonItem,
  ButtonText,
  ButtonTextForgot,
  ButtonItemForgot,
} from './styles';

export function SignIn() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Logo />
      <Content>
        <Input password={false} placeholder="E-mail" icon="user" />
        <Input password={true} placeholder="Senha" icon="lock" />
      </Content>
      <ButtonItemForgot>
        <ButtonTextForgot>Esqueceu sua senha?</ButtonTextForgot>
      </ButtonItemForgot>
      <ButtonItem>
        <ButtonText>Entrar</ButtonText>
      </ButtonItem>
    </Container>
  );
}
