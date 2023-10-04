module.exports = {
  globDirectory: 'public/',

  globPatterns: [
    '**/*.{svg,js, html, png, json}'
  ],

  swDest                     : 'src/app/service-worker.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
};
