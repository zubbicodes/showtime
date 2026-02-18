/**
 * Live interaction (voting/poll) data for demo.
 * PRD 4.1: Real-time choice-making, multiple-choice questions, results calculated automatically.
 */

export type PollOption = {
  id: string;
  label: string;
};

export type LiveQuestion = {
  id: string;
  question: string;
  options: PollOption[];
  /** Mock total votes per option (for demo results). Order matches options. */
  mockTotals: number[];
};

/** Demo questions shown during "live" event. */
export const DEMO_LIVE_QUESTIONS: LiveQuestion[] = [
  {
    id: 'q1',
    question: 'What was your favourite moment tonight?',
    options: [
      { id: 'a', label: 'Opening number' },
      { id: 'b', label: 'Comedy segment' },
      { id: 'c', label: 'Guest performance' },
      { id: 'd', label: 'Finale' },
    ],
    mockTotals: [42, 88, 56, 71],
  },
  {
    id: 'q2',
    question: 'Would you recommend this show to a friend?',
    options: [
      { id: 'a', label: 'Definitely yes' },
      { id: 'b', label: 'Probably yes' },
      { id: 'c', label: 'Not sure' },
      { id: 'd', label: 'Probably not' },
    ],
    mockTotals: [120, 45, 12, 3],
  },
];

/**
 * Get result percentages and total for a question after the user has voted.
 * In demo we add 1 to the chosen option and use mock totals for the rest.
 */
export function getPollResults(
  question: LiveQuestion,
  chosenOptionId: string | null
): { optionId: string; label: string; percent: number; count: number }[] {
  const totals = [...question.mockTotals];
  const optionIndex = question.options.findIndex((o) => o.id === chosenOptionId);
  if (optionIndex >= 0) {
    totals[optionIndex] = (totals[optionIndex] ?? 0) + 1;
  }
  const totalVotes = totals.reduce((a, b) => a + b, 0);
  return question.options.map((opt, i) => ({
    optionId: opt.id,
    label: opt.label,
    count: totals[i] ?? 0,
    percent: totalVotes > 0 ? Math.round(((totals[i] ?? 0) / totalVotes) * 100) : 0,
  }));
}

export function getTotalVoteCount(question: LiveQuestion, chosenOptionId: string | null): number {
  const totals = [...question.mockTotals];
  const optionIndex = question.options.findIndex((o) => o.id === chosenOptionId);
  if (optionIndex >= 0) {
    totals[optionIndex] = (totals[optionIndex] ?? 0) + 1;
  }
  return totals.reduce((a, b) => a + b, 0);
}
