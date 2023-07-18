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

    const [text, onChangeText] = React.useState('');


    return(

        <View style={styles.mainContainer}>
           <View style={styles.headingView}>
           <MaterialIcon name={'arrow-left'} size={hp('3%')} color={'black'}   />
           <MaterialIcon name={'content-save'} size={hp('3%')} color={'black'}   />      
           </View>

          <TextInput
                   style={styles.input}
                   onChangeText={onChangeText}
                   value={text}
                   placeholderTextColor={'gray'}
                   placeholder={"write your note"}

              />
    
    
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
         height : hp('97%'),
         width : wp(' 97%'),
         backgroundColor:'white',
         borderRadius:8,
         shadowColor: '#000000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 30,
         shadowRadius: 3,
         elevation: 6,
         marginRight:wp('1'),
         marginLeft: wp('1.5%'),
         marginTop:hp('1.5%'),
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
      input:{
        height: hp('17%'),
        width: wp('97%'),
        color: 'black',
        fontSize: hp('1.80%'),
        paddingLeft: wp('2%'),
        marginLeft:wp('3'),

    
    
      },
    
    
    
    
    
    
    
    
    
    
    })