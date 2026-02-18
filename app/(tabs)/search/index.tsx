import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import {
  eventImageUrl,
  EVENTS,
  filterEventsBySearch,
} from '@/lib/events';
import {
  SCREEN_PADDING_H,
  SCREEN_PADDING_TOP,
} from '@/lib/design-tokens';
import { useSearch } from '@/providers/search-context';
import { useRouter } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import { useMemo } from 'react';
import { ImageBackground, Pressable } from 'react-native';

export default function SearchScreen() {
  const { searchText } = useSearch();
  const router = useRouter();
  const cardColor = useColor('card');
  const textMuted = useColor('textMuted');
  const border = useColor('border');

  const filteredEvents = useMemo(
    () => filterEventsBySearch(EVENTS, searchText),
    [searchText]
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingTop: SCREEN_PADDING_TOP,
        paddingHorizontal: SCREEN_PADDING_H,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {filteredEvents.length === 0 ? (
        <View style={{ paddingVertical: 48, alignItems: 'center' }}>
          <Text variant="body" style={{ color: textMuted, textAlign: 'center' }}>
            {searchText.trim()
              ? 'No events match your search.'
              : 'Type to search events by name or location.'}
          </Text>
        </View>
      ) : (
        <View style={{ gap: 14 }}>
          {filteredEvents.map((ev) => (
            <Pressable
              key={ev.id}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/(home)/event/[id]',
                  params: { id: ev.id },
                })
              }
            >
              <Card
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  borderRadius: 16,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <ImageBackground
                    source={{ uri: eventImageUrl(ev.imageId) }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View
                    style={{
                      flex: 1,
                      padding: 12,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      variant="subtitle"
                      numberOfLines={2}
                      style={{ marginBottom: 4 }}
                    >
                      {ev.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Icon name={MapPin} size={12} color={textMuted} />
                      <Text
                        variant="caption"
                        numberOfLines={1}
                        style={{ flex: 1 }}
                      >
                        {ev.location}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 6,
                      }}
                    >
                      <Text variant="body" style={{ fontWeight: '700' }}>
                        {ev.price}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Icon name={Star} size={12} color="#E8C547" />
                        <Text variant="caption">{ev.rating}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
