import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, ActivityIndicator } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import CardsScreen from './src/screens/CardsScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import MoreScreen from './src/screens/MoreScreen';

import { initializeStorage } from './src/utils/storage';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      try {
        await initializeStorage();
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsReady(true);
      }
    };
    loadApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <ActivityIndicator size="large" color="#00D9A3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#2a2a2a',
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: '#00D9A3',
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: 4,
            fontWeight: '500',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'HOME',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Cards"
          component={CardsScreen}
          options={{
            tabBarLabel: 'CARDS',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="credit-card" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarLabel: 'REWARDS',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="star" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarLabel: 'MORE',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="menu" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
