export const sessionsSummary = [
  { label: 'Sessions scheduled', value: 1, tone: 'default' },
  { label: 'Sessions Cancelled', value: 0, tone: 'danger' },
  { label: 'Total sign-ins', value: '0 (0% in-time)', tone: 'success' },
  { label: 'Not signed-in', value: 1, tone: 'warning' },
  { label: 'Average attendance', value: 0, tone: 'muted' },
];

export const sessions = [
  {
    id: 1,
    start: '4:00PM',
    end: '6:30PM',
    platform: 'Zoom',
    title: 'Investment Banking',
    instructor: 'Smitha (Investment Banking August 2025)',
    attendance: { signedIn: 0, total: 8 },
    status: 'NOT SIGNED IN',
    topics: '-',
  },
];
