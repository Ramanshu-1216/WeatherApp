import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useRoute } from '@react-navigation/native';
const back = require('../../res/images/appIcons/back.png');
const temperature = require('../../res/images/appIcons/img_1.png');

type DataProp = {
    "dt": 1699700400,
    "sunrise": 0,
    "sunset": 0,
    "moonrise": 1699683420,
    "moonset": 1699699140,
    "moon_phase": 0.94,
    "temp": {
        "day": 259.77,
        "min": 256.76,
        "max": 265.24,
        "night": 265.24,
        "eve": 261.11,
        "morn": 256.76
    },
    "feels_like": {
        "day": 255.57,
        "night": 258.96,
        "eve": 255.16,
        "morn": 256.76
    },
    "pressure": 1020,
    "humidity": 95,
    "dew_point": 257.26,
    "wind_speed": 4.22,
    "wind_deg": 203,
    "wind_gust": 6.4,
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "clouds": 96,
    "pop": 0.04,
    "uvi": 0
}
type DailyScreenProps = NativeStackScreenProps<RootStack>;
const DailyForcast = ({ navigation }: DailyScreenProps) => {
    const route = useRoute();
    const data: Array<DataProp> = route.params?.data;
    const DailyView = (item: DataProp) => {
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

const getIcon = (icon: string) => {
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

const getDay = (day: number) => {
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
export default DailyForcast