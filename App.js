import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CharacterList from './src/screens/CharacterList';
import CharacterDetails from './src/screens/CharacterDetails';
import FavoriteCharacters from './src/screens/FavoriteCharacters';
import { FavoritesProvider } from './src/context/FavoritesContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Rick and Morty' }} />
          <Stack.Screen name="CharacterList" component={CharacterList} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetails} />
          <Stack.Screen name="Favorites" component={FavoriteCharacters} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
