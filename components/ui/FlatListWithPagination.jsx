import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MediumCard } from "./Cards";

const FlatListWithPagination = ({ initialResults}) => {
	return (
		<View>
			<FlatList
				data={initialResults}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <MediumCard item={item} />}
				contentContainerStyle={{ marginBottom: 550 }}
			/>
		</View>
	);
};

export default FlatListWithPagination;

const styles = StyleSheet.create({});
