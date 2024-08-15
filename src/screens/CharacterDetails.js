import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { addFavoriteCharacter, removeFavoriteCharacter, getFavoriteCharacters } from '../services/favorites'; // Adjust the path as necessary
import { FavoritesContext } from '../context/FavoritesContext';

const CharacterDetails = ({ route, navigation }) => {
    const { character } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useContext(FavoritesContext);

    useEffect(() => {
        const title = character.name + " Details";
        navigation.setOptions({ title });
    }, [character]);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        const favorites = await getFavoriteCharacters();
        setIsFavorite(favorites.some(c => c.id === character.id));
        setFavorites(favorites);
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            await removeFavoriteCharacter(character.id);
            checkFavoriteStatus();
        } else {
            await addFavoriteCharacter(character);
            checkFavoriteStatus();
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: character.image }} style={styles.image} />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{character.name}</Text>
            </View>
            <Text style={styles.info}>Status: <Text style={styles.infoValue}>{character.status}</Text></Text>
            <Text style={styles.info}>Species: <Text style={styles.infoValue}>{character.species}</Text></Text>
            <Text style={styles.info}>Gender: <Text style={styles.infoValue}>{character.gender}</Text></Text>
            <Text style={styles.info}>Type: <Text style={styles.infoValue}>{character.type}</Text></Text>
            <Text style={styles.info}>Origin: <Text style={styles.infoValue}>{character.origin.name}</Text></Text>
            <TouchableOpacity onPress={toggleFavorite}>
                <Text
                    style={[
                        styles.favoriteIcon,
                        !isFavorite ? styles.favoriteIconActive : null,
                    ]}>{!isFavorite ? "Add to Favorites" : "Remove to Favorites"}</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Episodes:</Text>
            {character.episode.map((ep, index) => (
                <Text key={index} style={styles.episode}>
                    Episode {ep.split('/').pop()}
                </Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: '#007bff',
        borderRadius: 100,
        padding: 5,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    name: {
        color: '#212529',
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
    },
    favoriteIcon: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: '800',
    },
    favoriteIconActive: {
        color: '#fff',
        backgroundColor: '#007bff',
    },
    info: {
        color: '#495057',
        fontSize: 18,
        marginBottom: 10,
    },
    infoValue: {
        fontWeight: '500',
    },
    sectionTitle: {
        color: '#212529',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 15,
    },
    episode: {
        color: '#495057',
        fontSize: 16,
        marginBottom: 8,
    },
});

export default CharacterDetails;
