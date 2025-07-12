/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { COLORS } from "@/src/constants/colors";
import { Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
import { PieCenterLabel } from "./PieChartLabel";
import { useColorScheme } from "nativewind";

type PieChartGraphProps = {
  totalCompanies: number;
  totalDrivers: number;
};

const PieChartGraph = ({
  totalCompanies,
  totalDrivers,
}: PieChartGraphProps) => {
  const { colorScheme } = useColorScheme();
  const pieData = [
    {
      value: totalCompanies,
      color: '#4ADE80',
      gradientCenterColor: '#22C55E',
      focused: true,
    },
    {
      value: totalDrivers,
      color: '#60A5FA',
      gradientCenterColor: '#3B82F6',
    },
  ];
  return (
    <View className={`${colorScheme === 'light' ? 'bg-gray-100' : 'bg-slate-700'} rounded-xl`}>
      <View className='mx-4 mt-4 flex-1'>
        <Text className={`text-center text-md rounded py-3 px-3 text-gray-100 bg-black`}>
          Entity Distribution
        </Text>
      </View>
      <View className='items-center p-1'>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          isThreeD
          showText
          textColor="black"
          radius={120}
          innerRadius={50}
          innerCircleColor={colorScheme === 'dark' ? '#000' : COLORS.backgroundGray200}
          centerLabelComponent={() => <PieCenterLabel totalCompanies={totalCompanies} totalDrivers={totalDrivers} />}
        />
      </View>
      <View className="flex-row justify-center flex-wrap flex-1 pb-5 gap-x-4">
        <View className="flex-row items-center gap-x-1">
          <View
            className='h-2.5 w-2.5 rounded-full'
            style={{
              backgroundColor: COLORS.textBlue500,
            }}
          />
          <Text style={{ color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100 }} className={`text-xs`}>Companies: {totalCompanies}</Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <View
            className='h-2.5 w-2.5 rounded-full'
            style={{
              backgroundColor: COLORS.textBlue500,
            }}
          />
          <Text style={{ color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100 }} className={'text-xs'}>Drivers: {totalDrivers}</Text>
        </View>
      </View>
    </View>
  );
};

export default PieChartGraph;
