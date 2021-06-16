import React, { useState, useEffect } from 'react'
import {Text, View, StyleSheet, ScrollView, ImageBackground} from 'react-native'
import {Fab, Card, CardItem, Button, Right, Body, H2, H3} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/core'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';

import { resolver } from '../../AppUtilityFunctions/resolvers'
import LoadingView from '../UtilityComponents/LoadingView';
import bgImageEmpty from "../../AppAssets/EmptyList.jpg";

import * as k from '../../AppConstants/utilConsts';

const ListItemsUI=({ id, bgImage, navigation2, route})=>{

    const navigation = useNavigation()

    const [listItems, setListItems] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)


    const isFocused = useIsFocused()    // may break

    const getList = async()=>{
        setLoading(true)
        const {navlink, storeloc} = resolver(id.compList)
        console.log(navlink, storeloc)
        try{
            const storedList1 = await AsyncStorage.getItem(storeloc)
            if(!storedList1) 
                setListItems(null)
            const list = JSON.parse(storedList1)
            setListItems(list)            
            let tmpTotal = 0
            if(list){    
                list.map(item=>{
                    if(item.costType === k.unitCost)
                        tmpTotal += parseFloat(item.quantity) * parseFloat(item.cost)
                    else
                        tmpTotal += parseFloat(item.cost)
                })
            }
            setTotal(tmpTotal)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    const deleteItem = async(item)=>{
        setLoading(true)
        const {navlink, storeloc} = resolver(id.compList)
        try{
            const newList = listItems.filter((i)=>(item.uuid !== i.uuid))
            if(newList.length == 0){
                deleteList()
            }else{
                await AsyncStorage.setItem(storeloc, JSON.stringify(newList))
                setListItems(newList)
            }
        }catch(err){
            console.log(err)
        }
        setLoading(false)
        getList()
    }

    const deleteList = async()=>{
        setLoading(true)
        const {navlink, storeloc} = resolver(id.compList)
        setTotal(0)
        try{
            await AsyncStorage.removeItem(storeloc)
            setListItems(null)
        }catch(err){
            console.log(err)
        }
        setLoading(false)
        getList()
    }
    
    useEffect(()=>{getList()}, [isFocused])

    if(isLoading){
        return(<LoadingView/>)
    }

    if(!listItems){
        return(
            <ImageBackground source={bgImageEmpty} style={styles.bgImage} >
            <ScrollView contentContainerStyle={{flex: 1}}>
                <Card>
                    <CardItem>
                        <H2>Empty list</H2>                             
                    </CardItem>
                </Card>
                <Fab position="bottomRight" onPress={()=>navigation.navigate(id.compAdd)} style={{backgroundColor:'red'}}>
                    <Icon name={"plus"} active/>
                </Fab>
            </ScrollView>
            </ImageBackground>
        )
    }

  return(
    <View style={styles.view}>
        <ImageBackground source={bgImage} style={styles.bgImage} >
        <ScrollView>
            <Card style={{flex:1, flexDirection: 'row'}}>
                <H3 style={{margin: 10}}>Total: {total}</H3>
                <Right>
                <Button style={styles.emptyCartButton} onPress={deleteList}>
                    <Text style={{fontSize: 15, color: '#fff'}}>Empty List</Text>
                </Button>
                </Right>
            </Card>
            <Card>
                {listItems.map((item, index)=>(
                    <CardItem key={index}>
                        <Body style={styles.cardBody}>
                            <H3>{item.name}</H3>
                            {/* {console.log('in list', item)}  {console.log(item.expiry)}*/}
                            {/* <Text>{item.costType==k.unitCost? "unit ": "total "}cost: {item.cost}</Text> */}
                            {/* <Text>quantity: {item.quantity} </Text> */}
                            <Text>{item.costType==k.unitCost? "unit ": "total "}cost:{item.cost}  quantity:{item.quantity} </Text>
                            <Text>{item.anyExpiry===k.noExpiry ? "no expiry" : item.anyExpiry===k.expiryAsDate? "Expiry date: "+moment(item.expiry).format('DD/MM/YYYY') : "Expiry: "+item.expiry+" days"} </Text>
                        </Body>
                        <Right style={styles.cardRight}>
                            <Button danger style={styles.cardButton} onPress={()=>deleteItem(item)}>
                                <Icon name="trash" size={25} active/>
                            </Button>
                            <Button warning style={styles.cardButton} onPress={()=>navigation.navigate(id.compEdit, {item})}>
                                <Icon name="edit" size={25} active/>
                            </Button>
                        </Right>
                    </CardItem>
                ))}
            </Card>
        </ScrollView>
        </ImageBackground>
        <Fab position="bottomRight" onPress={()=>navigation.navigate(id.compAdd)} style={{backgroundColor:'red'}}>
            <Icon name={"plus"} active/>
        </Fab>
    </View>
  )
}

export default ListItemsUI

const styles = StyleSheet.create({
    view: { flex:1, },
    cardBody: {justifyContent: 'center', alignItems: 'flex-start'},
    cardRight: {flex:1, flexDirection:'row', justifyContent:'flex-end'},
    cardButton: {width:30, padding:3, margin:1},
    emptyCartButton: {backgroundColor:'red', justifyContent: 'center', padding: 4, height: 30, marginHorizontal: 10},
    bgImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
})