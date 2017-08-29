export const filingStatus = Object.freeze({
  single: 10400,
  married: 20800,
  head: 13400,
  dependent: 4050
});

export const taxRates = Object.freeze({
  socialSecurity: .062,
  medicare: .0145,
});

export const statusNames = Object.freeze([
  'Single',
  'Married',
  'Head of Household'
]);

export const singleFederalBracket = Object.freeze({
  bracket1: 9325,
  bracket2: 37950,
  bracket3: 91900,
  bracket4: 191650,
  bracket5: 416700,
  bracket6: 418400,
  taxRate1: .1,
  taxRate2: .15,
  taxRate3: .25,
  taxRate4: .28,
  taxRate5: .33,
  taxRate6: .35,
  taxRate7: .396
});

export const singleCaliforniaBracket = Object.freeze({
  bracket1: 7850,
  bracket2: 18610,
  bracket3: 29372,
  bracket4: 40773,
  bracket5: 51530,
  bracket6: 263222,
  bracket7: 315866,
  bracket8: 526443,
  bracket9: 1000000,
  taxRate1: .01,
  taxRate2: .02,
  taxRate3: .04,
  taxRate4: .06,
  taxRate5: .08,
  taxRate6: .093,
  taxRate7: .103,
  taxRate8: .113,
  taxRate9: .123,
  taxRate10: .133
});
