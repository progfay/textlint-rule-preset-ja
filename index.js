const presetJaTechnicalWriting = require("textlint-rule-preset-ja-technical-writing");
const preferHalfWidthParentheses = require("./rules/prefer-half-width-parentheses");
const presetJaSpacing = require("textlint-rule-preset-ja-spacing");
const presetAiWritingRaw = require("@textlint-ja/textlint-rule-preset-ai-writing");
const presetAiWriting = presetAiWritingRaw.default ?? presetAiWritingRaw;
const terminologyRaw = require("textlint-rule-terminology");
const terminology = terminologyRaw.default ?? terminologyRaw;

module.exports = {
  rules: {
    ...presetJaTechnicalWriting.rules,
    ...presetJaSpacing.rules,
    ...presetAiWriting.rules,
    terminology,
    "prefer-half-width-parentheses": preferHalfWidthParentheses,
  },
  rulesConfig: {
    ...presetJaTechnicalWriting.rulesConfig,
    ...presetJaSpacing.rulesConfig,
    "ja-space-between-half-and-full-width": {
      space: "always",
    },
    ...presetAiWriting.rulesConfig,
    terminology: true,
    "prefer-half-width-parentheses": true,
  },
};
