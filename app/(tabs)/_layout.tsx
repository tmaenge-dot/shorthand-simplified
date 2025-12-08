import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          top: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recognize"
        options={{
          title: 'AI Learn',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="sparkles" color={color} />,
          tabBarBadge: '✨',
          tabBarBadgeStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].tint,
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen
        name="strokes"
        options={{
          title: 'Strokes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil.line" color={color} />,
        }}
      />
      <Tabs.Screen
        name="shortforms"
        options={{
          title: 'Shortforms',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.badge.checkmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="phrases"
        options={{
          title: 'Phrases',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.quote" color={color} />,
        }}
      />
      <Tabs.Screen
        name="qa"
        options={{
          title: 'Q&A',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="questionmark.circle.fill" color={color} />,
        }}
      />
      {/* Secondary Tabs - Hidden or Less Prominent */}
      <Tabs.Screen
        name="comparison"
        options={{
          href: null, // Hide from main tabs (accessible from strokes screen)
        }}
      />
      <Tabs.Screen
        name="professional-comparison"
        options={{
          href: null, // Hide from main tabs (accessible from strokes screen)
        }}
      />
      <Tabs.Screen
        name="intersections"
        options={{
          href: null, // Hide from main tabs
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          href: null, // Hide from main tabs
        }}
      />
      <Tabs.Screen
        name="extract"
        options={{
          href: null, // Hide from main tabs
        }}
      />
      <Tabs.Screen
        name="upload-strokes"
        options={{
          href: null, // Hide from main tabs
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tabs
        }}
      />
      <Tabs.Screen
        name="outlines"
        options={{
          title: 'Outlines',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
