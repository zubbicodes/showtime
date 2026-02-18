import { useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const MOBILE_WIDTH = 390;
const MOBILE_HEIGHT = 844;
const FRAME_RADIUS = 40;
const NOTCH_HEIGHT = 34;
const SIDEBAR_WIDTH = 240;

/** All app screens for web demo – path and label. Order matches logical flow. */
const WEB_SCREEN_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login' },
  { path: '/signup', label: 'Sign up' },
  { path: '/upcoming', label: 'Upcoming events' },
  { path: '/search', label: 'Search' },
  { path: '/tickets', label: 'Tickets' },
  { path: '/settings', label: 'Profile / Settings' },
  { path: '/event/1', label: 'Event detail (example)' },
  { path: '/event-live/1', label: 'Event live (poll)' },
];

/**
 * On web, wraps the app in a sidebar (screen list) + phone-style frame.
 * On native, renders children only.
 */
export function MobileWebFrame({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  const handleNav = (path: string) => {
    router.push(path as any);
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#1a1a1c',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
        gap: 32,
      }}
    >
      {/* Screen list – outside mobile view */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          backgroundColor: '#252528',
          borderRadius: 16,
          padding: 16,
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          position: 'sticky',
          top: 24,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#8E8E93',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 12,
            paddingLeft: 4,
          }}
        >
          Go to screen
        </div>
        {WEB_SCREEN_LINKS.map(({ path, label }) => (
          <button
            key={path}
            type="button"
            onClick={() => handleNav(path)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              marginBottom: 4,
              border: 'none',
              borderRadius: 10,
              backgroundColor: 'transparent',
              color: '#fff',
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#3A3A3C';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {label}
          </button>
        ))}
      </aside>

      {/* Phone frame */}
      <div
        style={{
          width: MOBILE_WIDTH,
          maxWidth: '100%',
          height: MOBILE_HEIGHT,
          maxHeight: 'min(90vh, 844px)',
          borderRadius: FRAME_RADIUS,
          overflow: 'hidden',
          boxShadow:
            '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          backgroundColor: '#1C1C1E',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: NOTCH_HEIGHT,
            backgroundColor: '#000',
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
