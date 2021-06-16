import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Item } from 'native-base'
import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider";

const Signout = ({navigation, route})=>{
    const { signOutFunc } = useAuth()
    const [issignoutpressed, setissignoutpressed] = useState(false)
    
    const handleSignout = async()=>{
        console.log('Pressed')
        setissignoutpressed(true)
        try {
            await signOutFunc()       
        } catch (error) {
            console.log(error)
        }
        setissignoutpressed(false)
    }

    return(
        <View>            
            <Item>          
                <Button disabled={issignoutpressed} style={styles.signoutButton} onPress={handleSignout}>
                    <Text>Signout</Text>
                </Button>
            </Item>
        </View>
    )
}
export default Signout

const styles = StyleSheet.create({
    // signoutButton: {position: "absolute", right: 0, }
    signoutButton: {alignSelf: 'center', backgroundColor: 'red', height: 35}
})