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
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export default function WriteNote ({navigation}: {navigation: any}){

const usersCollection = firestore().collection('notes');
const userRef = usersCollection.doc();

    const [title, onChangeTitle] = React.useState('');
    const [note, onChangeNote] = React.useState('');





    const save=()=> {
      firestore()
      .collection('notes')
      .doc()
      .set({
        Heading: title,
        Description: note,
      })
      .then(() => {
      console.log('added')
      });
      }
 









    return(

        <View style={styles.mainContainer}>
           <View style={styles.headingView}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
           <MaterialIcon name={'arrow-left'} size={hp('3%')} color={'black'} style={{marginLeft:wp('2')}}  />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> save()}>       
           <MaterialIcon name={'content-save'} size={hp('3%')} color={'black'} style={{marginRight:wp('15')}}  />  
           </TouchableOpacity>    
           </View>
           <TextInput
                   style={styles.title}
                   onChangeText={onChangeTitle}
                   value={title}
                   placeholderTextColor={'gray'}
                   placeholder={"Title"}
                   multiline={true}
                   textAlignVertical={'top'}
              />

          <TextInput
                   style={styles.input}
                   onChangeText={onChangeNote}
                   value={note}
                   multiline={true}
                   placeholderTextColor={'gray'}
                   placeholder={"write your note"}
                   textAlignVertical={'top'}
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
        height: hp('85%'),
        width: wp('97%'),
        color: 'black',
        fontSize: hp('1.80%'),
        textAlign:'justify',
        marginLeft:wp('2'),
        

    
    
      },
      title:{
        height: hp('7%'),
        width: wp('97%'),
        color: 'black',
        fontSize: hp('1.80%'),
        marginLeft:wp('2'),


      }
    
    
    
    
    
    
    
    
    
    
    })