import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { getParticipantAvatarUrl } from '@/lib/avatars';
import {
  eventImageUrl,
  EVENTS,
  filterEventsByDate,
  getEventDates,
} from '@/lib/events';
import {
  SCREEN_PADDING_H,
  SCREEN_PADDING_TOP,
  UP_CARD_GAP,
  UP_CARD_HEIGHT,
  UP_CARD_IMAGE_RADIUS,
  UP_CARD_IMAGE_SIZE,
  UP_CARD_PADDING,
  UP_CARD_RADIUS,
  UP_DAY_PILL_HEIGHT,
  UP_DAY_PILL_RADIUS,
  UP_DAY_PILL_WIDTH,
  UP_DAY_PILLS_GAP,
  UP_DAY_ROW_PADDING,
  UP_HEADER_PADDING_TOP,
  UP_LIST_GAP,
  UP_LIST_PADDING,
} from '@/lib/design-tokens';
import { useRouter } from 'expo-router';
import { ChevronRight, HelpCircle, MapPin, Users } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView as RNScrollView,
} from 'react-native';

const DAYS = getEventDates();
const DEFAULT_DAY = DAYS.length > 0 ? DAYS[0].day : '14';

export default function UpcomingScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DAY);

  const background = useColor('background');
  const cardColor = useColor('card');
  const primary = useColor('primary');
  const primaryFg = useColor('primaryForeground');
  const textMuted = useColor('textMuted');
  const text = useColor('text');
  const surface = '#3A3A3C';

  const eventsFiltered = useMemo(
    () => filterEventsByDate(EVENTS, selectedDate),
    [selectedDate]
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: background }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header – ui.pen: height 56, padding [48,20,0,20], space_between */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: UP_HEADER_PADDING_TOP,
          paddingHorizontal: SCREEN_PADDING_H,
          paddingBottom: 8,
          minHeight: 56,
        }}
      >
        <View style={{ width: 40 }} />
        <Text style={{ fontSize: 18, fontWeight: '600', color: text }}>
          Upcoming Event
        </Text>
        <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: cardColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={HelpCircle} size={22} color={text} />
        </Pressable>
      </View>

      {/* Month – 14px #8E8E93 */}
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING_H,
          marginBottom: UP_DAY_ROW_PADDING,
        }}
      >
        <Text style={{ fontSize: 14, color: textMuted }}>January</Text>
      </View>

      {/* Date pills – horizontal scroll; native ScrollView so horizontal swipe works when nested */}
      <RNScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: SCREEN_PADDING_H,
          gap: UP_DAY_PILLS_GAP,
          paddingVertical: UP_DAY_ROW_PADDING,
        }}
        style={{
          height: UP_DAY_PILL_HEIGHT + UP_DAY_ROW_PADDING * 2,
        }}
      >
        {DAYS.map((d) => {
          const isSelected = selectedDate === d.day;
          return (
            <Pressable
              key={d.day}
              onPress={() => setSelectedDate(d.day)}
              style={{
                width: UP_DAY_PILL_WIDTH,
                height: UP_DAY_PILL_HEIGHT,
                borderRadius: UP_DAY_PILL_RADIUS,
                backgroundColor: isSelected ? primary : cardColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: isSelected ? '600' : '400',
                  color: isSelected ? primaryFg : text,
                }}
              >
                {d.day}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: isSelected ? primaryFg : textMuted,
                  marginTop: 2,
                }}
              >
                {d.week}
              </Text>
            </Pressable>
          );
        })}
      </RNScrollView>

      {/* Event list – flows directly under date row, no extra flex space */}
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING_H,
          paddingTop: UP_LIST_PADDING,
          gap: UP_LIST_GAP,
        }}
      >
        {eventsFiltered.length === 0 ? (
          <View style={{ paddingVertical: 48, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: textMuted }}>
              No events on this date.
            </Text>
          </View>
        ) : (
          eventsFiltered.map((ev, index) => {
            const isFirst = index === 0;
            return (
              <Pressable
                key={ev.id}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(home)/event/[id]',
                    params: { id: ev.id },
                  })
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  minHeight: UP_CARD_HEIGHT,
                  padding: UP_CARD_PADDING,
                  gap: UP_CARD_GAP,
                  borderRadius: UP_CARD_RADIUS,
                  backgroundColor: isFirst ? primary : cardColor,
                }}
              >
                <Image
                  source={{ uri: eventImageUrl(ev.imageId) }}
                  style={{
                    width: UP_CARD_IMAGE_SIZE,
                    height: UP_CARD_IMAGE_SIZE,
                    borderRadius: UP_CARD_IMAGE_RADIUS,
                    backgroundColor: surface,
                  }}
                />
                <View style={{ flex: 1, gap: 4, justifyContent: 'center' }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: isFirst ? primaryFg : text,
                    }}
                  >
                    {ev.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: isFirst ? primaryFg : primary,
                      opacity: isFirst ? 0.95 : 1,
                    }}
                  >
                    {ev.time}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    <Icon
                      name={MapPin}
                      size={12}
                      color={isFirst ? primaryFg : textMuted}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        color: isFirst ? primaryFg : textMuted,
                        opacity: isFirst ? 0.9 : 1,
                        flex: 1,
                      }}
                    >
                      {ev.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 4,
                    }}
                  >
                    <Icon
                      name={Users}
                      size={14}
                      color={isFirst ? primaryFg : textMuted}
                    />
                    <View style={{ flexDirection: 'row' }}>
                      {[0, 1, 2].map((i) => (
                        <Image
                          key={i}
                          source={{ uri: getParticipantAvatarUrl(i) }}
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 9,
                            marginLeft: i > 0 ? -5 : 0,
                            borderWidth: 2,
                            borderColor: isFirst ? primary : cardColor,
                          }}
                        />
                      ))}
                    </View>
                    <Text
                      style={{
                        fontSize: 11,
                        color: isFirst ? primaryFg : textMuted,
                        opacity: isFirst ? 0.9 : 1,
                      }}
                    >
                      +{ev.participants}
                    </Text>
                  </View>
                </View>
                <Icon
                  name={ChevronRight}
                  size={20}
                  color={isFirst ? primaryFg : textMuted}
                />
              </Pressable>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
