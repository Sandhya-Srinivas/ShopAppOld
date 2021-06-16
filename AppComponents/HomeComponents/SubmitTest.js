import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button, Item, } from 'native-base'
import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider"

const SubmitTest = ()=>{
    const { submitFirebase } = useAuth()

    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [issubmitpressed, setissubmitpressed] = useState(false)

    const handleSubmit = async()=>{
        setissubmitpressed(true)
        try {
            submitFirebase(name, comment)
            setName('')
            setComment('')
        } catch (error) {
            console.log(error)
        }
        setissubmitpressed(false)
    }

    return(
        <View>
            <Item>
                <Input placeholder="Name" onChangeText={(text)=>setName(text)} />      
            </Item>
            <Item>
                <Input placeholder="Comment" onChangeText={(text)=>setComment(text)} />
            </Item>
            <Item style={{justifyContent: 'center'}}>
                <Button disabled={issubmitpressed} style={styles.submitButton} onPress={handleSubmit}>
                    <Text>Submit</Text>  
                </Button>      
            </Item>
        </View>
    )
}
export default SubmitTest

const styles = StyleSheet.create({
    submitButton: {alignSelf: 'center', margin: 10, },
    signoutButton: {position: "absolute", right: 0, }
})