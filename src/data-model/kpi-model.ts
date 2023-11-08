export const TrendValues = {
  POSITIVE: 'Positive',
  NEUTRAL: 'Neutral',
  NEGATIVE: 'Negative',
} as const;

export type Trend = keyof typeof TrendValues;

export interface KPI {
  name: string;
  tooltip: string;
  icon: string;
  value: number;
  trend: Trend;
}
