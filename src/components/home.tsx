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
import { useFocusEffect } from '@react-navigation/native';

interface Note {  //setting the interface to specify the structure of data we gonna get
  Description: string;
  Heading: string;
}
export default function Home({navigation}: {navigation: any}){

const [notes,setNotes]=useState<Note[]>([]);


const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};


useFocusEffect(
  React.useCallback(() => {
  
  firebase.firestore().collection('notes').get().then((querySnapshot) => {
    querySnapshot.forEach(snapshot => {
        let data = snapshot.data();
         console.log(data)
        const noteData = data as Note; // Cast DocumentData to the Note type
        setNotes(prevNotes => [...prevNotes,noteData]);
    })
})
}, [])
);

console.log(notes);


return(

    <View style={styles.mainContainer}>
    <View style={styles.headingView}>
    <Text style={styles.headerText}> My  Notes</Text>
    <TouchableOpacity>
    <Image
        style={styles.userLogo}
        source={image}
      />
                  </TouchableOpacity>
    </View>
    <View style={styles.firstView}>
    <FlatList
             showsVerticalScrollIndicator={false}
             numColumns={2}
             data={notes || []}
             style={{backgroundColor:'white',width:wp('99')}}
             renderItem={({item}) =>
           <>
           <CardView
          cornerRadius={5}
             style={styles.noteCard}>
              <TouchableOpacity activeOpacity={1} >
        
               <Text style={{fontSize:hp('1.70'),letterSpacing:wp('.10%'),minWidth:wp('15'),marginTop:hp('2'),fontWeight:'400',color:'black'}}>{item.Description}</Text>
                </TouchableOpacity>
           </CardView>

         </>
              }

          />
</View>
<View style={styles.secondView}>
           
           <TouchableOpacity activeOpacity={.9} style={styles.writeButton} onPress={() => navigation.navigate('WriteNote')} >       
              <MaterialIcon name="pencil-outline" size={hp('3.20%')} color="white"  />
              <Text style={{color:'white',fontSize:hp('1.80')}}> Create</Text>
           </TouchableOpacity>
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
  noteCard: {
    height : hp('27%'),
    width : wp(' 50%'),
    backgroundColor:'white',
    borderRadius:8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 6,
    marginRight:wp('1'),

    marginTop:hp('.80%'),
    marginBottom:hp('.50')
 },










})