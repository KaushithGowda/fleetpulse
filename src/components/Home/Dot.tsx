import { View } from "react-native";

export const Dot = (color: string) => (
    <View
        className='h-2.5 w-2.5 rounded-full'
        style={{
            backgroundColor: color,
        }}
    />
);