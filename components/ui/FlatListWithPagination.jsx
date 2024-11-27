import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MediumCard } from "./Cards";
import { Card, H5 } from "tamagui";


const FlatListWithPagination = ({ initialResults }) => {
	return (
		<View className="h-[72%]">
			{initialResults.length === 0 ? (
				<Card>
					<H5>Press the Search button to find Tutors.</H5>
                    <Text className={"text-center mt-5"}>Adjust your filters accordingly.</Text>
				</Card>
			) : (
				<FlatList
					data={initialResults}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <MediumCard item={item} />}
				/>
			)}
		</View>
	);
};

export default FlatListWithPagination;

const styles = StyleSheet.create({});
