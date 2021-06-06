import React, { Component } from 'react'
import { Text, View,StyleSheet,Image, ActivityIndicator,Animated } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as DocumentPicker from 'expo-document-picker' ;
import { Button } from 'react-native-paper';
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import AnimatedLoader from 'react-native-animated-loader'
export default class Render extends Component {
    state={
   uri:null,
   load:false,
   toLoad:true,
   Link:null,
   filename:null
  }

  ///////////////////////////////////////////////////////////////////


  position0=new Animated.ValueXY({x:0,y:-1000})
  position1=new Animated.ValueXY({x:0,y:-1000})
  position2=new Animated.ValueXY({x:0,y:-1000})
  rotatePos=new Animated.Value(0);
  rotatePos1=new Animated.Value(0);
  scale=new Animated.Value(1);
 /////////////////////////////////////////////////////////////////////
  rotate=this.rotatePos.interpolate({
    inputRange:[0,1],
    outputRange:["0deg","360deg"]
  })

  rotate1=this.rotatePos1.interpolate({
    inputRange:[0,1],
    outputRange:["0deg","360deg"]
  })

  takeAndUploadPhotoAsync=async()=> {
  // Display the camera to the user and wait for them to take a photo or to cancel
  // the action
    

  await Animated.spring(this.scale,{
    toValue:1.5,
    duration:300,
    useNativeDriver:true,
  }).start(async()=>{



   this.scale.setValue(1)

   let result = await DocumentPicker.getDocumentAsync({});
      console.log(result);
  // let result = await ImagePicker.launchCameraAsync({
  //   allowsEditing: true,
  //   base64:true
  // });

  if (result.type=='cancel') {
    this.setState({
      uri:null,
      toLoad:true
    })
    return;
  }

   let localUri = result.uri;
  this.setState({
    uri:result.uri
  })
    this.setState({
    toLoad:false
  })
  let filename = this.state.uri.split('/').pop();
  this.setState({
    filename:filename
  })
  // console.log(base64)
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('image', { uri: this.state.uri, name: filename, type });
  axios.post("http://5c302872d2b6.ngrok.io/api/files",formData)
  .then((res)=>{
    this.setState({
      toLoad:true,
      Link:res.data.file
    })
  })
  .catch((err)=>{console.log(err)})
  })


   
  // ImagePicker saves the taken photo to disk and returns a local URI to it
}

////////////////////////////////////////////////////////////////////////////

 upload= async ()=>{

   await Animated.timing(this.rotatePos,{
    toValue:1,
    duration:500,
    useNativeDriver:true
  }).start(
     this.rotatePos.setValue(0)
  )
  
  if(!this.state.Link)
  {
   alert("Please Upload File First")
    return 
  }
    
  
    this.props.navigation.navigate('Link',{
         Link:this.state.Link
       })
}

/////////////////////////////////////////////////////////////////////////////////////// 

  sendEmail=async()=>{
     await Animated.timing(this.rotatePos1,{
    toValue:1,
    duration:500,
    useNativeDriver:true
  }).start(
     this.rotatePos1.setValue(0)
  )
  if(!this.state.Link)
  {
    alert("Please Upload File First")
    return 
  }
  this.props.navigation.navigate('Email',{
        Link:this.state.Link
      })
    }

////////////////////////////////////////////


  componentDidMount(){


      Animated.timing(this.position0,{
        duration:2000,
         toValue:{x:0,y:0}
       }).start(()=>{



         Animated.timing(this.position1,{
            duration:1000,
         toValue:{x:0,y:0}
       }).start()


        Animated.timing(this.position2,{
           duration:1000,
         toValue:{x:0,y:0}
       }).start()

       })
    }


////////////////////////////////////////////////////////////////////////////////////


  render(){
    return(
      this.state.toLoad
      ?
     <View style={{
       flex:1,
       backgroundColor:'#292826'
       }}>
     <View style={styles.container}>
    
      {!this.state.uri
      ?
      <Animated.View
      style={{
        transform:[
           {scale:this.scale}
         ]
      }}
      >
       <AntDesign style={{
         alignSelf:'center',
         flexDirection:'column',
         }}
          name="addfile" 
          size={90}
          color="white"
          onPress={()=>{
            this.takeAndUploadPhotoAsync()
          }}
       />
       </Animated.View> 
       :
       <View>
       <Foundation 
        name="check"
        size={59} 
        style={{
          alignSelf:'center',
          alignItems:'baseline'
          }}
         color="white"
       />
        <Text style={{
          color:'#42EADDFF',
          fontSize:20
        }}>
        
       </Text>
       <Text style={{
          color:'#42EADDFF',
          fontSize:18
        }}>
      
       {this.state.filename}
       </Text>
       </View>
      }
      <Animated.View
         style={{
        marginTop:'15%',
        transform:[
          { translateY :this.position0.y}
        ]
      }}>
     <Button
      color="#F9D342" 
      mode="contained"
       onPress={()=>{
      this.takeAndUploadPhotoAsync()}}
      >

      Choose Document and upload


     </Button>
     </Animated.View>
     </View>


     <View 
      style={{
       alignContent:'space-around',
       flexDirection:'row' 
       }} >

     <Animated.View
     style={{
       transform:[
          { translateY :this.position1.y},
          { rotateX : this.rotate },
          { perspective: 1000 }
        ]
     }}
     >

     <Button 
      style={{
        marginRight:"auto",
        backgroundColor:'#F9D342'
        }}
      color="black" 
      onPress={
      ()=>{
      this.upload()
     }
     }>
     Generate Link
     </Button>
    
    </Animated.View>


   <Animated.View
   style={{
        transform:[
          {translateY :this.position2.y},
          { rotateX : this.rotate1 },
          { perspective: 1000 }
        ],
         marginLeft:"auto",
   }}
   >
      <Button 
      onPress={
        ()=>{
        this.sendEmail()
      }}

      style={{
      
         alignContent:'flex-end',
         backgroundColor:'#F9D342'
         }}
      color="black">
     Or Send Via Email
     </Button>
</Animated.View>

     </View>
     </View>
     :
     <View 
     style={{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#292826'
       }}>
      <AnimatedLoader
        visible={!this.state.toLoad}
        overlayColor="#F9D342"
        source={require("./loader.json")}
        animationStyle={{height:120,width:120}}
        speed={0.8}
      >
        <Text>Kindly Wait...</Text>
      </AnimatedLoader>
     </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop:'30%',
    marginBottom:'60%',
    marginLeft:'5%',
    marginRight:'5%',  
    flex:0.7,
    justifyContent: 'center',
    flexDirection:'column',

  },
});