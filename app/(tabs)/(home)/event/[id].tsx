import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { getParticipantAvatarUrl } from '@/lib/avatars';
import { eventImageUrl, getEventById } from '@/lib/events';
import {
  DETAIL_AVATAR_RADIUS,
  DETAIL_AVATAR_SIZE,
  DETAIL_BACK_BTN_RADIUS,
  DETAIL_BACK_BTN_SIZE,
  DETAIL_CONTENT_GAP,
  DETAIL_CONTENT_PADDING_H,
  DETAIL_HEART_RADIUS,
  DETAIL_HEART_SIZE,
  DETAIL_MAP_HEIGHT,
  DETAIL_MAP_RADIUS,
  DETAIL_PRICE_BOX_PADDING,
  DETAIL_PRICE_BOX_RADIUS,
  DETAIL_SECTION_GAP,
  DETAIL_HERO_HEIGHT,
  DETAIL_ACTIONS_BTN_HEIGHT,
  DETAIL_ACTIONS_BTN_RADIUS,
  SCREEN_PADDING_TOP,
} from '@/lib/design-tokens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Calendar,
  ChevronLeft,
  Heart,
  MapPin,
} from 'lucide-react-native';
import { Image, ImageBackground, Pressable } from 'react-native';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = id ? getEventById(id) : undefined;

  const background = useColor('background');
  const cardColor = useColor('card');
  const textMuted = useColor('textMuted');
  const primary = useColor('primary');
  const primaryFg = useColor('primaryForeground');
  const text = useColor('text');

  if (!event) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: background,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 15, color: textMuted }}>
          Event not found.
        </Text>
        <Button style={{ marginTop: 16 }} onPress={() => router.back()}>
          Go back
        </Button>
      </View>
    );
  }

  const imageUri = eventImageUrl(event.imageId);

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: SCREEN_PADDING_TOP,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero – ui.pen: height 240, fill #3A3A3C, back 40x40 radius 20 */}
        <View
          style={{
            height: DETAIL_HERO_HEIGHT,
            backgroundColor: '#3A3A3C',
            position: 'relative',
          }}
        >
          <ImageBackground
            source={{ uri: imageUri }}
            style={{ flex: 1 }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                position: 'absolute',
                top: 12,
                left: DETAIL_CONTENT_PADDING_H,
                width: DETAIL_BACK_BTN_SIZE,
                height: DETAIL_BACK_BTN_SIZE,
                borderRadius: DETAIL_BACK_BTN_RADIUS,
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name={ChevronLeft} size={20} color="#fff" />
            </Pressable>
          </ImageBackground>
        </View>

        {/* Content – padding [0,20], gap 16 */}
        <View
          style={{
            paddingHorizontal: DETAIL_CONTENT_PADDING_H,
            gap: DETAIL_CONTENT_GAP,
            marginTop: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: text,
            }}
            numberOfLines={3}
          >
            {event.title}
          </Text>

          {/* Meta row – date + location, gap 16 */}
          <View style={{ gap: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon name={Calendar} size={18} color={textMuted} />
              <Text style={{ fontSize: 14, color: textMuted }}>
                {event.fullDate}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon name={MapPin} size={18} color={textMuted} />
              <Text style={{ fontSize: 14, color: textMuted }}>
                {event.location}
              </Text>
            </View>
          </View>

          {/* Price box – radius 12, fill primary, padding 12, gap 4 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              padding: DETAIL_PRICE_BOX_PADDING,
              borderRadius: DETAIL_PRICE_BOX_RADIUS,
              backgroundColor: primary,
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: primaryFg,
              }}
            >
              {event.price}
            </Text>
            {event.seats && (
              <Text
                style={{
                  fontSize: 11,
                  color: primaryFg,
                }}
              >
                {event.seats}
              </Text>
            )}
          </View>

          {/* About – gap 8, label 16px 600, body 14px #8E8E93 */}
          <View style={{ gap: DETAIL_SECTION_GAP }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>
              About Event
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: textMuted,
                lineHeight: 22,
              }}
            >
              {event.about}{' '}
              <Text style={{ fontSize: 14, color: primary }}>read more...</Text>
            </Text>
          </View>

          {/* Participant – avatars 28px radius 14 stroke #1C1C1E */}
          <View style={{ gap: DETAIL_SECTION_GAP }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>
              Participant
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                {[0, 1, 2].map((i) => (
                  <Image
                    key={i}
                    source={{ uri: getParticipantAvatarUrl(i) }}
                    style={{
                      width: DETAIL_AVATAR_SIZE,
                      height: DETAIL_AVATAR_SIZE,
                      borderRadius: DETAIL_AVATAR_RADIUS,
                      marginLeft: i > 0 ? -8 : 0,
                      borderWidth: 2,
                      borderColor: background,
                    }}
                  />
                ))}
              </View>
              <Text style={{ fontSize: 13, color: textMuted }}>
                +{event.participants} Participant
              </Text>
            </View>
          </View>

          {/* Location – map 120 height radius 12 */}
          <View style={{ gap: DETAIL_SECTION_GAP }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>
              Location
            </Text>
            <View
              style={{
                height: DETAIL_MAP_HEIGHT,
                backgroundColor: cardColor,
                borderRadius: DETAIL_MAP_RADIUS,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name={MapPin} size={32} color={textMuted} />
              <Text
                style={{
                  fontSize: 14,
                  color: textMuted,
                  marginTop: 8,
                  paddingHorizontal: 16,
                }}
                numberOfLines={1}
              >
                {event.location}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions – Join live row, then buy + heart */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          gap: 12,
          paddingHorizontal: DETAIL_CONTENT_PADDING_H,
          paddingVertical: 16,
          paddingBottom: 34,
          backgroundColor: background,
        }}
      >
        <Button
          variant="outline"
          size="lg"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/(home)/event-live/[id]',
              params: { id: event.id },
            })
          }
          style={{
            height: DETAIL_ACTIONS_BTN_HEIGHT,
            borderRadius: DETAIL_ACTIONS_BTN_RADIUS,
          }}
        >
          Join live – vote during the show
        </Button>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Button
            size="lg"
            style={{
              flex: 1,
              height: DETAIL_ACTIONS_BTN_HEIGHT,
              borderRadius: DETAIL_ACTIONS_BTN_RADIUS,
            }}
          >
            Buy Ticket
          </Button>
          <Pressable
            style={{
              width: DETAIL_HEART_SIZE,
              height: DETAIL_HEART_SIZE,
              borderRadius: DETAIL_HEART_RADIUS,
              backgroundColor: cardColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={Heart} size={24} color={text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
