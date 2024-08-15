import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favoriteCharacters';

export const addFavoriteCharacter = async (character) => {
    try {
        const favorites = await getFavoriteCharacters();
        const updatedFavorites = [...favorites, character];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error adding favorite character:', error);
    }
};

export const removeFavoriteCharacter = async (characterId) => {
    try {
        const favorites = await getFavoriteCharacters();
        const updatedFavorites = favorites.filter(c => c.id !== characterId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error removing favorite character:', error);
    }
};

export const getFavoriteCharacters = async () => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error fetching favorite characters:', error);
        return [];
    }
};
