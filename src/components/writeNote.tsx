import React, { useEffect, useRef, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  View,
  Image,
  Text, Modal,
  StyleSheet, TouchableOpacity,
  TextInput, Dimensions
}
  from "react-native";
import CardView from 'react-native-cardview';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Toast from "react-native-simple-toast";
import { Dropdown } from 'react-native-element-dropdown';

export default function WriteNote({ navigation, route }: { navigation: any, route: any }) {

  const usersCollection = firestore().collection('notes');

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [title, onChangeTitle] = React.useState('');
  const [note, onChangeNote] = React.useState('');

  const notesData = route.params?.data;
  const [deletePopup, setDeletePopup] = useState(false);
  const data = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Important', value: 'Important' },
    { label: 'High Priority', value: 'High Priority' },
  ];

  const [value, setValue] = useState<string>();

  const saveNotes = async () => {
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
          navigation.navigate('Home')
          Toast.show('Your note has been saved.', Toast.SHORT);

        });
    }
  }
  const deleteNotes = async (id: string) => {
    firestore()
      .collection('notes')
      .doc(id)
      .delete()
      .then(() => {
        navigation.navigate('Home')
        Toast.show('Your note has been deleted.', Toast.SHORT);
      });
  }


    ;

  return (

    <View style={styles.mainContainer}>
      <View style={styles.headingView}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Home')}>
          <MaterialIcon name={'arrow-left'} size={hp('3%')} color={'white'} style={{ marginLeft: wp('2') }} />
        </TouchableOpacity>
        {!notesData || (typeof notesData === 'object' && Object.keys(notesData).length === 0) ? (
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
        ) : null}
        <View>
          {!notesData || (typeof notesData === 'object' && Object.keys(notesData).length === 0) ? (
            <TouchableOpacity style={{
              width: wp('25'), height: hp('4.5'), borderRadius: 4,
              alignItems: 'center', justifyContent: 'center', marginRight: wp('5'), flexDirection: 'row'
            }} onPress={() => saveNotes()}>
              <Text style={{ color: 'white', fontSize: hp('1.45'), fontFamily: 'Manrope-Bold' }}>Save </Text>
              <MaterialIcon name={'content-save'} size={hp('2.20%')} color={'white'} style={{ marginLeft: wp('2') }} />
            </TouchableOpacity>
          ) :
            <TouchableOpacity style={{
              width: wp('25'), height: hp('4.5'), borderRadius: 4,
              alignItems: 'center', justifyContent: 'center', marginRight: wp('5'), flexDirection: 'row'
            }} onPress={() => setDeletePopup(true)}>
              <Text style={{ color: 'white', fontSize: hp('1.45'), fontFamily: 'Manrope-Bold' }}>Delete </Text>
              <MaterialIcon name={'delete-empty-outline'} size={hp('2.20%')} color={'white'} style={{ marginLeft: wp('2') }} />
            </TouchableOpacity>
          }
        </View>

      </View>
      {!notesData || (typeof notesData === 'object' && Object.keys(notesData).length === 0) ? (
        <TextInput
          style={styles.title}
          onChangeText={onChangeTitle}
          value={title}
          placeholderTextColor={'white'}
          placeholder={"Title"}
          multiline={true}
          textAlignVertical={'top'}
        />
      ) :
        <View style={styles.headingDataView}>
          <Text style={{ color: 'white', fontSize: hp('2.50'), fontFamily: 'Manrope-Bold', marginLeft: wp('3') }}>{notesData?.Heading} </Text>
        </View>
      }
      {!notesData || (typeof notesData === 'object' && Object.keys(notesData).length === 0) ? (
        <TextInput
          style={styles.input}
          onChangeText={onChangeNote}
          value={note}
          multiline={true}
          placeholderTextColor={'white'}
          placeholder={"write your note"}
          textAlignVertical={'top'}
        />
      ) :
        <View style={styles.descriptionDataView}>
          <Text style={{ color: 'white', fontSize: hp('2'), fontFamily: 'Manrope-regular' }}>{notesData?.Description} </Text>
        </View>
      }
      <Modal
        animationType="fade"
        transparent={true}
        visible={deletePopup}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headingTextView}>
              <Text style={styles.modalText}>Do you want to delete this note ?</Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={[styles.buttonClose]}
                onPress={() => setDeletePopup(!deletePopup)}>
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonClose]}
                onPress={() => deleteNotes(notesData.id)}>
                <Text style={styles.buttonTextStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    color: 'white',
    fontSize: hp('1.80%'),
    textAlign: 'justify',
    marginLeft: wp('2'),
  },
  title: {
    height: hp('7%'),
    width: wp('97%'),
    color: 'white',
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
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: hp('1.50'),
    color: 'white',
    fontFamily: 'Manrope-Medium'
  },
  headingDataView: {
    width: wp('100'),
    height: hp('5'),
    justifyContent: 'center',

  },
  descriptionDataView: {
    width: wp('100'),
    height: hp('60'),
    marginLeft: wp('2')


  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    width: wp('65'),
    height: hp('18'),
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headingTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('65'),
    height: hp('7'),

  },

  buttonClose: {
    width: wp('16'),
    height: hp('3.70'),
    backgroundColor: '#068FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.60')

  },
  modalText: {
    marginBottom: 10,
    fontSize: hp('1.70'),
    color: 'black'

  },
  buttonView: {
    width: wp('65'),
    height: hp('5'),
    marginTop: hp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-evenly",

  }

})