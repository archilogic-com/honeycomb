module.exports = {
  '*.{ts,vue}': ['vue-tsc --noEmit'],
  '*.{js,ts,vue}': ['eslint --fix'],
  '*': ['prettier -w -u']
}
