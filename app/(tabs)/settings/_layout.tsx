import { Stack } from 'expo-router';
import { useColor } from '@/hooks/useColor';
import { Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { isLiquidGlassAvailable } from 'expo-glass-effect';

export default function SettingsLayout() {
  const text = useColor('text');
  const background = useColor('background');

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerTintColor: text,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : 'systemMaterialDark',
        headerStyle: {
          backgroundColor: isLiquidGlassAvailable()
            ? 'transparent'
            : background,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Profile',
          headerTitle: () =>
            Platform.OS === 'android' ? (
              <Text variant='heading'>Profile</Text>
            ) : undefined,
        }}
      />
    </Stack>
  );
}
