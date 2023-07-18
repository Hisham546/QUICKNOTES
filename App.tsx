import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/components/home';
import WriteNote from './src/components/writeNote';
const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
       <Stack.Screen
          options={{headerShown : false}}
          name="Home"
          component={Home} />
 <Stack.Screen
          options={{headerShown : false}}
          name="WriteNote"
          component={WriteNote} />
</Stack.Navigator>        
     </NavigationContainer>
  );
};

export default App;