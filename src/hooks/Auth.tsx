import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface UserProps {
  email: string;
  name?: string;
  password: string;
}
interface AuthState {
  token: string;
  user: UserProps;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}

export const AuthProvider: React.FC = ({children}: any) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@km-ph:token',
        '@km-ph:user',
      ]);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@km-ph:token', '@km-ph:user']);
    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const {token, user} = response.data;
    api.defaults.headers.authorization = `Bearer ${token.token}`;
    await AsyncStorage.multiSet([
      ['@km-ph:token', token.token],
      ['@km-ph:user', JSON.stringify(user)],
    ]);

    setData({token, user});
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
