
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./contexts/AuthContext";
import Navigator from "./components/Navigator";

export default function App() {
  return (
    // Wrap the entire app in the AuthProvider component to make the auth context available to all components
    <AuthProvider>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}
