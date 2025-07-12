import { useColorScheme } from "nativewind";
import { View, Text } from "react-native";

export const RecentActivity = ({ recentActivity }: { recentActivity: string[] }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className={`p-4 rounded-xl mt-2 ${colorScheme === 'light' ? 'bg-gray-100' : 'bg-slate-700'}`}>
      <Text className="text-sm text-slate-800 dark:text-gray-100 font-semibold">
        Recent Activity
      </Text>
      {recentActivity.map((item, index) => (
        <Text
          key={index}
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          {item}
        </Text>
      ))}
    </View>
  );
};