import React from 'react';
import { Icon } from '@/components/ui/icon';
import { useColor } from '@/hooks/useColor';
import { BOTTOM_NAV_HEIGHT } from '@/lib/design-tokens';
import { Tabs } from 'expo-router';
import {
  Calendar,
  Home,
  Search,
  ShoppingBag,
  User,
} from 'lucide-react-native';

export default function WebTabsLayout() {
  const primary = useColor('primary');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primary,
        tabBarStyle: { height: BOTTOM_NAV_HEIGHT },
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name={Home} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon name={Search} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='upcoming'
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <Icon name={Calendar} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='tickets'
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color }) => (
            <Icon name={ShoppingBag} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name={User} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
