// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
    module.exports = {
      plugins: {
        tailwindcss: {}, // You might have this as a key instead of a value
        autoprefixer: {}, // You might need this for vendor prefixes
        "@tailwindcss/postcss": {},
      },
    };