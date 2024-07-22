// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

// ExerciseList.js
const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';
const fetchExercises = async () => {
    try {
        const response = await axios.post(API_URL, {
            messages: [
                { role: "system", content: "You are a helpful assistant. Please provide a list of common exercises." },
                { role: "user", content: "List some common exercises" }
            ],
            model: "gpt-4o"
        });
        const { data } = response;
        return JSON.parse(data.response);
    } catch (error) {
        console.error(error);
    }
};

const ExerciseList = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getExercises = async () => {
            const exerciseList = await fetchExercises();
            setExercises(exerciseList);
            setLoading(false);
        };
        getExercises();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <FlatList
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
});

// App.js
export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <ExerciseList />
        </SafeAreaView>
    );
}