import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Location from 'expo-location';

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
  ContainerIndicator,
  ActivityIndicator,
} from './styles';
import {useAuth} from '../../hooks/Auth';

type forgotScreenProp = StackNavigationProp<RootStackParamList, 'Forgot'>;

export function SignIn() {
  const navigation = useNavigation<forgotScreenProp>();
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const hadleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Email e senha são obrigatórios');
      return;
    }
    setLoading(true);
    try {
      await signIn({email, password});
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

  useEffect(() => {
    (async () => {
      let resp = await Location.requestBackgroundPermissionsAsync();
      if (resp.status !== 'granted') {
        Alert.alert(
          'ATENÇÃO',
          'Este aplicativo precisa de permissão para utilização do seu GPS',
        );
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let respThree = await Location.requestForegroundPermissionsAsync();
      if (respThree.status !== 'granted') {
        Alert.alert(
          'ATENÇÃO',
          'Este aplicativo precisa de permissão para utilização do seu GPS',
        );
        return;
      }
    })();
  }, []);

  return loading ? (
    <ContainerIndicator>
      <ActivityIndicator color="#203E9C" />
    </ContainerIndicator>
  ) : (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Logo />
          <Content>
            <Input
              password={false}
              placeholder="E-mail"
              icon="user"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={e => setEmail(e)}
              value={email}
            />
            <Input
              password={true}
              placeholder="Senha"
              icon="lock"
              autoCapitalize="none"
              onChangeText={e => setPassword(e)}
              value={password}
            />
          </Content>
          <ButtonItemForgot onPress={() => navigation.navigate('Forgot')}>
            <ButtonTextForgot>Esqueceu sua senha?</ButtonTextForgot>
          </ButtonItemForgot>
        </ScrollView>
        <ButtonItem onPress={hadleSignIn}>
          <ButtonText>Entrar</ButtonText>
        </ButtonItem>
      </Container>
    </KeyboardAvoidingView>
  );
}
