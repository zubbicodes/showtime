import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { Ticket } from 'lucide-react-native';

export default function TicketsScreen() {
  const textMuted = useColor('textMuted');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(232, 197, 71, 0.15)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Icon name={Ticket} size={40} color="#E8C547" />
      </View>
      <Text variant="title" style={{ textAlign: 'center', marginBottom: 8 }}>
        My Tickets
      </Text>
      <Text
        variant="body"
        style={{ textAlign: 'center', color: textMuted, marginBottom: 24 }}
      >
        Your upcoming event tickets will appear here.
      </Text>
      <Button variant="outline">Browse events</Button>
    </View>
  );
}
