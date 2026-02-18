import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import {
  getParticipantAvatarUrl,
  PROFILE_IMAGE_URL,
} from '@/lib/avatars';
import {
  CATEGORIES as CATEGORY_LIST,
  eventImageUrl,
  EVENTS,
  filterEventsByCategory,
  filterEventsBySearch,
  type CategoryId,
} from '@/lib/events';
import {
  HOME_CAT_ROW_PADDING_V,
  HOME_FEATURED_BODY_GAP,
  HOME_FEATURED_BODY_PADDING,
  HOME_FEATURED_CARD_RADIUS,
  HOME_FEATURED_DATE_BADGE_HEIGHT,
  HOME_FEATURED_DATE_BADGE_PADDING_H,
  HOME_FEATURED_DATE_BADGE_RADIUS,
  HOME_FEATURED_HEART_SIZE,
  HOME_FEATURED_IMAGE_HEIGHT,
  HOME_FEATURED_JOIN_BTN_HEIGHT,
  HOME_FEATURED_JOIN_BTN_RADIUS,
  HOME_HEADER_AVATAR_RADIUS,
  HOME_HEADER_AVATAR_SIZE,
  HOME_HEADER_GAP,
  HOME_PILL_HEIGHT,
  HOME_PILL_PADDING_H,
  HOME_PILL_RADIUS,
  HOME_PILLS_GAP,
  HOME_SEARCH_HEIGHT,
  HOME_SEARCH_INNER_PADDING_H,
  HOME_SEARCH_RADIUS,
  HOME_FILTER_BTN_SIZE,
  HOME_SMALL_CARD_GAP,
  HOME_SMALL_CARD_HEIGHT,
  HOME_SMALL_CARD_IMAGE_HEIGHT,
  HOME_SMALL_CARD_RADIUS,
  HOME_SMALL_CARD_WIDTH,
  HOME_TOP_ROW_PADDING,
  SCREEN_PADDING_H,
  SCREEN_PADDING_TOP,
} from '@/lib/design-tokens';
import { useRouter } from 'expo-router';
import {
  Gift,
  Heart,
  MapPin,
  Mic2,
  Mountain,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView as RNScrollView,
  TextInput,
} from 'react-native';

