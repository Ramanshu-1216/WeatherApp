import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../App';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home', undefined);
        }, 2000);
    }, []);
    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 70, color: '#00FFFF', fontWeight: 'bold' }}>ENVO</Text>
            <Text style={{ color: '#808080' }}>WEATHER ASSISTANT</Text>
        </View>
    )
}

export default SplashScreen;