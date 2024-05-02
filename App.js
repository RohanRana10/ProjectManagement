import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './screens/Splash';
import SignIn from './screens/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/Home';
import { PaperProvider } from 'react-native-paper';
import Profile from './screens/Profile';
import Project from './screens/Project';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AddProject from './screens/AddProject';
import AddTask from './screens/AddTask';
import Task from './screens/Task';
import AddSubTask from './screens/AddSubTask';
import PendingTasks from './screens/PendingTasks';
import TeamList from './screens/TeamList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarActiveTintColor: '#6237a0',
      tabBarStyle: { paddingBottom: 10, height: 55 } // Add bottom padding here
    }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard" size={20} color={color} />,
        }} />
      {/* <Tab.Screen name="CompletedTasks" component={Tasks}
        options={{
          tabBarLabel: 'Completed Tasks',
          tabBarIcon: ({ color }) => <MaterialIcons name="task-alt" size={20} color={color} />,
        }} /> */}
      <Tab.Screen name="AddProject" component={AddProject}
        options={{
          tabBarLabel: 'New Project',
          tabBarIcon: ({ color }) => <FontAwesome6 name="add" size={20} color={color} />,
        }} />
      <Tab.Screen name="PendingTasks" component={PendingTasks}
        options={{
          tabBarLabel: 'Pending Tasks',
          tabBarIcon: ({ color }) => <MaterialIcons name="pending-actions" size={20} color={color} />,
          tabBarBadge: 9,
        }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'My Profile',
        tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} />
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{
              headerShown: false
            }} />
            <Stack.Screen name='SignIn' component={SignIn} options={{
              headerShown: false
            }} />
            {/* <Stack.Screen name='Home' component={Home} options={{
              headerShown: false
            }} /> */}
            {/* <Stack.Screen name='Profile' component={Profile} options={{
              headerShown: false
            }} /> */}
            <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name='Project' component={Project} options={{ headerShown: false }} />
            <Stack.Screen name='AddTask' component={AddTask} options={{ headerShown: false }} />
            <Stack.Screen name='Task' component={Task} options={{ headerShown: false }} />
            <Stack.Screen name='AddSubTask' component={AddSubTask} options={{ headerShown: true }} />
            <Stack.Screen name='TeamList' component={TeamList} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});
