
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import 'react-native-get-random-values'
import {nanoid} from 'nanoid';

import { resolver } from './resolvers';

export const addItem = async({itemName, cost, costType, anyExpiry, expiry, quantity, navigation, id})=>{

  const { navlink, storeloc } = resolver(id.compList)
  // console.log(navlink, storeloc)

  if(!itemName || !cost || !quantity){
    return Snackbar.show({
      text: 'Please fill all fields',
      duration: Snackbar.LENGTH_SHORT
    })
  }
  try{
    if(!parseFloat(cost) || !parseFloat(quantity)){
      return Snackbar.show({
        text: 'Cost and quantity should be numbers',
        duration: Snackbar.LENGTH_SHORT
      })
    }
    const item = {
      uuid: nanoid(),
      name: itemName,
      cost: cost,
      quantity: quantity,
      costType: costType,
      anyExpiry: anyExpiry,
      expiry: expiry
    }
    const storedList1 = await AsyncStorage.getItem(storeloc)
    if(!storedList1){
      const newList = [item]
      await AsyncStorage.setItem(storeloc, JSON.stringify(newList))
    }else{
      const storedList = JSON.parse(storedList1)
      storedList.push(item)
      await AsyncStorage.setItem(storeloc, JSON.stringify(storedList))
    }
    navigation.navigate("Home") // should change this
  }catch(err){
    console.log(err)
  }
}