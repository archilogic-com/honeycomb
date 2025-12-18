const branch = process.env.GITHUB_REF_NAME || ''
const isPrerelease = branch.startsWith('test-') || branch === 'beta'

export default {
  branches: [
    'main',
    'next',
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'test-*',
      prerelease: true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogTitle: '# Changelog'
      }
    ],
    '@semantic-release/npm',
    // only create GitHub releases and tags for non-prerelease branches
    ...(isPrerelease
      ? []
      : [
          [
            '@semantic-release/github',
            {
              successComment: false,
              failComment: false
            }
          ]
        ]),
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
}
