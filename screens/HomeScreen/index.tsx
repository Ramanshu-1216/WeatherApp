import { View } from "react-native"
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from "@react-navigation/native";
import CurrentWeatherScreen from "../CurrentWeatherScreen";

const Drawer = createDrawerNavigator();
const HomeScreen = () => {
    return (
        <View></View>
            // <Drawer.Navigator initialRouteName="Current">
                /* <Drawer.Screen name="Current" component={CurrentWeatherScreen} />
                <Drawer.Screen name="same" component={CurrentWeatherScreen} /> */
            // </Drawer.Navigator>
    );
}



export default HomeScreen;