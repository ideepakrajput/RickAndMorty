import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CharacterCard = ({ character, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{character.name}</Text>
                <Text style={styles.species}>{character.species}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    species: {
        fontSize: 14,
        color: '#666',
    },
});

export default CharacterCard;