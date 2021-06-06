import React, { Component } from 'react'
import { Text, View,Linking ,Share,StyleSheet,Image } from 'react-native'
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
export default class linkPage extends Component {
    state={
    filename:this.props.route.params.Link
    }
    onShare = async () => {
    try {
      const result = await Share.share({
        message: this.final,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
    newLink=this.state.filename.substring(21)
    final="http://5c302872d2b6.ngrok.io"+this.newLink
    render() {
        return (
            <View style={styles.container} >
          <Ionicons name="md-happy-outline" style={{alignItems:'center',alignSelf:'center'}} size={70} color="white" />
                  <Button mode="contained" style={{borderRadius:15}} color="#F9D342" onPress={()=>{
                      this.onShare()
                  }}>
                  Share Download link
                  </Button>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#292826',
        justifyContent:'center'
    }
})