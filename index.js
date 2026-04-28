const presetJaTechnicalWriting = require("textlint-rule-preset-ja-technical-writing");
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
  },
  rulesConfig: {
    ...presetJaTechnicalWriting.rulesConfig,
    ...presetJaSpacing.rulesConfig,
    "ja-space-between-half-and-full-width": {
      space: ["alphabets", "numbers"],
    },
    ...presetAiWriting.rulesConfig,
    terminology: true,
  },
};
