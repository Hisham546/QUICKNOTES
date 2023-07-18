import React, { useEffect,useRef,useState } from "react";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {
View,
Image,
Text,Button,PermissionsAndroid,
StyleSheet,TouchableOpacity,FlatList,ImageBackground,
TextInput}
from "react-native";
import CardView from 'react-native-cardview';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WriteNote ({navigation}: {navigation: any}){




    return(

        <View style={styles.mainContainer}>
       
    <CardView
                cornerRadius={5}
                style={styles.item}>
                  <TouchableOpacity activeOpacity={1} >
    
                  </TouchableOpacity>
    </CardView>
    
    <View style={styles.secondView}>
               
             
               </View>
    </View>
    
    
    
    
    )
    
    
    
    
    }
    
    
    const styles = StyleSheet.create({
    
    mainContainer:{
    flex:1,
    backgroundColor:'white'
    
    },
    headingView:{
    backgroundColor:'white',
    width:wp('100'),
    height:hp('8'),
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
    
    },
    headerText:{
    color:'black',
    fontFamily:'Manrope-Bold',
    fontSize:hp('2.20'),
    marginLeft:wp('2')
    },
    userLogo:{
      width:30,
      height:30,
      borderRadius:15,
      marginRight:wp(3)
      
      
        },
    
      item: {
         height : hp('27%'),
         width : wp(' 50%'),
         backgroundColor:'orange',
         borderRadius:8,
         shadowColor: '#000000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.9,
         shadowRadius: 3,
         elevation: 6,
         marginRight:wp('1'),
         marginLeft: wp('1%'),
         marginTop:hp('.80%'),
         marginBottom:hp('.50')
      },
      writeButton:{
        width:wp('35'),
        height:hp('6'),
        borderRadius:25,
        backgroundColor:'#068FFF',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginRight:wp('5'),
        flexDirection:'row'
    
    
      },
      firstView:{
       width:wp('100'),
       height:hp('80'),
    
    
      },
      secondView:{
         width:wp('100'),
         height:hp('12'),
         flexDirection:'row',
         justifyContent:'flex-end',
    
      },
    
    
    
    
    
    
    
    
    
    
    })