import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext, useEffect } from "react"
import { View, StatusBar } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import * as SecureStore from "expo-secure-store"

import { AuthContext } from "../contexts/AuthContext"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Signout from "../screens/Signout"
import Candidates from "../screens/Candidates"
import { HomeStack } from "../stacks"

const Navigator = () => {
    return(
    <>
        <StatusBar hidden={true}/>
        <AppNavigator/>
    </> )
}

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const Tabs = createBottomTabNavigator()

const AppNavigator = () => {
    // get auth context
    const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync('token')
            if(token){
                setIsAuthenticated(true)
            }
        }
        getToken()
    }, [])

    // if not authenticated redirect to login 
    if(!isAuthenticated) return <AuthNavigator/>

    return (
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown:false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    marginHorizontal: 5,
                    position: 'absolute',
                    borderColor: 'white',
                    height: "8%"
                },
                topBarButton: (props) => {
                    return (
                        <View {...props}>
                            <View 
                                style={{
                                    minWidth: 50,
                                    minHeight: 50,
                                    borderRadius: 10,
                                    backgroundColor: props.accessibilityState.selected
                                        ? '#f7941d'
                                        : 'white',
                                }}
                            >
                                <TouchableOpacity {...props}/>
                            </View>
                        </View>
                    )
                },
                topBarShowLabel: false, 
                topBarActiveTintColor: '#f7941d'
            }}
        >
            <Tabs.Screen
                name="Dashboard"
                component={HomeStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon 
                            name="home" 
                            size={35}
                            color={color}
                        />
                    ),
                    tabBarShowLabel: false 
                }}  
            />
            <Tabs.Screen
                name="Candidates"
                component={Candidates}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon 
                            name="account-group"
                            size={35}
                            color={color}
                        />
                    ),
                    tabBarShowLabel: false 
                }}
            />
            <Tabs.Screen
                name="Signout"
                component={Signout}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon  
                            name="logout" 
                            size={25}
                            color={color}
                        />
                    ),
                    tabBarShowLabel: false 
                }}
            />
        </Tabs.Navigator>
    )
}
export default Navigator