import { Image, View, Text, ImageBackground, ImageSourcePropType, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, BackHandler } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useIsFocused, useRoute } from "@react-navigation/native";
import Styles from "./styles";
const morningBg1 = require('../../res/images/backgrounds/1.jpg');
const locationPin = require('../../res/images/appIcons/locationPin.png');
const clouds = require('../../res/images/weatherIcons/03d.png');
const temp = require('../../res/images/appIcons/img.png');
const humidity = require('../../res/images/appIcons/humidity.png');
const wind = require('../../res/images/appIcons/wind.png');
const hamburgerIcon = require('../../res/images/appIcons/sidebaropen.png');
const reloadIcon = require('../../res/images/appIcons/refresh.png');
const startIcon = require('../../res/images/appIcons/star.png');
const searchIcon = require('../../res/images/appIcons/search.png');
// import {API_KEY} from '@env'; 

const DetailsBarView = ({ icon, title, value }) => {
    return (
        <View style={Styles.detailsViewContainer}>
            <Image source={icon} style={{ width: 25, height: 25, margin: 5 }} />
            <Text style={Styles.detailsViewText}>{title}</Text>
            <Text style={Styles.detailsViewValue}>{value}</Text>
        </View>
    );
}
const HourlyView = ({ temp, descrip, icon, time }) => (
    <View style={Styles.hourlyViewContainer}>
        <Text style={Styles.hourlyViewTextTemp}>{temp}°C</Text>
        <Text style={Styles.hourlyViewDescrip}>{descrip}</Text>
        <Image source={icon} style={Styles.hourlyViewIcon} resizeMode="contain" />
        <Text style={Styles.hourlyViewTime}>{time}</Text>
    </View>
);

