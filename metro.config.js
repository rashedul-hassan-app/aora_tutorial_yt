const {getDefaultConfig} = require('expo/metro-config');
const {withNativeWind} = require('nativewind/metro');
const {
	wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Start with the default Metro config
let config = getDefaultConfig(__dirname);

// Apply the NativeWind configuration
config = withNativeWind(config, {input: './global.css'});

// Wrap the configuration with Reanimated's configuration
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;
