module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 0 = disable, 1 = warning, 2 = error
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-case": [2, "always", "sentence-case"], // Optional: enforces sentence case
  },
};
