import React from 'react';
import Input from '../../components/Input';

import {Container, Logo, Content} from './styles';

export function SignIn() {
  return (
    <Container>
      <Logo />
      <Content>
        <Input password={false} placeholder="E-mail" icon="user" />
        <Input password={true} placeholder="Senha" icon="lock" />
      </Content>
    </Container>
  );
}
