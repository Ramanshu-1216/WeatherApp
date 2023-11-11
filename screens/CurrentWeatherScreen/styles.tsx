import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Styles = StyleSheet.create({
    detailsViewContainer: {
        alignItems: 'center', 
        flex: 1,
    },
    detailsViewTitle: {
        fontWeight: 'bold', 
        color: "#808080",
    },
    detailsViewValue: {
        fontWeight: 'bold',
         color: '#000', 
         fontSize: 15,
    },
    hourlyViewContainer: {
        alignItems: 'center', 
        flex: 1,
    },
    hourlyViewTextTemp: {
        fontWeight: 'bold', 
        color: '#000', 
        fontSize: 15,
    },
    hourlyViewDescrip: {
        fontWeight: 'bold',
         color: "#808080", 
         fontSize: 9
    },
    hourlyViewIcon: {
        width: 80, 
        height: 50,
        margin: 5
    },
    hourlyViewTime: {
        fontWeight: 'bold', 
        color: "#808080"
    },
    drawerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        position: 'absolute', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        width: '140%', 
        height: '110%', 
        zIndex: 10, 
        elevation: 10 
    },
    drawerBranding: {
        backgroundColor: '#FFF', 
        width: '70%', 
        height: '110%'
    }
    
});
export default Styles;