const CATEGORY_ICONS: Record<CategoryId, typeof Mic2> = {
  live: Mic2,
  tourism: Mountain,
  origin: Star,
};

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('live');
  const [searchQuery, setSearchQuery] = useState('');

  const background = useColor('background');
  const cardColor = useColor('card');
  const primary = useColor('primary');
  const primaryFg = useColor('primaryForeground');
  const textMuted = useColor('textMuted');
  const text = useColor('text');
  const surface = '#3A3A3C';

  const filteredEvents = useMemo(() => {
    let list = filterEventsByCategory(EVENTS, selectedCategory);
    list = filterEventsBySearch(list, searchQuery);
    return list;
  }, [selectedCategory, searchQuery]);

  const featuredEvent = filteredEvents[0];
  const topEvents = filteredEvents.slice(1, 11);

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: SCREEN_PADDING_TOP,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header – ui.pen: padding [0,20], gap 12 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: HOME_HEADER_GAP,
            paddingHorizontal: SCREEN_PADDING_H,
          }}
        >
          <Image
            source={{ uri: PROFILE_IMAGE_URL }}
            style={{
              width: HOME_HEADER_AVATAR_SIZE,
              height: HOME_HEADER_AVATAR_SIZE,
              borderRadius: HOME_HEADER_AVATAR_RADIUS,
              borderWidth: 2,
              borderColor: '#34C759',
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: textMuted }}>Welcome Back</Text>
            <Text style={{ fontSize: 16, color: text, fontWeight: '600' }}>
              Christian Johnson
            </Text>
          </View>
          <Pressable
            style={{
              width: HOME_HEADER_AVATAR_SIZE,
              height: HOME_HEADER_AVATAR_SIZE,
              borderRadius: 8,
              backgroundColor: cardColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={Gift} size={22} color={primary} />
          </Pressable>
        </View>

        {/* Search row – height 44, padding [0,20], bar radius 12, inner padding 16 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: HOME_SEARCH_HEIGHT,
            paddingHorizontal: SCREEN_PADDING_H,
            gap: 12,
            marginTop: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              height: HOME_SEARCH_HEIGHT,
              paddingHorizontal: HOME_SEARCH_INNER_PADDING_H,
              backgroundColor: cardColor,
              borderRadius: HOME_SEARCH_RADIUS,
            }}
          >
            <Icon name={Search} size={20} color={textMuted} />
            <TextInput
              placeholder="Discover"
              placeholderTextColor={textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontSize: 15,
                color: text,
                paddingVertical: 0,
              }}
            />
          </View>
          <View
            style={{
              width: HOME_FILTER_BTN_SIZE,
              height: HOME_FILTER_BTN_SIZE,
              borderRadius: HOME_SEARCH_RADIUS,
              backgroundColor: cardColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={SlidersHorizontal} size={20} color={text} />
          </View>
        </View>

        {/* Categories row – padding [8,20], space_between */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: HOME_CAT_ROW_PADDING_V,
            paddingHorizontal: SCREEN_PADDING_H,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>
            Categories
          </Text>
          <Pressable>
            <Text style={{ fontSize: 14, color: primary }}>See all</Text>
          </Pressable>
        </View>

        {/* Pills – gap 10, height 36, radius 18, padding H 18 */}
        <RNScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SCREEN_PADDING_H,
            gap: HOME_PILLS_GAP,
            paddingBottom: 8,
          }}
        >
          {CATEGORY_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const IconComp = CATEGORY_ICONS[cat.id];
            return (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: HOME_PILL_HEIGHT,
                  paddingHorizontal: HOME_PILL_PADDING_H,
                  borderRadius: HOME_PILL_RADIUS,
                  backgroundColor: isActive ? primary : cardColor,
                }}
              >
                <Icon
                  name={IconComp}
                  size={16}
                  color={isActive ? primaryFg : textMuted}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 14,
                    fontWeight: isActive ? '500' : '400',
                    color: isActive ? primaryFg : text,
                  }}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </RNScrollView>

        {/* Featured card – image 200, radius 16, body padding 12 gap 6 */}
        {featuredEvent && (
          <View
            style={{
              paddingHorizontal: SCREEN_PADDING_H,
              marginTop: 4,
            }}
          >
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/(home)/event/[id]',
                  params: { id: featuredEvent.id },
                })
              }
            >
              <View
                style={{
                  borderRadius: HOME_FEATURED_CARD_RADIUS,
                  overflow: 'hidden',
                  backgroundColor: cardColor,
                }}
              >
                <View
                  style={{
                    height: HOME_FEATURED_IMAGE_HEIGHT,
                    backgroundColor: surface,
                    position: 'relative',
                  }}
                >
                  <ImageBackground
                    source={{ uri: eventImageUrl(featuredEvent.imageId) }}
                    style={{ flex: 1 }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        height: HOME_FEATURED_DATE_BADGE_HEIGHT,
                        paddingHorizontal: HOME_FEATURED_DATE_BADGE_PADDING_H,
                        borderRadius: HOME_FEATURED_DATE_BADGE_RADIUS,
                        backgroundColor: primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: primaryFg,
                        }}
                      >
                        {featuredEvent.dateLabel}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: HOME_FEATURED_HEART_SIZE,
                        height: HOME_FEATURED_HEART_SIZE,
                        borderRadius: HOME_FEATURED_HEART_SIZE / 2,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon name={Heart} size={18} color="#fff" />
                    </View>
                  </ImageBackground>
                </View>
                <View
                  style={{
                    padding: HOME_FEATURED_BODY_PADDING,
                    gap: HOME_FEATURED_BODY_GAP,
                    borderBottomLeftRadius: HOME_FEATURED_CARD_RADIUS,
                    borderBottomRightRadius: HOME_FEATURED_CARD_RADIUS,
                    backgroundColor: cardColor,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: '600', color: text }}
                    numberOfLines={1}
                  >
                    {featuredEvent.title}
                  </Text>
                  <Text
                    style={{ fontSize: 13, color: textMuted }}
                    numberOfLines={1}
                  >
                    {featuredEvent.location}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: primary,
                      }}
                    >
                      {featuredEvent.price}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: textMuted }}>
                        {featuredEvent.participants}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        {[0, 1, 2].map((i) => (
                          <Image
                            key={i}
                            source={{
                              uri: getParticipantAvatarUrl(i),
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              marginLeft: i > 0 ? -6 : 0,
                              borderWidth: 2,
                              borderColor: cardColor,
                            }}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                  <Button
                    size="lg"
                    style={{
                      marginTop: 4,
                      height: HOME_FEATURED_JOIN_BTN_HEIGHT,
                      borderRadius: HOME_FEATURED_JOIN_BTN_RADIUS,
                    }}
                  >
                    Join now
                  </Button>
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* Top 10 row – padding [16,20] */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: HOME_TOP_ROW_PADDING,
            paddingHorizontal: SCREEN_PADDING_H,
            marginTop: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>
            Top 10 in London
          </Text>
          <Pressable>
            <Text style={{ fontSize: 14, color: primary }}>See all</Text>
          </Pressable>
        </View>

        {/* Small cards – width 120, height 140, gap 12, radius 12 */}
        {topEvents.length === 0 ? (
          <View
            style={{
              paddingHorizontal: SCREEN_PADDING_H,
              paddingVertical: 24,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 15, color: textMuted }}>
              No events match your filters.
            </Text>
          </View>
        ) : (
          <RNScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SCREEN_PADDING_H,
              gap: HOME_SMALL_CARD_GAP,
              paddingBottom: 24,
            }}
          >
            {topEvents.map((ev) => (
              <Pressable
                key={ev.id}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(home)/event/[id]',
                    params: { id: ev.id },
                  })
                }
                style={{
                  width: HOME_SMALL_CARD_WIDTH,
                  height: HOME_SMALL_CARD_HEIGHT,
                  borderRadius: HOME_SMALL_CARD_RADIUS,
                  overflow: 'hidden',
                  backgroundColor: cardColor,
                }}
              >
                <ImageBackground
                  source={{ uri: eventImageUrl(ev.imageId) }}
                  style={{
                    height: HOME_SMALL_CARD_IMAGE_HEIGHT,
                    width: '100%',
                    backgroundColor: surface,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    padding: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      flex: 1,
                      fontSize: 12,
                      fontWeight: '600',
                      color: text,
                    }}
                  >
                    {ev.title}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Icon name={Star} size={12} color={primary} />
                    <Text style={{ fontSize: 12, color: text }}>{ev.rating}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </RNScrollView>
        )}
      </ScrollView>
    </View>
  );
}
