import { View,Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as SecureStore from "expo-secure-store"
import colors from '../utils/colors'
import { useFormik } from 'formik'
import * as Yup from 'yup'  
import { useContext, useState } from 'react'
import {ShowToast} from '../components/Toast'
import { BaseUrl } from '../utils/BaseUrl'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'



const Login = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const { setIsAuthenticated } = useContext(AuthContext);
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
      });
      
    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema,
        onSubmit: async(values, {resetForm}) => {
            setLoading(true)
            if(!values.email || !values.password){
                ShowToast("Error: Please fill all fields");
                setLoading(false);
                return;
            }

            try {
                let url = `${BaseUrl}/auth/signin`
                const res = await axios.post(url,
                {
                    email: values.email,
                    password: values.password,
                })
                if(res.status === 200){
                    setIsAuthenticated(true)
                    setLoading(false);
                    resetForm()
                    await SecureStore.setItemAsync("token", res.data.token)
                    await SecureStore.setItemAsync("user", JSON.stringify(res.data.user))
                    ShowToast("Success: Login successful")
                    navigation.navigate('Home')
                }
                else{
                    setLoading(false)
                    ShowToast("Error: " + res.data.message)
                }
            } catch (error) {
                console.log(error)
                ShowToast("Error: " + error.message)
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
                {/* Each view has an input component and each component has validation */}
                <View style={styles.form}>
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
                            style={styles.input}
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            placeholder='Password'
                            autoCapitalize='none'
                        />
                        {formik.touched.password && formik.errors.password && (
                          <Text style={styles.error}>{formik.errors.password}</Text>
                        )}
                    </View>
                    <Text style={{color: colors.mainColor, fontWeight: "bold", textAlign: "right"}}>Forgot your password?</Text>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                            {loading ? (
                            <ActivityIndicator color="#ffffff" />
                          ) : (
                            <Text style={styles.buttonText}>Log In</Text>
                          )}
                        </TouchableOpacity>
                        <Text style={styles.dontHaveAccount}>
                            Don&apos;t have an account?{' '}
                            <Text
                                style={styles.formTextRegister}
                                onPress={() => {
                                    navigation.navigate('Register');
                                }}
                            >
                                Register
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
        marginTop: 100,
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
        marginTop: 90,
        marginHorizontal: '5%',
    },
    button: {
        backgroundColor: colors.mainColor,
        padding: '4%',
        borderRadius: 40,
        marginTop: 60,
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
    dontHaveAccount: {
        color: colors.darkerGray,
        paddingVertical: "3%",
        textAlign: "center",
    },
    formTextRegister: {
        color: colors.mainColor,
    }
})
export default Login