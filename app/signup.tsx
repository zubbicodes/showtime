import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { Mail, Lock, User } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function SignupScreen() {
  const text = useColor('text');
  const textMuted = useColor('textMuted');
  const cardColor = useColor('card');

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
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
        Create account
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: textMuted,
          marginBottom: 32,
        }}
      >
        Join Stage Show to book events and get updates
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
          <Icon name={User} size={20} color={textMuted} />
          <Text style={{ flex: 1, fontSize: 16, color: text }}>
            Full name
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
        Create account
      </Button>
      <Link href="/login" asChild>
        <Button variant="outline">Already have an account? Sign in</Button>
      </Link>
    </View>
  );
}
