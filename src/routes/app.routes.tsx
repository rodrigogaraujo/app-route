import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Dashboard } from '../screens/Dashboard';

const App = createStackNavigator();

const StackRoutes = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      {/* <App.Screen name="Profile" component={Profile} /> */}
    </App.Navigator>
  );
};

export default StackRoutes;
