import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../services/api';

const CharacterList = ({ route, navigation }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        status: route.params?.filter || '',
        species: '',
        gender: '',
        page: 1,
        name: '',
        type: ''
    });

    const statuses = ['All', 'Alive', 'Dead', 'Unknown'];
    const speciesOptions = ['All', 'Human', 'Alien', 'Animal', 'Robot', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Unknown'];
    const genders = ['All', 'Male', 'Female', 'Genderless', 'Unknown'];

    useEffect(() => {
        loadCharacters();
    }, [filters, currentPage]);

    useEffect(() => {
        const title = filters.status ? `${filters.status} Characters` : 'All Characters';
        navigation.setOptions({ title });
    }, [filters.status, navigation]);

    const loadCharacters = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCharacters({ ...filters, page: currentPage });
            if (data && data.results) {
                setCharacters(prevCharacters =>
                    currentPage === 1 ? data.results : [...prevCharacters, ...data.results]
                );
                setPageInfo(data.info || {});
            } else {
                setError('No character data found');
            }
        } catch (error) {
            console.error('Error fetching characters:', error);
            setError('Failed to fetch characters. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (pageInfo && pageInfo.next) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handleApplyFilters = (key, value) => {
        setCharacters([]);
        setCurrentPage(1);
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const renderItem = ({ item }) => (
        item ? (
            <CharacterCard
                character={item}
                onPress={() => navigation.navigate('CharacterDetail', { character: item })}
            />
        ) : null
    );

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };

    // if (error) {
    //     return (
    //         <View style={styles.errorContainer}>
    //             <Text style={styles.errorText}>{error}</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <View style={styles.filterRow}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Status</Text>
                    <Picker
                        selectedValue={filters.status}
                        style={styles.picker}
                        onValueChange={(value) => handleApplyFilters('status', value)}
                    >
                        <Picker.Item label="Select Status" value="" />
                        {statuses.map((status, index) => (
                            <Picker.Item key={index} label={status} value={status} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Gender</Text>
                    <Picker
                        selectedValue={filters.gender}
                        style={styles.picker}
                        onValueChange={(value) => handleApplyFilters('gender', value)}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        {genders.map((gender, index) => (
                            <Picker.Item key={index} label={gender} value={gender} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.filterRow}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Species</Text>
                    <Picker
                        selectedValue={filters.species}
                        style={styles.picker}
                        onValueChange={(value) => handleApplyFilters('species', value)}
                    >
                        <Picker.Item label="Select Species" value="" />
                        {speciesOptions.map((species, index) => (
                            <Picker.Item key={index} label={species} value={species} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.filterRow}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={filters.name}
                        onChangeText={(value) => handleApplyFilters('name', value)}
                        placeholder="Enter Name"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Type</Text>
                    <TextInput
                        style={styles.input}
                        value={filters.type}
                        onChangeText={(value) => handleApplyFilters('type', value)}
                        placeholder="Enter Type"
                        placeholderTextColor="#888"
                    />
                </View>
            </View>
            {characters.length > 0 ? (
                <FlatList
                    data={characters}
                    renderItem={renderItem}
                    keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            ) : !loading ? (
                <Text style={styles.noResultsText}>No characters found.</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 8,
        borderColor: '#ced4da',
        borderWidth: 1,
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ced4da',
        borderWidth: 1,
        paddingHorizontal: 10,
        color: '#333',
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    noResultsText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
        fontSize: 16,
    },
});

export default CharacterList;