import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

import colors from '../utils/colors'

const ViewCandidate = ({handleNavigate, candidate}) => {
    console.log(candidate)
    return (
        <TouchableOpacity style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: colors.darkGray}}>

            </View>
            <View style={{width: 280}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontWeight: "bold"}}>{candidate.name}</Text>
                    <Text>{candidate.gender}</Text>
                </View>
                <Text style={{marginTop: 10}}>{candidate.missionStatement}</Text>
            </View>
        </TouchableOpacity>
      )
}


export default ViewCandidate