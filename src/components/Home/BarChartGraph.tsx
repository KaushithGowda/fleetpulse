/* eslint-disable react-native/no-inline-styles */
import { useMemo } from "react";
import { useColorScheme } from "nativewind";

import { COLORS } from "@/src/constants/colors";

import { BarChart } from "react-native-gifted-charts";

import { Text, TouchableOpacity, View } from "react-native";
import { BarAnimation } from "@/src/components/transistions/BarAnimation";

type Range = 'week' | 'month' | 'year';

type ViewType = 'companies' | 'drivers';

type BarChartGraphProps = {
  selectedView: ViewType;
  setSelectedView: (args: ViewType) => void;
  selectedRange: Range;
  setSelectedRange: (args: Range) => void;
  barData: any[];
};

export const BarChartGraph = ({
  selectedView,
  setSelectedView,
  selectedRange,
  setSelectedRange,
  barData,
}: BarChartGraphProps) => {
  const { colorScheme } = useColorScheme();

  const chartStats = useMemo(() => {
    const values = barData.map((d: { value: any; }) => d.value);
    const maxVal = Math.max(...values, 0);
    const paddedMax = Math.ceil(maxVal * 1.2) || 10;
    const step = Math.ceil(paddedMax / 4);
    return {
      maxValue: step * 4,
      stepValue: step,
      noOfSections: 4,
    };
  }, [barData]);

  return (
    <View className={`${colorScheme === 'light' ? 'bg-gray-100' : 'bg-slate-700'} p-4 rounded-xl mb-4`}>
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setSelectedView('companies')}
            className={`p-2 rounded-l ${selectedView === 'companies'
              ? 'bg-black'
              : 'bg-gray-200 dark:bg-gray-800'
              }`}
          >
            <Text
              className={`${selectedView === 'companies' ? 'text-gray-100' : 'text-slate-900 dark:text-gray-100'}`}
            >
              Companies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedView('drivers')}
            className={`p-2 rounded-r ${selectedView === 'drivers'
              ? 'bg-black'
              : 'bg-gray-200 dark:bg-gray-800'
              }`}
          >
            <Text
              className={`${selectedView === 'drivers' ? 'text-gray-100' : 'text-slate-900 dark:text-gray-100'}`}
            >
              Drivers
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={() => setSelectedRange('week')}
            className={`p-2 rounded-l ${selectedRange === 'week'
              ? 'bg-black'
              : 'bg-gray-200 dark:bg-gray-800'
              }`}
          >
            <Text
              className={`${selectedRange === 'week' ? 'text-gray-100' : 'text-slate-900 dark:text-gray-100'}`}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedRange('month')}
            className={`p-2 ${selectedRange === 'month'
              ? 'bg-black'
              : 'bg-gray-200 dark:bg-gray-800'
              }`}
          >
            <Text
              className={`${selectedRange === 'month' ? 'text-gray-100' : 'text-slate-900 dark:text-gray-100'}`}
            >
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedRange('year')}
            className={`p-2 rounded-r ${selectedRange === 'year'
              ? 'bg-black'
              : 'bg-gray-200 dark:bg-gray-800'
              }`}
          >
            <Text
              className={`${selectedRange === 'year' ? 'text-gray-100' : 'text-slate-900 dark:text-gray-100'}`}
            >
              Year
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <BarAnimation>
          <BarChart
            key={`bar-${selectedView}-${selectedRange}`}
            isAnimated={false}
            data={barData}
            barWidth={selectedRange === 'year' ? 20 : 30}
            sideWidth={15}
            isThreeD
            side="right"
            rotateLabel={selectedRange === 'year'}
            xAxisLabelTextStyle={{
              color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100,
              fontWeight: 'bold',
              fontSize: 10,
            }}
            labelsExtraHeight={selectedRange === 'year' ? 20 : 0}
            animationDuration={300}
            scrollAnimation
            initialSpacing={10}
            spacing={selectedRange === 'year' ? 15 : 30}
            scrollToEnd={selectedRange === 'year'}
            showScrollIndicator={selectedRange === 'year'}
            disableScroll={false}
            nestedScrollEnabled
            barBorderRadius={6}
            showValuesAsTopLabel
            hideRules
            hideAxesAndRules
            yAxisLabelWidth={0}
            yAxisThickness={0}
            xAxisThickness={0}
            topLabelTextStyle={{
              fontSize: 15,
              color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100,
            }}
            maxValue={chartStats.maxValue}
            stepValue={chartStats.stepValue}
            noOfSections={chartStats.noOfSections}
          />
        </BarAnimation>

        <Text className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Add more companies and drivers to raise your bar 📊
        </Text>
      </View>
    </View>
  );
};