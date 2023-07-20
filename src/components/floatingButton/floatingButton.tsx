import React, { useEffect,useRef,useState } from "react";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {
View,
Text,
StyleSheet,TouchableOpacity,FlatList,ImageBackground,
TextInput}
from "react-native";

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FloatingAction } from "react-native-floating-action";
export default function FloatingButton({navigation}: {navigation: any}){


}

const styles = StyleSheet.create({

    writeButton:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:'#068FFF',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginRight:wp('5'),
        flexDirection:'row',
        position: 'absolute',                                          
       // bottom: 10,                                                    
        //right: 10,
      },

      
    })