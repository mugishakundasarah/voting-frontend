import { ActivityIndicator, StyleSheet } from "react-native"
import { View, TextInput, Text, TouchableOpacity } from "react-native"
import colors from "../utils/colors"
import { SIZES } from "../utils/sizes"
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseUrl } from "../utils/BaseUrl"
import * as SecureStore from "expo-secure-store"
import ViewCandidate from "./ViewCandidate"

const AdminHome = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [candidates, setCandidates] = useState(null)

    useEffect(() => {
      async function fetchCandidates() {
        try{
          setIsLoading(true)
          let token = await SecureStore.getItemAsync('token')
          let response = await axios.get(`${BaseUrl}/candidates`, { headers: { 'Authorization': `Bearer ${token}` } })
          setCandidates(response.data)
          setIsLoading(false)
        }catch(error){
          setError(true)
          setIsLoading(false)
          console.log(error)
        }
      }

      fetchCandidates()
    }, [])
    return (
        <View style={styles.container}>
            <View style={{display: "flex", flexDirection: "row", marginTop: 40}}>
                <Text style={{color: colors.mainColor, fontWeight: "bold", fontSize: 25}}>Welcome</Text>
                <Text style={{fontWeight: "bold", fontSize: 25, marginLeft: 10}}>John!</Text>
            </View>
            <TextInput
              placeholder="Search candidates"
              style={styles.input}
            //   onChangeText={formik.handleChange('name')}
            //   onBlur={formik.handleBlur('name')}
            //   value={formik.values.name}
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterCandidate")}>
                <Text style={styles.buttonText}>Add candidate</Text>
            </TouchableOpacity>

            <View style={styles.candidateListContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>All candidates </Text>
                <TouchableOpacity>
                  <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cardsContainer}>
                { isLoading? (<ActivityIndicator size={"large"} color={colors.mainColor}/>
                ) : error ? (
                  <Text>Something went wrong</Text> ) : 
                  candidates?.map((candidate) => (
                    <ViewCandidate 
                      candidate = {candidate}
                    />
                  ))
              }        
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "5%",
        display: "flex"
    },  
    input: {
        borderColor: colors.darkGray,
        backgroundColor: colors.lightGray,
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        wordWrap: 'break-word',
        borderRadius: 20,
        borderWidth: 1,
        paddingVertical: '3%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    button: {
        backgroundColor: colors.mainColor,
        padding: '4%',
        borderRadius: 40,
        marginTop: 30,
        width: "50%",
        alignSelf: "flex-end"
    },
    buttonText: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
    },
    candidateListContainer: {
        marginTop: SIZES.xLarge,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: SIZES.small,
    },
    headerTitle: {
      fontSize: SIZES.medium,
      color: colors.mainColor,
    },
    headerBtn: {
      fontSize: SIZES.medium,
      color: colors.darkGray,
    },
    cardsContainer: {
      marginTop: SIZES.medium,
      gap: SIZES.small,
    },
})

export default AdminHome