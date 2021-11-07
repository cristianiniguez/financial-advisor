export const categories = ['bonds', 'largeCap', 'midCap', 'foreign', 'smallCap'] as const;

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Category = typeof categories[number];

export type Portfolio = {
  [key in Category]: number;
};

export type Risk = {
  level: Level;
} & Portfolio;

export const labels: { [key in Category]: string } = {
  bonds: 'Bonds',
  largeCap: 'Large Cap',
  midCap: 'Mid Cap',
  foreign: 'Foreign',
  smallCap: 'Small Cap',
};

const risks: Risk[] = [
  { level: 1, bonds: 0.8, largeCap: 0.2, midCap: 0, foreign: 0, smallCap: 0 },
  { level: 2, bonds: 0.7, largeCap: 0.15, midCap: 0.15, foreign: 0, smallCap: 0 },
  { level: 3, bonds: 0.6, largeCap: 0.15, midCap: 0.15, foreign: 0.1, smallCap: 0 },
  { level: 4, bonds: 0.5, largeCap: 0.2, midCap: 0.2, foreign: 0.1, smallCap: 0 },
  { level: 5, bonds: 0.4, largeCap: 0.2, midCap: 0.2, foreign: 0.2, smallCap: 0 },
  { level: 6, bonds: 0.35, largeCap: 0.25, midCap: 0.05, foreign: 0.3, smallCap: 0.05 },
  { level: 7, bonds: 0.2, largeCap: 0.25, midCap: 0.25, foreign: 0.25, smallCap: 0.05 },
  { level: 8, bonds: 0.1, largeCap: 0.2, midCap: 0.4, foreign: 0.2, smallCap: 0.1 },
  { level: 9, bonds: 0.05, largeCap: 0.15, midCap: 0.4, foreign: 0.25, smallCap: 0.15 },
  { level: 10, bonds: 0, largeCap: 0.05, midCap: 0.25, foreign: 0.3, smallCap: 0.4 },
];

export default risks;
