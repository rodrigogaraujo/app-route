import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SignIn} from '../screens/SignIn';
import {Forgot} from '../screens/Forgot';

export type RootStackParamList = {
  SignIn: undefined;
  Forgot: undefined;
};

const Auth = createStackNavigator<RootStackParamList>();

const AuthRoutes = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="Forgot" component={Forgot} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
