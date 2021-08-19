import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {StatusBar, Alert} from 'react-native';
import AppLoading from 'expo-app-loading';

import Input from '../../components/Input';

import {
  Container,
  Logo,
  Content,
  ButtonItem,
  ButtonText,
  ForgotText,
  Icon,
  ContainerIndicator,
  ActivityIndicator,
} from './styles';
import api from '../../services/api';

export function Forgot() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecoverPass = async () => {
    if (!email) {
      Alert.alert('Erro', 'Email é obrigatório');
      return;
    }
    setLoading(true);
    try {
      await api.post('recover', {email});
      Alert.alert('Atenção', 'Verifique seu email');
      setEmail('');
      navigation.goBack();
    } catch (er) {
      setLoading(false);
      Alert.alert(
        'ATENÇÃO :(',
        er &&
          er.response &&
          er.response.data &&
          er.response.data.error &&
          er.response.data.error.message
          ? er.response.data.error.message
          : 'Houve um erro. Tente novamente!',
      );
    }
  };

  return loading ? (
    <ContainerIndicator>
      <ActivityIndicator color="#203E9C" />
    </ContainerIndicator>
  ) : (
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
        <Input
          password={false}
          placeholder="E-mail"
          icon="user"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={e => setEmail(e)}
          value={email}
          autoCapitalize="none"
        />
      </Content>
      <ButtonItem onPress={handleRecoverPass}>
        <ButtonText>Recuperar senha</ButtonText>
      </ButtonItem>
    </Container>
  );
}
