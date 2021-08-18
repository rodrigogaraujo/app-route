import React from 'react';

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
        <ButtonItem>
          <ButtonText>Iniciar percurso</ButtonText>
        </ButtonItem>
      </ContentContainer>
      <ContentContainer>
        <Logo />
      </ContentContainer>
    </Container>
  );
}
