import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {resolver} from './resolvers';

export const editItem = async(item)=>{

  // console.log(item.id.compList, "in edit actions")
  const { navlink, storeloc } = resolver(item.id.compList)
  // console.log(navlink, storeloc)

  // console.log('in edit actions ', item.costType)
  if(!item.itemName || !item.cost || !item.quantity){
    return Snackbar.show({
      text: 'Please fill all fields',
      duration: Snackbar.LENGTH_SHORT
    })
  }
  try{
    if(!parseFloat(item.cost) || !parseFloat(item.quantity)){
      return Snackbar.show({
        text: 'Cost and quantity should be numbers',
        duration: Snackbar.LENGTH_SHORT
      })
    }
    const storedList1 = await AsyncStorage.getItem(storeloc)
    const storedList = JSON.parse(storedList1)
    const newList = storedList.map(i=>{
        if(i.uuid === item.uuid){
            i.name = item.itemName
            i.cost = item.cost
            i.quantity = item.quantity
            i.costType = item.costType
            i.expiry = item.expiry
            i.anyExpiry = item.anyExpiry
        }
        return i
    })
    // console.log("edit actions...", newList)
    await AsyncStorage.setItem(storeloc, JSON.stringify(newList))
    item.navigation.navigate("Home") // should change this
  }catch(err){
    console.log(err)
  }
}


    