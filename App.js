
import React from 'react';
import { Button, StyleSheet, Text, View,Image } from 'react-native';
import axios from "axios";
import Render from './Render'
import linkPage from './linkPage'
import sendEmail from './sendEmail'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
const Stack=createStackNavigator();
export default class App extends React.Component{
  render(){
    return (
     <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Render} options={
    {
     title:'FileShare',
     headerTitleAlign:'left',
     headerStyle:{
       backgroundColor:'#F9D342',
       height:70,
       borderRadius:6
     } 
    }
    }/>
    <Stack.Screen name="Link" component={linkPage} options={
    {
     title:'FileShare',
     headerStyle:{
       backgroundColor:'#F9D342',
       height:70,
     } 
    }
    }/>
    <Stack.Screen name="Email" component={sendEmail} options={
    {
     title:'FileShare',
     headerStyle:{
       backgroundColor:'#F9D342',
       height:70,
     } 
    }
    }
    />
    </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});