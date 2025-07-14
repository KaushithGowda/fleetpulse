import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";

export const PieCenterLabel = ({ totalCompanies, totalDrivers }: { totalCompanies: number; totalDrivers: number }) => {
    const { colorScheme } = useColorScheme();
    return (
        <View className='flex-1 pb-5 justify-end items-center'>
            <Text className={`text-sm font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                {(totalCompanies + totalDrivers === 0) ? 0 : Math.round((totalCompanies / (totalCompanies + totalDrivers)) * 100)}%
            </Text>
            <Text className={`font-bold italic text-sm ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                {totalDrivers > totalCompanies ? 'Drivers' : 'Companies'}
            </Text>
        </View>
    );
};
