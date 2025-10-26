// Mock data shaped to look like the reference screen
export const kpis = [
  { id: 'time', title: 'Average time spent', value: '00m 00s', delta: -100, series: [40,38,35,20,16,10,6] },
  { id: 'views', title: 'Total views', value: '0', delta: -100, series: [42,18,10,9,6,4,2] },
  { id: 'rating', title: 'Average rating', value: '0', delta: 0, series: [20,22,22,21,20,20,19] },
  { id: 'attendance', title: 'Average attendance', value: '0%', delta: 100, series: [10,12,18,20,18,10,4] },
];

export const dau = [
  { d: '16 Oct', v: 160 }, { d:'18 Oct', v:140 }, { d:'20 Oct', v:80 },
  { d:'22 Oct', v:150 }, { d:'24 Oct', v:120 }
];

export const enrollments = [
  { d:'25 Sep', v:  2 }, { d:'29 Sep', v:110 }, { d:'01 Oct', v: 35 },
  { d:'07 Oct', v: 60 }, { d:'11 Oct', v:145 }, { d:'13 Oct', v: 15 },
  { d:'19 Oct', v:310 }, { d:'24 Oct', v:  8 }
];

export const todaySessions = [
  { label: 'Sessions scheduled', value: 1 },
  { label: 'Sessions Cancelled', value: 0 },
  { label: 'Total sign-ins', value: 0 },
  { label: 'Not signed-in', value: 1 },
  { label: 'Average attendance', value: '0%' },
];
