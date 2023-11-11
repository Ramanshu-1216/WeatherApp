import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useRoute } from '@react-navigation/native';
const back = require('../../res/images/appIcons/back.png');
const temperature = require('../../res/images/appIcons/img_1.png');

const DailyForcast = ({ navigation }) => {
    const route = useRoute();
    const data = route.params?.data;
    const DailyView = (item) => {
        item = item.item.item;
        const date = new Date();
        date.setSeconds(item.dt);
        console.log(item);
        return (<View style={{ flexDirection: 'row', margin: 20 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 10 }}>{getDay(date.getDay())}</Text>
                <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 10 }}>{date.getDate() + "/" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): date.getMonth() + 1)}</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.temp.day}C</Text>
                    <Image source={getIcon(item.weather[0].icon)} style={{ width: 50, height: 25, }} resizeMode='contain' />
                </View>
                <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 10 }}>{item.weather[0].description.toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={temperature} style={{ width: 25, height: 25, alignSelf: 'center', margin: 5 }} />
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>Max {Math.round(item.temp.max)}°C</Text>
                        <Text style={{ color: '#00FFFF', fontWeight: 'bold' }}>Min {Math.round(item.temp.min)}°C</Text>
                    </View>
                </View>

            </View>
        </View>);
    }
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ padding: 5, marginEnd: 20 }} onPress={() => navigation.goBack()}>
                    <Image source={back} tintColor={'#000'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: '#000' }}>Daily Weather Forecast</Text>
            </View>
            <FlatList data={data} renderItem={item => <DailyView item={item} />} keyExtractor={item => item.dt} />
        </View>
    )
}

const getIcon = (icon) => {
    switch (icon) {
        case "01d":
            return require('../../res/images/weatherIcons/01d.png');
        case "01n":
            return require('../../res/images/weatherIcons/01n.png');
        case "02d":
            return require('../../res/images/weatherIcons/02d.png');
        case "02n":
            return require('../../res/images/weatherIcons/02n.png');
        case "03d":
            return require('../../res/images/weatherIcons/03d.png');
        case "03n":
            return require('../../res/images/weatherIcons/03n.png');
        case "04d":
            return require('../../res/images/weatherIcons/04d.png');
        case "04n":
            return require('../../res/images/weatherIcons/04n.png');
        case "09d":
            return require('../../res/images/weatherIcons/09d.png');
        case "09n":
            return require('../../res/images/weatherIcons/09n.png');
        case "10d":
            return require('../../res/images/weatherIcons/10d.png');
        case "10n":
            return require('../../res/images/weatherIcons/10n.png');
        case "13d":
            return require('../../res/images/weatherIcons/13d.png');
        case "13n":
            return require('../../res/images/weatherIcons/13n.png');
        case "50d":
            return require('../../res/images/weatherIcons/50d.png');
        case "50n":
            return require('../../res/images/weatherIcons/50n.png');
    }
}

const getDay = (day) => {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
    return "";
}
export default DailyForcast;