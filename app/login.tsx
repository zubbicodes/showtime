import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { Link } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const text = useColor('text');
  const textMuted = useColor('textMuted');
  const cardColor = useColor('card');
  const primary = useColor('primary');

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        paddingTop: 80,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: text,
          marginBottom: 8,
        }}
      >
        Welcome back
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: textMuted,
          marginBottom: 32,
        }}
      >
        Sign in to continue to Stage Show
      </Text>
      <View style={{ gap: 16, marginBottom: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 16,
            backgroundColor: cardColor,
            borderRadius: 12,
          }}
        >
          <Icon name={Mail} size={20} color={textMuted} />
          <Text style={{ flex: 1, fontSize: 16, color: text }}>
            Email address
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 16,
            backgroundColor: cardColor,
            borderRadius: 12,
          }}
        >
          <Icon name={Lock} size={20} color={textMuted} />
          <Text style={{ flex: 1, fontSize: 16, color: text }}>
            Password
          </Text>
        </View>
      </View>
      <Button size="lg" style={{ marginBottom: 16 }}>
        Sign in
      </Button>
      <Link href="/signup" asChild>
        <Button variant="outline">Create an account</Button>
      </Link>
    </View>
  );
}
