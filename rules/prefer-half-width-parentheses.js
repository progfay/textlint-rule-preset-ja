"use strict";

const REPLACEMENTS = [
  {
    fullWidth: "（",
    halfWidth: "(",
    getReplacement: (halfWidth, text, index) => {
      const prev = index > 0 ? text[index - 1] : null;
      const atLineStart = prev === null || prev === "\n";
      return !atLineStart && prev !== " " ? " " + halfWidth : halfWidth;
    },
  },
  {
    fullWidth: "）",
    halfWidth: ")",
    getReplacement: (halfWidth, text, index) => {
      const next = index < text.length - 1 ? text[index + 1] : null;
      const atLineEnd = next === null || next === "\n";
      return !atLineEnd && next !== " " ? halfWidth + " " : halfWidth;
    },
  },
];

function reporter(context) {
  const { Syntax, RuleError, report, fixer, getSource } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      for (const { fullWidth, halfWidth, getReplacement } of REPLACEMENTS) {
        let index = text.indexOf(fullWidth);
        while (index !== -1) {
          report(
            node,
            new RuleError(`全角括弧 "${fullWidth}" を半角括弧 "${halfWidth}" に置換してください。`, {
              index,
              fix: fixer.replaceTextRange([index, index + 1], getReplacement(halfWidth, text, index)),
            })
          );
          index = text.indexOf(fullWidth, index + 1);
        }
      }
    },
  };
}

module.exports = {
  linter: reporter,
  fixer: reporter,
};
