// 北北基定價規則（依你表格）
const PRICING = {
  "北北基-尖峰": {
    minuteKey: "peak",
  },
  "北北基-離峰": {
    minuteKey: "off",
  },
  "北北基-夜間": {
    minuteKey: "night",
  },
};

const CAR_TYPES = {
  "標準型優步": {
    base: 48,
    min: 85,
    perKm: 25,
    perMin: { peak: 3.7, off: 3.4, night: 3.7 },
  },
  "尊榮優步": {
    base: 72,
    min: 128,
    perKm: 37.5,
    perMin: { peak: 5.6, off: 5.1, night: 5.6 },
  },
  "舒適優步": {
    base: 58,
    min: 102,
    perKm: 30,
    perMin: { peak: 4.4, off: 4.1, night: 4.4 },
  },
  "六人座優步": {
    base: 62,
    min: 111,
    perKm: 32.5,
    perMin: { peak: 4.8, off: 4.4, night: 4.8 },
  },
  "商務舒適優步": {
    base: 60,
    min: 106,
    perKm: 31.3,
    perMin: { peak: 4.6, off: 4.3, night: 4.6 },
  },
  "純電舒適優步": {
    base: 67,
    min: 119,
    perKm: 35,
    perMin: { peak: 5.2, off: 4.8, night: 5.2 },
  },
};

function calculateAllFares({
  region,
  minutes,
  km,
  extra,
  multiplier,
}) {
  const minuteKey = PRICING[region].minuteKey;
  const results = {};

  for (const [car, rule] of Object.entries(CAR_TYPES)) {
    let fare =
      rule.base +
      minutes * rule.perMin[minuteKey] +
      km * rule.perKm +
      extra;

    fare *= multiplier;

    if (fare < rule.min) fare = rule.min;

    // 扣 25%
    fare = +(fare * 0.75).toFixed(1);

    results[car] = fare;
  }

  return results;
}
