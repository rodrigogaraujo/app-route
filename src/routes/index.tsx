import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import {useAuth} from '../hooks/Auth';

const Routes = () => {
  const {loading, user} = useAuth();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user && user.token ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
