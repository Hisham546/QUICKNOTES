import React, { useEffect, useRef, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  View,
  Image,
  Text, Button, PermissionsAndroid,
  StyleSheet, TouchableOpacity, FlatList, ImageBackground,
  TextInput, Dimensions
}
  from "react-native";
import CardView from 'react-native-cardview';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Toast from "react-native-simple-toast";
import { Dropdown } from 'react-native-element-dropdown';

export default function WriteNote({ navigation }: { navigation: any }, { route }: { route: any }) {

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

  const save = async () => {
    if (title == '') {
      Toast.show('Write something first!.', Toast.LONG);

    } else {
      await firestore().collection('notes').doc()
        .set({
          type: value,
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






  return (

    <View style={styles.mainContainer}>
      <View style={styles.headingView}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Home')}>
          <MaterialIcon name={'arrow-left'} size={hp('3%')} color={'black'} style={{ marginLeft: wp('2') }} />
        </TouchableOpacity>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={{ backgroundColor: 'white' }}
          itemTextStyle={{ color: 'black', fontSize: hp('1.50') }}
          data={data}
          maxHeight={250}
          labelField="label"
          valueField="value"
          placeholder="Select type"
          value={value}
          onChange={item => {
            setValue(item.value);
          }}

        />
        <TouchableOpacity style={{
          width: wp('25'), height: hp('4.5'), borderRadius: 4,
          alignItems: 'center', justifyContent: 'center', marginRight: wp('5'), flexDirection: 'row'
        }} onPress={() => save()}>
          <Text style={{ color: 'black', fontSize: hp('1.45'), fontFamily: 'Manrope-Bold' }}>Save </Text>
          <MaterialIcon name={'content-save'} size={hp('2.20%')} color={'black'} style={{ marginLeft: wp('2') }} />
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

  mainContainer: {
    flex: 1,
    backgroundColor: 'white'

  },
  headingView: {
    backgroundColor: 'white',
    width: wp('100'),
    height: hp('8'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
  headerText: {
    color: 'black',
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
    height: hp('97%'),
    width: wp(' 97%'),
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 30,
    shadowRadius: 3,
    elevation: 6,
    marginRight: wp('1'),
    marginLeft: wp('1.5%'),
    marginTop: hp('1.5%'),
  },
  writeButton: {
    width: wp('35'),
    height: hp('6'),
    borderRadius: 25,
    backgroundColor: '#068FFF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: wp('5'),
    flexDirection: 'row'
  },
  firstView: {
    width: wp('100'),
    height: hp('80'),
  },
  secondView: {
    width: wp('100'),
    height: hp('12'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    height: hp('85%'),
    width: wp('97%'),
    color: 'black',
    fontSize: hp('1.80%'),
    textAlign: 'justify',
    marginLeft: wp('2'),
  },
  title: {
    height: hp('7%'),
    width: wp('97%'),
    color: 'black',
    fontSize: hp('1.80%'),
    marginLeft: wp('2'),

  },
  dropdown: {
    //  margin: 16,
    height: hp('4'),
    width: wp('30'),
  },
  placeholderStyle: {
    fontSize: hp('1.50'),
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: hp('1.50'),
    color: 'black',
    fontFamily: 'Manrope-Medium'
  },

})