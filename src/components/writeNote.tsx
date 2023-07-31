import React, { useEffect,useRef,useState } from "react";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {
View,
Image,
Text,Button,PermissionsAndroid,
StyleSheet,TouchableOpacity,FlatList,ImageBackground,
TextInput,Dimensions}
from "react-native";
import CardView from 'react-native-cardview';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Toast from "react-native-simple-toast";
import { Dropdown } from 'react-native-element-dropdown';

export default function WriteNote ({navigation}: {navigation: any},{route}:{route:any}){

     const usersCollection = firestore().collection('notes');

   const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [title, onChangeTitle] = React.useState('');
    const [note, onChangeNote] = React.useState('');

   // const notesData =route.params ? route.params.notes : null;
//console.log(notesData)
const data = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Important', value: 'Important' },
    { label: 'High Priority', value: 'High Priority' },
  ];

  const [value, setValue] = useState<string>();

    const save= async()=> {
       if(note == ''){
           Toast.show('Write something first!.', Toast.LONG);

        }else{
      await firestore().collection('notes').doc()
         .set({
           type:value,
           Heading: title,
           Description: note,
      })
      .then(() => {
              Toast.show('Your note has been saved.', Toast.SHORT);
       // console.log('Your note has been saved.');
        //console.log('added');
      });
     }
      }
 

//       function delay(ms: number | undefined) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//       }
//
//       // This is an async function that does something asynchronously (bakes a cake in our example).
//       async function bakeCake() {
//         console.log("Putting the cake in the oven...");
//
//         // This line waits for 2 seconds (the cake is baking).
//         await delay(2000);
//
//         console.log("Cake is ready!");
//       }
//
//
//    const test=() => {
//
//     console.log("Start baking process!");
//     bakeCake(); // This starts the async process but doesn't wait for it to finish.
//     console.log("Doing other things..."); // While the cake is baking, we can do other tasks.
//
//    }
//






    return(

        <View style={styles.mainContainer}>
           <View style={styles.headingView}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
           <MaterialIcon name={'arrow-left'} size={hp('3%')} color={'black'} style={{marginLeft:wp('2')}}  />
           </TouchableOpacity>
  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select type"
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}

                  />
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

  },
   dropdown: {
        margin: 16,
        height:hp('10'),
        width:wp('50'),
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: hp('1.60'),
      },
      iconStyle: {
        width: 20,
        height: 20,
      },

  })