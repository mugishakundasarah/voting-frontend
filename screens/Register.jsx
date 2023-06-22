import { View,Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../utils/colors'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BaseUrl } from '../utils/BaseUrl'
import { useState } from 'react'
import axios from 'axios'

const Register = ({navigation}) => {
    const [loading,setLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        nationalId: Yup.string().required('National ID is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
    });
      
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            nationalId: '',
            password: '',
            confirmPassword: '',
          },
        validationSchema,
        onSubmit: async (values, {resetForm, setStatus}) => {
            if (!values || !validationSchema.isValidSync(values)) {
                // ShowToast("Error: Please fill all fields")
                return;
            }
            try {
                setLoading(true)
                let url = `${BaseUrl}/auth/signup`
                const res = await axios.post(url, values)
                if(res.status === 201){
                    // ShowToast("Registration successful")
                    resetForm()
                    navigation.navigate('Login')
                    setLoading(false)
                }
                else{
                    setLoading(false)
                    // ShowToast("Error " + res.data.message)
                }
            } catch (error) {
                console.log(error)
                // ShowToast("Error " + error.message)
                setLoading(false) 
            }
        }
    })

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>E-VOTE</Text>
                    <Text style={{color: colors.mainColor, textAlign: "center", marginTop: 10}}>say yes to free and fair election!</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="Name"
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
                            style={styles.input}
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            placeholder='Email'
                            onBlur={formik.handleBlur('email')}
                            autoCapitalize='none'
                        />
                        {formik.touched.email && formik.errors.email && (
                          <Text style={styles.error}>{formik.errors.email}</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="Phone"
                          style={styles.input}
                          onChangeText={formik.handleChange('phone')}
                          onBlur={formik.handleBlur('phone')}
                          value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <Text style={styles.error}>{formik.errors.phone}</Text>
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
                    <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="Password"
                          style={styles.input}
                          onChangeText={formik.handleChange('password')}
                          onBlur={formik.handleBlur('password')}
                          value={formik.values.password}
                          secureTextEntry
                        />
                        {formik.touched.password && formik.errors.password && (
                          <Text style={styles.error}>{formik.errors.password}</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm Password"
                          onChangeText={formik.handleChange('confirmPassword')}
                          onBlur={formik.handleBlur('confirmPassword')}
                          value={formik.values.confirmPassword}
                          secureTextEntry
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                          <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit} disabled={loading}>
                              {loading ? (
                                  <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text style={styles.buttonText}>Register</Text>
                                )}
                        </TouchableOpacity>
                        <Text style={styles.haveAnAccount}>
                            Don&apos;t have an account?{' '}
                            <Text
                                style={styles.formTextRegister}
                                onPress={() => {
                                    navigation.navigate('Login');
                                }}
                            >
                                Log in
                            </Text>
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
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
export default Register