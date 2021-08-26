import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import api from '../services/api';
import {database} from '../database';
import {User as Modeluser} from '../database/models/User';

interface UserProps {
  email: string;
  name?: string;
  password?: string;
  id: string;
  token: string;
}
interface AuthState {
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
    async function loadUserData(): Promise<void> {
      const userCollection = database.get<Modeluser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as UserProps;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData({user: userData});
      }

      setLoading(false);
    }

    loadUserData();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await database.write(async () => {
        const userCollection = database.get<Modeluser>('users');
        const userSelected = await userCollection.find(data.user.id);
        await userSelected.destroyPermanently();
        setData({} as AuthState);
      });
    } catch (er) {
      throw new Error(er);
    }
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
      const {token, user} = response.data;
      api.defaults.headers.authorization = `Bearer ${token.token}`;
      const userCollection = database.get<Modeluser>('users');
      await database.write(async () => {
        const resp = await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.token = token.token;
        });
        const userData = resp._raw as unknown as UserProps;
        setData({user: userData});
      });
    } catch (er) {
      throw new Error(er);
    }
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
