import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useRoute } from '@react-navigation/native';
const back = require('../../res/images/appIcons/back.png');

type TodayScreenProps = NativeStackScreenProps<RootStack>;

type HourlyBarProps = {
    temp: number,
    descrip: String,
    icon: ImageSourcePropType,
    time: String
}

const TodayForcastScreen = ({ navigation }: TodayScreenProps) => {
    const route = useRoute();
    const dailyData: Array<any> = route.params?.dailyData;
    const hourlyData: Array<any> = route.params?.hourlyData;

    const getTime = (seconds: number) => {
        const date = new Date();
        date.setSeconds(seconds + 19800);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var minute = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minute + ' ' + ampm;
        return strTime;
    }
    const HourlyView = ({ temp, descrip, icon, time }: HourlyBarProps) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 15 }}>{temp}°C</Text>
            <Text style={{ fontWeight: 'bold', color: "#808080", fontSize: 9 }}>{descrip}</Text>
            <Image source={icon} style={{ width: 80, height: 50, margin: 5 }} resizeMode="contain" />
            <Text style={{ fontWeight: 'bold', color: "#808080" }}>{time}</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ padding: 5, marginEnd: 20 }} onPress={() => navigation.goBack()}>
                    <Image source={back} tintColor={'#000'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: '#000' }}>Today Weather Forecast</Text>
            </View>
            <View style={{ flexDirection: 'row', elevation: 10, padding: 20, backgroundColor: '#FFF', borderRadius: 40, marginVertical: 40 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>Sunrise</Text>
                    <Text style={{ color: '#808080' }}>{getTime(dailyData[0].sunrise)}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>Sunset</Text>
                    <Text style={{ color: '#808080' }}>{getTime(dailyData[0].sunset)}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFF', flexDirection: 'row', borderRadius: 40, marginVertical: 10, padding: 20, elevation: 1 }}>
                <FlatList data={hourlyData} renderItem={({ item }) => <HourlyView temp={item.temp} descrip={item.weather[0].description.toUpperCase()} icon={getIcon(item.weather[0].icon)} time={parseMillisecondsIntoReadableTime(item.dt)} />} keyExtractor={item => item.dt} horizontal={true} ></FlatList>
            </View>
            {/* <FlatList data={data} renderItem={item => <DailyView item={item} />} keyExtractor={item => item.dt} /> */}
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
const parseMillisecondsIntoReadableTime = (seconds: number) => {
    const date = new Date();
    date.setSeconds(seconds + 21600);
    var time = date.toLocaleTimeString();
    var timeArr = time.split(":");
    return timeArr[0] + ":" + timeArr[1] + " " + time.split(" ")[1];
}

export default TodayForcastScreen;