import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";

export const PieCenterLabel = ({ totalCompanies, totalDrivers }: { totalCompanies: number; totalDrivers: number }) => {
    const { colorScheme } = useColorScheme();
    return (
        <View className='flex-1 pb-5 justify-end items-center'>
            <Text className={`text-xs font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                {(totalCompanies + totalDrivers === 0) ? 0 : Math.round((totalCompanies / (totalCompanies + totalDrivers)) * 100)}%
            </Text>
            <Text className={`text-xs ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                {totalDrivers > totalCompanies ? 'Drivers' : 'Companies'}
            </Text>
        </View>
    );
};
