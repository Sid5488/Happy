import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function OrphanageDetails() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello World</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 25,
        fontFamily: 'Nunito_800ExtraBold'
    }
});
