import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LanguageSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

const LanguagePicker = ({ selectedLanguages, onLanguageChange, editable = true }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Languages</Text>
      <LanguageSelect
        onChange={(e) => {
          if (editable) {
            const newLanguages = selectedLanguages.includes(e.name)
              ? selectedLanguages.filter((lang) => lang !== e.name)
              : [...selectedLanguages, e.name];
            onLanguageChange(newLanguages);
          }
        }}
        placeHolder="Select Languages"
        isDisabled={!editable}
        isMulti
      />
    </View>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
  },
});
