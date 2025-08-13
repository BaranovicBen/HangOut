// metro.config.cjs
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// pridaj .ics medzi assety (a pre istotu ho zhoď zo sourceExts)
config.resolver.assetExts = [...config.resolver.assetExts, 'ics'];
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'ics');

module.exports = config;