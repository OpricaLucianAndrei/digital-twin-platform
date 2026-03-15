// ── Brand Palette ─────────────────────────────────────────────────────────
export const colors = {
  // Backgrounds
  bg: {
    primary:   '#0B0F14',
    secondary: '#111827',
    tertiary:  '#1F2937',
    elevated:  '#1A2235',
    overlay:   'rgba(11, 15, 20, 0.85)',
  },

  // Text
  text: {
    primary:   '#E5E7EB',
    secondary: '#9CA3AF',
    muted:     '#6B7280',
    inverse:   '#0B0F14',
  },

  // Brand accent
  accent: {
    primary:   '#3B82F6',
    hover:     '#2563EB',
    light:     'rgba(59, 130, 246, 0.15)',
    glow:      'rgba(59, 130, 246, 0.3)',
  },

  // Device status
  status: {
    online:      '#22C55E',
    warning:     '#F59E0B',
    alarm:       '#EF4444',
    offline:     '#6B7280',
    maintenance: '#8B5CF6',
  },

  // Alarm levels
  alarm: {
    warning:  '#F59E0B',
    alarm:    '#EF4444',
    critical: '#DC2626',
  },

  // Borders
  border: {
    default: 'rgba(229, 231, 235, 0.08)',
    subtle:  'rgba(229, 231, 235, 0.04)',
    accent:  'rgba(59, 130, 246, 0.4)',
  },
} as const;

// ── CSS Custom Properties ─────────────────────────────────────────────────
// Da inserire nel :root del global styles
export const cssVariables = `
  :root {
    --color-bg-primary:   ${colors.bg.primary};
    --color-bg-secondary: ${colors.bg.secondary};
    --color-bg-tertiary:  ${colors.bg.tertiary};
    --color-bg-elevated:  ${colors.bg.elevated};
    --color-bg-overlay:   ${colors.bg.overlay};

    --color-text-primary:   ${colors.text.primary};
    --color-text-secondary: ${colors.text.secondary};
    --color-text-muted:     ${colors.text.muted};
    --color-text-inverse:   ${colors.text.inverse};

    --color-accent-primary: ${colors.accent.primary};
    --color-accent-hover:   ${colors.accent.hover};
    --color-accent-light:   ${colors.accent.light};
    --color-accent-glow:    ${colors.accent.glow};

    --color-status-online:      ${colors.status.online};
    --color-status-warning:     ${colors.status.warning};
    --color-status-alarm:       ${colors.status.alarm};
    --color-status-offline:     ${colors.status.offline};
    --color-status-maintenance: ${colors.status.maintenance};

    --color-border-default: ${colors.border.default};
    --color-border-subtle:  ${colors.border.subtle};
    --color-border-accent:  ${colors.border.accent};
  }
`;