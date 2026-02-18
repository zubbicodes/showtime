import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { PROFILE_IMAGE_URL } from '@/lib/avatars';
import { SCREEN_PADDING_H, SCREEN_PADDING_TOP } from '@/lib/design-tokens';
import {
  Bell,
  ChevronRight,
  HelpCircle,
  Mail,
  Phone,
  Shield,
  User,
} from 'lucide-react-native';
import { Image, Pressable } from 'react-native';

const SETTINGS_PADDING_V = 12;
const SECTION_HEADER_FONT = 13;
const ROW_HEIGHT = 52;

function SettingsRow({
  icon: IconComp,
  label,
  value,
  onPress,
}: {
  icon: typeof User;
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  const text = useColor('text');
  const textMuted = useColor('textMuted');
  const cardColor = useColor('card');
  const border = useColor('border');

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: ROW_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: cardColor,
        borderBottomWidth: 1,
        borderBottomColor: border,
        gap: 12,
      }}
    >
      <Icon name={IconComp} size={20} color={textMuted} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: text, fontWeight: '500' }}>
          {label}
        </Text>
        {value != null && (
          <Text
            style={{ fontSize: 13, color: textMuted, marginTop: 2 }}
            numberOfLines={1}
          >
            {value}
          </Text>
        )}
      </View>
      {onPress && (
        <Icon name={ChevronRight} size={20} color={textMuted} />
      )}
    </Pressable>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const textMuted = useColor('textMuted');

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: SECTION_HEADER_FONT,
          fontWeight: '600',
          color: textMuted,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 8,
          paddingHorizontal: SCREEN_PADDING_H,
        }}
      >
        {title}
      </Text>
      <View style={{ borderRadius: 12, overflow: 'hidden', marginHorizontal: SCREEN_PADDING_H }}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const background = useColor('background');
  const cardColor = useColor('card');
  const primary = useColor('primary');
  const primaryFg = useColor('primaryForeground');
  const text = useColor('text');
  const textMuted = useColor('textMuted');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: background }}
      contentContainerStyle={{
        paddingTop: SCREEN_PADDING_TOP,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile header */}
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 24,
          paddingHorizontal: SCREEN_PADDING_H,
          marginBottom: 8,
        }}
      >
        <Image
          source={{ uri: PROFILE_IMAGE_URL }}
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            marginBottom: 16,
          }}
        />
        <Text style={{ fontSize: 22, fontWeight: '700', color: text }}>
          Christian Johnson
        </Text>
        <Text
          style={{ fontSize: 15, color: textMuted, marginTop: 4 }}
          numberOfLines={1}
        >
          christian.johnson@example.com
        </Text>
        <Pressable
          style={{
            marginTop: 16,
            paddingVertical: 10,
            paddingHorizontal: 24,
            borderRadius: 12,
            backgroundColor: cardColor,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: text }}>
            Edit profile
          </Text>
        </Pressable>
      </View>

      {/* Account */}
      <SettingsSection title="Account">
        <SettingsRow
          icon={User}
          label="Personal information"
          value="Name, date of birth"
          onPress={() => {}}
        />
        <SettingsRow
          icon={Mail}
          label="Email"
          value="christian.johnson@example.com"
          onPress={() => {}}
        />
        <SettingsRow
          icon={Phone}
          label="Phone number"
          value="+44 7700 900000"
          onPress={() => {}}
        />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications">
        <SettingsRow
          icon={Bell}
          label="Push notifications"
          value="On"
          onPress={() => {}}
        />
        <SettingsRow
          icon={Mail}
          label="Email updates"
          value="Events & offers"
          onPress={() => {}}
        />
      </SettingsSection>

      {/* Preferences */}
      <SettingsSection title="Preferences">
        <SettingsRow
          icon={User}
          label="Theme"
          value="Dark"
          onPress={() => {}}
        />
        <SettingsRow
          icon={User}
          label="Language"
          value="English"
          onPress={() => {}}
        />
      </SettingsSection>

      {/* Support */}
      <SettingsSection title="Support">
        <SettingsRow
          icon={HelpCircle}
          label="Help centre"
          onPress={() => {}}
        />
        <SettingsRow
          icon={Mail}
          label="Contact us"
          onPress={() => {}}
        />
        <SettingsRow
          icon={Shield}
          label="Privacy policy"
          onPress={() => {}}
        />
      </SettingsSection>

      {/* Sign out */}
      <View style={{ paddingHorizontal: SCREEN_PADDING_H, marginTop: 8 }}>
        <Pressable
          style={{
            height: 52,
            borderRadius: 12,
            backgroundColor: cardColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#FF453A' }}>
            Sign out
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
