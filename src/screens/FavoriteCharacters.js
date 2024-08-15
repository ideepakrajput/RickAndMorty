import React, { useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { getFavoriteCharacters } from '../services/favorites';
import { FavoritesContext } from '../context/FavoritesContext';
const FavoriteCharacters = ({ navigation }) => {
    const [favorites, setFavorites] = useContext(FavoritesContext);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const favoriteCharacters = await getFavoriteCharacters();
        setFavorites(favoriteCharacters);
    };

    const renderItem = ({ item }) => (
        <CharacterCard
            character={item}
            onPress={() => navigation.navigate('CharacterDetail', { character: item, setFavorites })}
        />
    );

    return (
        <View style={styles.container}>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text style={styles.noFavoritesText}>No favorite characters found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noFavoritesText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
        fontSize: 16,
    },
});

export default FavoriteCharacters;
