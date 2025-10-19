export default {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'build',
        'ci',
        'merge',
      ],
    ],
    'header-max-length': [2, 'always', 100],

    // 'function-rules/subject-starts-with-task-id': [
    //   2,
    //   'always',
    //   (parsed) => {
    //     const subject = parsed.subject
    //     const taskIdRegex = /^GAIA-\d+\s/

    //     if (subject && taskIdRegex.test(subject)) {
    //       return [true] 
    //     }
    //     return [
    //       false,
    //       'O subject do commit deve começar com o ID da task (ex: "GAIA-123 ...")',
    //     ] 
    //   },
    // ],
  },
}
