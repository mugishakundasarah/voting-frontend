import { View,Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import colors from '../utils/colors'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BaseUrl } from '../utils/BaseUrl'
import { useState } from 'react'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import { ShowToast } from '../components/Toast'

const RegisterCandidate = ({navigation}) => {
    const [loading,setLoading] = useState(false)

    const GENDEROPTIONS = [
        {label: "male", value: "male"},
        {label: "female", value: "female"},

    ]
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        nationalId: Yup.string().required('National ID is required'),
        missionStatement: Yup.string().required('Mission Statement is required'),
      });
      
    const formik = useFormik({
        initialValues: {
            name: '',
            nationalId: '',
            gender: '',
            missionStatement: ""
          },
        validationSchema,
        onSubmit: async (values, {resetForm}) => {
            if (!values || !validationSchema.isValidSync(values)) {
                ShowToast("Error: Please fill all fields")
                return;
            }
            try {
                setLoading(true)
                let url = `${BaseUrl}/candidates`
                const res = await axios.post(url, values)
                if(res.status === 201){
                    ShowToast("Candidate added successful")
                    resetForm()
                    navigation.navigate('Candidates')
                    setLoading(false)
                }
                else{
                    setLoading(false)
                    ShowToast("Error " + res.data.message)
                }
            } catch (error) {
                console.log(error)
                ShowToast("Error " + error?.response?.data?.error || error?.message)
                setLoading(false) 
            }
        }
    })

    return (
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Names"
                  style={styles.input}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <Text style={styles.error}>{formik.errors.name}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                  placeholder="National ID"
                  style={styles.input}
                  onChangeText={formik.handleChange('nationalId')}
                  onBlur={formik.handleBlur('nationalId')}
                  value={formik.values.nationalId}
                />
                {formik.touched.nationalId && formik.errors.nationalId && (
                  <Text style={styles.error}>{formik.errors.nationalId}</Text>
                )}
            </View>
            <View style={{marginVertical: 20}}>
                <Picker
                    selectedValue = {formik.values.gender}
                    onValueChange = {formik.handleChange('gender')}
                >
                {GENDEROPTIONS.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                </Picker>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                multiline
                numberOfLines={8} // Adjust the number of lines as needed
                placeholder="Mission statement "
                style={styles.textArea}
                onChangeText={formik.handleChange('missionStatement')}
                onBlur={formik.handleBlur('missionStatement')}
                value={formik.values.missionStatement}
              />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => formik.handleSubmit()} disabled={loading}>
                      {loading ? (
                          <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Register Candidate</Text>
                        )}
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    logo: {
        color: colors.mainColor,
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
    },
    logoContainer: {
        marginTop: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },  
    input: {
        borderColor: colors.darkGray,
        backgroundColor: colors.lightGray,
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        wordWrap: 'break-word',
        borderRadius: 5,
        borderWidth: 1,
        padding: '3%',
    },
    textArea: {
        backgroundColor: colors.lightGray,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    form: {
        marginTop: 60,
        marginHorizontal: '5%',
    },
    button: {
        backgroundColor: colors.mainColor,
        padding: '4%',
        borderRadius: 40,
        marginTop: 40,
    },
    buttonText: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
    },
    error: {
        color: colors.red
    },
    haveAnAccount: {
        color: colors.darkerGray,
        textAlign: "center",
        marginTop: 20,
    },
    formTextRegister: {
        color: colors.mainColor,
    }
})

export default RegisterCandidate