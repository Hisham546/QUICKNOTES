import React, { useEffect, useRef, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  View,
  Image,
  Text, Button, PermissionsAndroid,
  StyleSheet, TouchableOpacity, FlatList, ImageBackground,
  TextInput
}
  from "react-native";
import CardView from 'react-native-cardview';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
interface Note {
  type: number;  //setting the interface to specify the structure of data we  get
  Description: string;
  Heading: string;
}

export default function Home({ navigation }: { navigation: any }) {

  const [notes, setNotes] = useState<Note[]>([]);

  const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };


  useFocusEffect(
    React.useCallback(() => {
      async function getNotes() {
        await firestore().collection('notes').get().then((querySnapshot) => {
          const fetchedNotes: Note[] = []; // Create an empty array to hold the fetched notes
          querySnapshot.forEach(snapshot => {
            const data = snapshot.data();
            const noteData = data as Note;
            fetchedNotes.push(noteData); // Add the fetched noteData to the array
          });

          setNotes(fetchedNotes); // Set the state with the complete array of fetched notes
        });
      }
      getNotes()
    }, [])
  );






  return (

    <View style={styles.mainContainer}>
      <View style={styles.headingView}>
        <MaterialIcon name="feather" size={hp('3.20%')} color="black" style={{ marginLeft: wp('2') }} />
        <Text style={styles.headerText}> My  Notes</Text>
        <TouchableOpacity>
          {/*<Image
           style={styles.userLogo}
           source={image}
/>*/}
        </TouchableOpacity>
      </View>
      <View style={styles.firstView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={notes}
          style={{ backgroundColor: '#001524', height: hp('100'), width: wp('98.50'), marginLeft: wp('1') }}
          renderItem={({ item }) =>
            <>
              <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('WriteNote', { notes: item })} >
                <CardView
                  cornerRadius={5}
                  style={[styles.noteCard, { backgroundColor: (item?.type) === '1' ? 'white' : 'white' }]}>
                  <View  >
                    <View style={{ width: wp('20'), marginLeft: wp('29.5'), height: hp('3'), justifyContent: 'center', alignItems: 'center', backgroundColor: (item.type) === 'High Priority' ? '#FE0000' : (item.type) === 'Important' ? '#7A9D54' : '#D8D9DA', }}>
                      <Text style={{ fontSize: hp('1.20'), color: 'white' }}>{item.type}</Text>
                    </View>
                    <Text style={{ fontSize: hp('1.70'), letterSpacing: wp('.10%'), minWidth: wp('15'), marginTop: hp('2'), fontFamily: 'Manrope-Bold', color: 'black' }}>{item.Heading}</Text>
                    <Text style={{ fontSize: hp('1.70'), letterSpacing: wp('.10%'), minWidth: wp('15'), marginTop: hp('2'), fontFamily: 'Manrope-Regular', color: 'black' }}>{item.Description}</Text>
                  </View>
                </CardView>
              </TouchableOpacity>

            </>
          }

        />



        <View style={styles.secondView}>
          <TouchableOpacity activeOpacity={.9} style={styles.writeButton} onPress={() => navigation.navigate('WriteNote')}>
            <MaterialIcon name="feather" size={hp('3.20%')} color="white" />

          </TouchableOpacity>

        </View>


      </View>


    </View>




  )




}


const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#001524'

  },
  headingView: {
    backgroundColor: '#001524',
    width: wp('100'),
    height: hp('8'),
    //justifyContent:'space-evenly',
    flexDirection: 'row',
    alignItems: 'center'

  },
  firstView: {
    width: wp('98'),
    height: hp('92'),
    backgroundColor: 'white',
    justifyContent: 'flex-end'


  },
  secondView: {
    width: wp('100'),
    height: hp('8'),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#001524',

  },
  headerText: {
    color: 'white',
    fontFamily: 'Manrope-Bold',
    fontSize: hp('2.20'),
    marginLeft: wp('2')
  },
  userLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: wp(3)


  },

  item: {
    height: hp('27%'),
    width: wp(' 50%'),
    backgroundColor: 'orange',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 6,
    marginRight: wp('1'),
    marginLeft: wp('1%'),
    marginTop: hp('.80%'),
    marginBottom: hp('.50')
  },
  writeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#068FFF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: wp('5'),
    flexDirection: 'row',
    position: 'absolute',


  },

  noteCard: {
    height: hp('27%'),
    width: wp(' 50%'),
    // backgroundColor:'#f4f9ff',
    borderRadius: 8,

    // elevation: 6,
    //  borderWidth:wp('5'),
    //  borderColor:'black',
    marginRight: wp('1'),

    marginTop: hp('.80%'),
    marginBottom: hp('.50')
  },










})