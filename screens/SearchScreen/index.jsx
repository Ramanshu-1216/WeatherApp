import { Image, ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
const background = require('../../res/images/backgrounds/searchCity.jpg');
const back = require('../../res/images/appIcons/back.png');
const search = require('../../res/images/appIcons/search.png');
const locationPin = require('../../res/images/appIcons/locationPin.png');
const SearchScreen = ({ navigation }) => {
    const [city, setCity] = useState("");
    const searchHandle = () => {
        if(city == ""){
            ToastAndroid.show("Enter a valid city", ToastAndroid.SHORT);
        }
        var  url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=758d58272583fed3901a9e1feef8c950&units=metric';
        fetch(url).then(response => response.json()).then(data => {
            if(data.cod == "404"){
                ToastAndroid.show("Enter a valid city", ToastAndroid.SHORT);
            }
            else{
                navigation.navigate("Home", {long: data.coord.lon, lat: data.coord.lat, city: city});
            }
        }).catch(() => {
            ToastAndroid.show("Enter a valid city", ToastAndroid.SHORT);;
        });
    }

    return (
        <ImageBackground source={background} style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ padding: 5, marginEnd: 20 }} onPress={() => {navigation.goBack()}}>
                    <Image source={back} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 }}>Search City</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 10, marginEnd: 10, height: 50, elevation: 1, paddingHorizontal: 20, flexDirection: 'row'}}>
                    <Image source={locationPin} tintColor={'#808080'} style={{alignSelf: 'center', width: 20, height: 20}}/>
                    <TextInput style={{color: "#000", flex: 1}} placeholderTextColor="#808080" placeholder="City Name" onChangeText={setCity} />
                </View>
                <TouchableOpacity style={{ backgroundColor: "#00FFFF", width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 1 }} onPress={searchHandle}>
                    <Image source={search} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default SearchScreen;