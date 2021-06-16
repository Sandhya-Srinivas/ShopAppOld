import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Button, Text, Right, Item, Card, CardItem } from 'native-base'


import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider"
// import LoginG from '../AuthComponents/LoginG';
import Signout from '../AuthComponents/Signout';
import SubmitTest from './SubmitTest';
import StockList from '../StockComponents/StockList';
import WishlistList from '../WishlistComponents/WishlistList'
import CartList from '../CartComponents/CartList'
import homoLogoImage from "../../AppAssets/Logo2d3.jpg";


const Home = ({navigation, route})=>{
    const { user } = useAuth()
    const [viewItem, setViewItem] = useState(0)
    const tabColors = ['#fa2525', '#fea577', '#fea577']
    const [tab1, setTab1] = useState(tabColors[0])
    const [tab2, setTab2] = useState(tabColors[1])
    const [tab3, setTab3] = useState(tabColors[2])

    const tabPress = (i)=>{
        setTab1(tabColors[(3+i)%3])
        setTab2(tabColors[(2+i)%3])
        setTab3(tabColors[(1+i)%3])
        setViewItem(i)
    }

    if(user){
        return(
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Item>
                    <Text style={styles.textWelcome} >Welcome {user.email}</Text>   
                    <Right><Signout/></Right>            
                </Item>
                <View style={styles.viewTab}>
                <TouchableOpacity style={[styles.touchOp, {backgroundColor: tab1}]} onPress={()=>tabPress(0)}><Text style={styles.textTab}>Cart</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.touchOp, {backgroundColor: tab2}]} onPress={()=>tabPress(1)}><Text style={styles.textTab}>Wishlist</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.touchOp, {backgroundColor: tab3}]} onPress={()=>tabPress(2)}><Text style={styles.textTab}>Stock</Text></TouchableOpacity>                
                </View>
                <View style={{flex: 1}}>
                    {viewItem==0? 
                        (<CartList navigation={navigation} route={route} />) : 
                        (viewItem==1? 
                            (<WishlistList navigation={navigation} route={route} />) 
                            : (<StockList navigation={navigation} route={route} />))
                    }
                </View>
                
            </View>
        )
    }
    return(
        <ImageBackground source={homoLogoImage} style={styles.bgImage} >
            <View style={styles.viewSigning}>            
            {/* <LoginG /> */}
            <Button style={styles.button} onPress={()=>navigation.navigate('SignupEP')}><Text>Signup</Text></Button>
            <Button style={styles.button} onPress={()=>navigation.navigate('SigninEP')}><Text>Signin</Text></Button>
            </View>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    button: { alignSelf: 'center', margin: 10, backgroundColor:'#b81802', marginHorizontal: "10%" },
    touchOp: {width:'33%', padding: '1%', alignItems: 'center', justifyContent: 'center', borderColor: '#fbc4a6', borderWidth: 1, borderRadius: 0  },
    textTab: { color: 'white', fontSize: 22, },
    viewSigning: { position: 'absolute', width: '100%', bottom: "5%", flexDirection:'row', justifyContent: 'center'},
    viewTab: { flexDirection: 'row', backgroundColor: '#fbc4a6', alignItems: 'center', justifyContent: 'center', },
    textWelcome: { fontSize: 15,  alignSelf: 'center', },
    bgImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
})