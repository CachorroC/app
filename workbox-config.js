module.exports = {
  globDirectory: 'public/',

  globPatterns: [
    '**/*.{svg,js, html}'
  ],

  swDest                     : 'public/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
};
