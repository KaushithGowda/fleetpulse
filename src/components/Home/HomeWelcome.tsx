import { Text, View } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButton } from "../FormElements/CustomButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const HomeWelcome = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    return <View className='flex-1 justify-end'>
        <View className='gap-y-1 justify-around'>
            <View className='h-2/6 justify-end'>
                <Text className="text-3xl font-extralight text-gray-400 dark:text-gray-100">
                    Hey there,
                </Text>
                <Text className="text-wrap text-7xl font-bold text-slate-900 dark:text-gray-100">
                    Kaushith
                </Text>
            </View>
            <View className='items-center justify-center h-4/6'>
                <MaterialCommunityIcons name="book-open-variant" size={200} color="#4B5563" />
                <View className='gap-y-1 items-center'>
                    <Text className="text-lg text-slate-800 dark:text-gray-100">
                        Welcome to Fleetpulse Club🚀
                    </Text>
                    <Text className="text-sm font-light text-gray-600 dark:text-gray-400 flex-row items-center">
                        The place to manage your companies and teams
                    </Text>
                    <Text className="text-sm font-light text-gray-600 dark:text-gray-400 flex-row items-center">
                        Rule 1: You never talk about fleet club!
                    </Text>
                    <Text className="text-sm font-light text-gray-600 dark:text-gray-400 flex-row items-center">
                        Rule 2: You never talk about fleet club!
                    </Text>
                </View>
            </View>
        </View>
        <View className=''>
            <CustomButton
                onPress={() => navigation.navigate('CompanyTab')}
                title="Get Started"
                className="bg-blue-500"
                rightIconName="arrow-right-drop-circle"
            />
        </View>
    </View>
}

export default HomeWelcome