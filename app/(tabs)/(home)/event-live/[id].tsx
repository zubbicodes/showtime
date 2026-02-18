import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { getEventById } from '@/lib/events';
import {
  DEMO_LIVE_QUESTIONS,
  getPollResults,
  getTotalVoteCount,
  type LiveQuestion,
} from '@/lib/live-poll';
import { SCREEN_PADDING_TOP } from '@/lib/design-tokens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

const OPTION_RADIUS = 12;
const OPTION_PADDING = 16;
const OPTION_GAP = 10;
const LIVE_BADGE_PADDING_H = 10;
const LIVE_BADGE_PADDING_V = 6;
const LIVE_BADGE_RADIUS = 8;
const RESULT_BAR_HEIGHT = 28;
const RESULT_BAR_RADIUS = 8;

export default function EventLiveScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = id ? getEventById(id) : undefined;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const background = useColor('background');
  const cardColor = useColor('card');
  const textMuted = useColor('textMuted');
  const primary = useColor('primary');
  const primaryFg = useColor('primaryForeground');
  const text = useColor('text');
  const border = useColor('border');

  const question = DEMO_LIVE_QUESTIONS[questionIndex] ?? DEMO_LIVE_QUESTIONS[0];
  const totalQuestions = DEMO_LIVE_QUESTIONS.length;
  const isLastQuestion = questionIndex >= totalQuestions - 1;

  const handleSelectOption = (optionId: string) => {
    if (chosenOptionId != null) return;
    setChosenOptionId(optionId);
    setShowResults(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      router.back();
      return;
    }
    setQuestionIndex((i) => i + 1);
    setChosenOptionId(null);
    setShowResults(false);
  };

  const handleBack = () => router.back();

  if (!event) {
    return (
      <View style={{ flex: 1, backgroundColor: background, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontSize: 15, color: textMuted }}>Event not found.</Text>
        <Button style={{ marginTop: 16 }} onPress={handleBack}>Go back</Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      {/* Header */}
      <View
        style={{
          paddingTop: SCREEN_PADDING_TOP,
          paddingHorizontal: 20,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: background,
          borderBottomWidth: 1,
          borderBottomColor: border,
        }}
      >
        <Pressable
          onPress={handleBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: cardColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={ChevronLeft} size={22} color={text} />
        </Pressable>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: '600', color: text }}>
            {event.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 4,
            }}
          >
            <View
              style={{
                backgroundColor: '#22c55e',
                paddingHorizontal: LIVE_BADGE_PADDING_H,
                paddingVertical: LIVE_BADGE_PADDING_V,
                borderRadius: LIVE_BADGE_RADIUS,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#fff' }}>LIVE</Text>
            </View>
            <Text style={{ fontSize: 13, color: textMuted }}>
              Question {questionIndex + 1} of {totalQuestions}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {!showResults ? (
          <PollQuestion
            question={question}
            chosenOptionId={chosenOptionId}
            onSelect={handleSelectOption}
            colors={{ cardColor, text, textMuted, primary, primaryFg, border }}
          />
        ) : (
          <PollResults
            question={question}
            chosenOptionId={chosenOptionId}
            colors={{ cardColor, text, textMuted, primary, primaryFg }}
          />
        )}
      </ScrollView>

      {/* Bottom action */}
      {showResults && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            paddingVertical: 16,
            paddingBottom: 34,
            backgroundColor: background,
            borderTopWidth: 1,
            borderTopColor: border,
          }}
        >
          <Button
            size="lg"
            onPress={handleNext}
            style={{ height: 56, borderRadius: 14 }}
          >
            {isLastQuestion ? 'Back to event' : 'Next question'}
          </Button>
        </View>
      )}
    </View>
  );
}

type PollQuestionProps = {
  question: LiveQuestion;
  chosenOptionId: string | null;
  onSelect: (optionId: string) => void;
  colors: {
    cardColor: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryFg: string;
    border: string;
  };
};

function PollQuestion({ question, chosenOptionId, onSelect, colors }: PollQuestionProps) {
  return (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, lineHeight: 24 }}>
        {question.question}
      </Text>
      <Text style={{ fontSize: 14, color: colors.textMuted }}>
        Tap to vote. Results update in real time.
      </Text>
      <View style={{ gap: OPTION_GAP }}>
        {question.options.map((opt) => {
          const chosen = chosenOptionId === opt.id;
          return (
            <Pressable
              key={opt.id}
              onPress={() => onSelect(opt.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: OPTION_PADDING,
                borderRadius: OPTION_RADIUS,
                backgroundColor: colors.cardColor,
                borderWidth: 2,
                borderColor: chosen ? colors.primary : 'transparent',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: colors.text,
                  fontWeight: chosen ? '600' : '400',
                }}
              >
                {opt.label}
              </Text>
              {chosen && (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primaryFg }}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

type PollResultsProps = {
  question: LiveQuestion;
  chosenOptionId: string | null;
  colors: {
    cardColor: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryFg: string;
  };
};

function PollResults({ question, chosenOptionId, colors }: PollResultsProps) {
  const results = getPollResults(question, chosenOptionId);
  const totalVotes = getTotalVoteCount(question, chosenOptionId);

  return (
    <View style={{ gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 4 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Thanks for voting!</Text>
        <Text style={{ fontSize: 14, color: colors.textMuted }}>{totalVotes} responses</Text>
      </View>
      <View style={{ gap: 16 }}>
        {results.map((r) => (
          <View key={r.optionId} style={{ gap: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: colors.text }}>{r.label}</Text>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>
                {r.percent}% ({r.count})
              </Text>
            </View>
            <View
              style={{
                height: RESULT_BAR_HEIGHT,
                borderRadius: RESULT_BAR_RADIUS,
                backgroundColor: colors.cardColor,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${r.percent}%`,
                  maxWidth: '100%',
                  backgroundColor: colors.primary,
                  borderRadius: RESULT_BAR_RADIUS,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
