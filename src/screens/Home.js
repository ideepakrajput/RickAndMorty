import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const CategoryCard = ({ title, color, onPress }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
);

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Character Categories</Text>
                <View style={styles.cardContainer}>
                    <CategoryCard
                        title="All Characters"
                        color="#4c669f"
                        onPress={() => navigation.navigate('CharacterList', { filter: '' })}
                    />
                    <CategoryCard
                        title="Alive Characters"
                        color="#11998e"
                        onPress={() => navigation.navigate('CharacterList', { filter: 'Alive' })}
                    />
                    <CategoryCard
                        title="Dead Characters"
                        color="#eb3349"
                        onPress={() => navigation.navigate('CharacterList', { filter: 'Dead' })}
                    />

                    <CategoryCard
                        title="Favorites Characters"
                        color="#f7b733"
                        onPress={() => navigation.navigate('Favorites')}
                    />
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    cardContainer: {
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home;