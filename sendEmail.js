import React, { Component } from 'react'
import { Text, TouchableOpacity, View,TextInput,StyleSheet } from 'react-native'
import {ActivityIndicator, Button} from 'react-native-paper'
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import AnimatedLoader from 'react-native-animated-loader'
export default class sendEmail extends Component {
    state={
        uuid:'',
        ToEmail:'',
        FromEmail:'',
        isLoading:false,
    }
   async componentDidMount()
    {
      await this.setState({
            uuid:this.props.route.params.Link.substring(37)
        })
    }
    sendEmail=()=>{
        if(this.state.FromEmail.length==0||this.state.ToEmail.length==0)
        {
            alert("All fields required")
            return 
        }
        this.setState({
        isLoading:true
        })
       axios.post('http://5c302872d2b6.ngrok.io/api/files/send',{
        uuid:this.state.uuid,
        emailTo:this.state.ToEmail,
        emailFrom:this.state.FromEmail
       }).then((res)=>{
             
        this.setState({
        isLoading:false
        })
         alert("Email sent")
           
       }).catch((err)=>{
         let error=JSON.stringify(err)
          console.log(err.message)
          if(err.message==="Request failed with status code 422")
          {
              alert("Email Already sent")
              return
          }
       })
    }
    render() {
        return (
            !this.state.isLoading
            ?  
            <View style={styles.container}>
            <Ionicons name="md-happy-outline" style={{alignSelf:'center',marginTop:'40%'}} size={70} color="white" />
             <TextInput
              style={styles.TextInput}
              onChangeText={(text)=>{
                  this.setState({
                      ToEmail: text
                  })
              }}
              placeholder="Receiver's Email"
             />
               <TextInput
              style={styles.TextInput1}
              onChangeText={(text)=>{
                  this.setState({
                      FromEmail: text
                  })
              }}
              placeholder="Sender's Email"
             />
             <Button onPress={()=>{
              this.sendEmail()
             }} color='white' style={{padding:3,backgroundColor:'#F9D342',alignContent:'center',marginTop:'5%',marginLeft:'25%',marginRight:'25%'}} >
             Send
             </Button>
            </View>
            :
               <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <AnimatedLoader
                visible={!this.state.toLoad}
                overlayColor="rgba(255,255,255)"
                source={require("./loader.json")}
                animationStyle={{height:120,width:120}}
                speed={1}
                >
                <Text>Kindly Wait...</Text>
                </AnimatedLoader>
                </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
         flex:1,
         backgroundColor:'#292826',
    },
    TextInput:{
        borderRadius:23,borderWidth:2,padding:10,backgroundColor:'white'
    },
    TextInput1:{
        marginTop:'8%',
        borderRadius:23,borderWidth:2,padding:10,backgroundColor:'white'
    }
})