import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  YStack,
  XStack,
  Button,
  Text,
  Card,
  Image,
  H3,
  H5,
  Paragraph,
} from "tamagui";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useSearchStore } from "../../store/useSearchStore";

const SearchProfile = () => {
  const router = useRouter();
  const tutor = useSearchStore((state) => state.selectedTutor);

  console.log(tutor);
  if (!tutor) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No tutor selected</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView>
        <YStack padding="$4">
          {/* Back Button */}
          <Button
            icon={<ArrowLeft size="$1" />}
            onPress={() => router.back()}
            size="$4"
            backgroundColor="#6200ea"
            color="white"
            alignSelf="flex-start"
          >
            Back
          </Button>

          {/* Profile Image */}
          <Card marginTop="$4" borderRadius="$6">
            <Image
              source={{ uri: tutor.profileImage }}
              width={"100%"}
              height={250}
              borderRadius="$6"
            />
          </Card>

          {/* Tutor Details */}
          <YStack marginTop="$6" gap="$4">
            <H3>{tutor.name}</H3>
            <Text size="$2" color="gray">{tutor.location}</Text>

            {/* Ratings and Reviews */}
            <XStack gap="$2" alignItems="center">
              <Text size="$3" fontWeight="bold">
                {tutor.rating}
              </Text>
              <Text size="$2" color="gray">
                ({tutor.reviewCount} reviews)
              </Text>
            </XStack>

            {/* About the Tutor */}
            <H5>About Me</H5>
            <Paragraph color="darkgray">
              {tutor.bio}
            </Paragraph>

            {/* Skills */}
            <H5>Languages & Skills</H5>
            <XStack gap="$2" flexWrap="wrap">
              {/* {tutor.languages.map((language, index) => (
                <Text
                  key={index}
                  paddingVertical="$1"
                  paddingHorizontal="$2"
                  borderRadius="$3"
                  backgroundColor="#e0e0e0"
                >
                  {language}
                </Text>
              ))} */}
            </XStack>

            {/* Availability */}
            <H5>Availability</H5>
            <Paragraph color="darkgray">
              {tutor.availability}
            </Paragraph>
          </YStack>

          {/* Book Button */}
          <Button
            marginTop="$8"
            size="$6"
            backgroundColor="#ff5722"
            color="white"
            alignSelf="center"
            borderRadius="$6"
            onPress={() => {
              /* Handle booking logic */
            }}
          >
            Book a Lesson
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchProfile;
