import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
	try {
		const jsonValue = await JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error('Error saving data to local storage ', error);
	}
};

export const readData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : value;
	} catch (error) {
		console.error('Error reading data from local storage ', error);
		return null;
	}
};

export const removeData = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.error('Error removing data from AsyncStorage', error);
	}
};
