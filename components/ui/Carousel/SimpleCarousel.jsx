import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const SimpleCarousel = ({ data }) => {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 3}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={3000}
                onSnapToItem={(index, value) => console.log('current index:', index, data[index])}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {item}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

export default SimpleCarousel;