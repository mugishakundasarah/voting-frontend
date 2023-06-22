import { createStackNavigator } from "@react-navigation/stack";
import RegisterCandidate from "../screens/RegisterCandidate";
import AdminHome from "../screens/AdminHome";
import colors from "../utils/colors";
const Stack = createStackNavigator()

const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={AdminHome} />
            <Stack.Screen name="RegisterCandidate" component={RegisterCandidate} options={{headerShown: true, headerTintColor: colors.mainColor, headerTitle: "Register Candidate", headerTitleStyle: {fontSize: 17}}}/>
        </Stack.Navigator>
    )
}

export {
    HomeStack
}