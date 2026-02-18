/**
 * Dummy profile image URLs for avatars used across the app.
 * Using pravatar.cc (img=1–70 returns different faces).
 */

const PRAVATAR = 'https://i.pravatar.cc';

/** Main user profile (e.g. Christian Johnson) – same everywhere for consistency */
export const PROFILE_IMAGE_URL = `${PRAVATAR}/128?img=33`;

/** Participant / attendee avatars for event cards and detail (stack of faces) */
export const PARTICIPANT_AVATAR_URLS = [
  `${PRAVATAR}/128?img=12`,
  `${PRAVATAR}/128?img=25`,
  `${PRAVATAR}/128?img=67`,
] as const;

export function getParticipantAvatarUrl(index: number): string {
  return PARTICIPANT_AVATAR_URLS[index % PARTICIPANT_AVATAR_URLS.length];
}
