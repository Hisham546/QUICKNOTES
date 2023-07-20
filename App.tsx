import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/components/home';
import WriteNote from './src/components/writeNote';
import FloatingButton from './src/components/floatingButton/floatingButton';
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
          <Stack.Screen
          options={{headerShown : false}}
          name="FloatingButton"
          component={FloatingButton} />
</Stack.Navigator>        
     </NavigationContainer>
  );
};

export default App;