const CurrentWeatherScreen = ({ navigation }) => {
    const [cordinates, setCordinates] = useState([0, 0]);
    const route = useRoute();
    var lat = route.params?.lat;
    var long = route.params?.long;
    const cityp = route.params?.city;
    const [city, setCity] = useState("");
    const [currentWeather, setCurrentWeather] = useState({ temp: 0, humidity: 0, wind_gust: 0, weather: [{ description: "Wait a minute", icon: "03d" }] });
    const [updatedTime, updateTime] = useState("");
    const [currentIcon, setCurrentIcon] = useState();
    const [hourlyData, setHourlyData] = useState();
    const isFocus = useIsFocused();
    const [drawer,  toggleDrawer] = useState(false);
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        console.log(city);
        setCity(cityp);
        if (isFocus) {
            if (city == "" || lat == undefined || long == undefined) {
                getCordinates();
            }
            else {
                setCordinates([Number(lat), Number(long)]);
                console.log([Number(lat), Number(long)]);
            }
        }

    }, [isFocus]);

    useEffect(() => {
        if (cordinates[0] != 0) {
            const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cordinates[0] + "&lon=" + cordinates[1] + "&appid=" + "758d58272583fed3901a9e1feef8c950" +"&units=metric";
            fetch(url).then(response => response.json()).then(data => {
                if (data.cod != "400") {
                    setCurrentWeather(data.current);
                    const date = new Date();
                    updateTime(getDay(date.getDay()) + " " + date.getDate() + " " + getMonth(date.getMonth()) + " " + getAMPM(date));
                    setCurrentIcon(getIcon(data.current.weather[0].icon));
                    setHourlyData(data.hourly);
                    setDailyData(data.daily);
                }
                else {
                    ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
                }
            }).catch(() => {
                ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
            });
        }
    }, [cordinates]);

    const getCordinates = () => {
        Geolocation.getCurrentPosition((info) => {
            setCordinates([info.coords.latitude, info.coords.longitude]);
            setCity("");
        });
    }

    const Drawer = () => (
        drawer && <TouchableOpacity style={Styles.drawerContainer} activeOpacity={1} onPress={() => toggleDrawer(false)}>
            <View style={Styles.drawerBranding}>
                <View style={{ alignItems: 'center', marginVertical: 100 }}>
                    <Text style={{ fontSize: 70, color: '#00FFFF', fontWeight: 'bold' }}>ENVO</Text>
                    <Text style={{ color: '#808080' }}>WEATHER ASSISTANT</Text>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{flexDirection: 'row', padding: 5, margin: 10, marginHorizontal: 20}} onPress={() => {navigation.navigate('Daily', {data: dailyData})}}>
                        <Image source={{}} />
                        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>Daily Forecast</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', padding: 5, margin: 10, marginHorizontal: 20}} onPress={() => {navigation.navigate('Today', {dailyData: dailyData, hourlyData: hourlyData})}}>
                        <Image source={{}} />
                        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>Today Forecast</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', padding: 5, margin: 10, marginHorizontal: 20}}>
                        <Image source={{}} />
                        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>Saved Location</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </TouchableOpacity>
    );

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //     if(drawer == true){
    //         toggleDrawer(false);
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // });

    return (
        <ImageBackground source={getBg()} style={{ flex: 1, padding: 20 }}>
            <Drawer />
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => {toggleDrawer(true)}}>
                    <Image source={hamburgerIcon} style={{ width: 25, height: 25 }} tintColor={'#FFF'} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={getCordinates}>
                    <Image source={reloadIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10, marginLeft: "auto" }} onPress={() => { }}>
                    <Image source={startIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { navigation.navigate('Search') }}>
                    <Image source={searchIcon} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={locationPin} />
                    <Text style={{ fontSize: 25, fontWeight: "900", color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}> {city != "" && city ? city.toLocaleUpperCase() : "UNKNOWN"}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: -20 }}>
                    <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 0.1 }}>{updatedTime}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 170, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>{Math.round(currentWeather.temp)}°</Text>
                    <Image source={currentIcon} style={{ width: 100, height: 100, alignSelf: 'flex-end', marginStart: -65 }} resizeMode="contain" />
                </View>
                <View>
                    <Text style={{ fontWeight: "900", fontSize: 25, marginTop: -20, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>{currentWeather.weather[0].description.toUpperCase()}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFF', flexDirection: 'row', borderRadius: 40, marginTop: 25, marginBottom: 10, padding: 25, shadowOffset: { width: 1, height: 1 }, elevation: 1 }}>
                <DetailsBarView icon={temp} title={"Max Temp"} value={currentWeather.temp + "°C"} />
                <DetailsBarView icon={humidity} title={"Humidity"} value={currentWeather.humidity + "%"} />
                <DetailsBarView icon={wind} title={"Wind"} value={currentWeather.wind_gust + "m/s"} />
            </View>
            <View style={{ backgroundColor: '#FFF', flexDirection: 'row', borderRadius: 40, marginVertical: 10, padding: 20, elevation: 1 }}>
                <FlatList data={hourlyData} renderItem={({ item }) => <HourlyView temp={item.temp} descrip={item.weather[0].description.toUpperCase()} icon={getIcon(item.weather[0].icon)} time={parseMillisecondsIntoReadableTime(item.dt)} />} keyExtractor={item => item.dt} horizontal={true} ></FlatList>
            </View>
        </ImageBackground >
    );
}

const getDay = (day) => {
    switch (day) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
    return "";
}
const getMonth = (month) => {
    switch (month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
    return "";
}
const getAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var minute = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minute + ' ' + ampm;
    return strTime;
}
const getBg = () => {
    var hours = new Date().getHours();
    if (hours >= 0 && hours < 5) {
        return require('../../res/images/backgrounds/4.jpg');
    }
    if (hours >= 5 && hours <= 6) {
        return require('../../res/images/backgrounds/5.jpg');
    }
    if (hours >= 7 && hours <= 10) {
        return require('../../res/images/backgrounds/1.jpg');
    }
    if (hours >= 11 && hours <= 17) {
        return require('../../res/images/backgrounds/2.jpg');
    }
    if (hours >= 18 && hours <= 19) {
        return require('../../res/images/backgrounds/3.jpg');
    }
    if (hours >= 20) {
        return require('../../res/images/backgrounds/4.jpg');
    }
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
const parseMillisecondsIntoReadableTime = (seconds) => {
    const date = new Date();
    date.setSeconds(seconds + 21600);
    var time = date.toLocaleTimeString();
    var timeArr = time.split(":");
    return timeArr[0] + ":" + timeArr[1] + " " + time.split(" ")[1];
}


export default CurrentWeatherScreen;
