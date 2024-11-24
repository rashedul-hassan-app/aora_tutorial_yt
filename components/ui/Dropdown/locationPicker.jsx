import React, { useState, useEffect } from 'react';
import { YStack, XStack, Button, Sheet, ScrollView, Text, Input } from 'tamagui';
// import countries from '../../../constants/json/countriesminified.json'; // Import country data
import countries from '../../../constants/json/countriesAndEmoji.json'; // Import country data

  const LocationPicker = ({ selectedCountry, onCountryChange, editable = true }) => {
  const [open, setOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchText, setSearchText] = useState('');

  // useEffect(() => {
  //   const updated = [];
  //   countries.map((item) => {
  //     const filteredName = item.name;
  //     const filteredEmoji = item.emoji;
  //     updated.push({ name: filteredName, emoji: filteredEmoji });
  //   } );
  //   console.log(updated);
  // }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText]);

  const handleCountrySelect = (country) => {
    onCountryChange(country);
    setOpen(false);
  };

  return (
    <YStack gap="$4">
      {/* Display selected country */}
      <XStack alignItems="center">
        <Text color="white">Selected Country: </Text>
        <Text color="white" fontWeight="bold">
          {selectedCountry ? `${selectedCountry.emoji} ${selectedCountry.name}` : 'None'}
        </Text>
      </XStack>

      {/* Open dropdown button */}
      <Button
        theme="blue"
        size="$4"
        onPress={() => editable && setOpen(true)}
        disabled={!editable}
      >
        {selectedCountry ? 'Change Country' : 'Select Country'}
      </Button>

      {/* Country picker modal */}
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[90]}
        dismissOnSnapToBottom
        animation="smooth"
      >
        <YStack padding="$4" gap="$4" backgroundColor="#161622">
          {/* Search input */}
          <Input
            placeholder="Search country"
            value={searchText}
            onChangeText={setSearchText}
            borderColor="#444"
            color="white"
            backgroundColor="#222"
            borderRadius="$4"
          />

          {/* Scrollable country list */}
          <ScrollView height={400}>
            {filteredCountries.map((country) => (
              <Button
                key={country.name}
                justifyContent="flex-start"
                backgroundColor="#222"
                color="white"
                onPress={() => handleCountrySelect(country)}
                marginBottom="$2"
              >
                <XStack gap="$2" alignItems="center">
                  <Text>{country.emoji}</Text>
                  <Text>{country.name}</Text>
                </XStack>
              </Button>
            ))}
          </ScrollView>
        </YStack>
      </Sheet>
    </YStack>
  );
};

export default LocationPicker;
