/* eslint-disable react-native/no-inline-styles */
import { COLORS } from "@/src/constants/colors";
import { fakeStats } from "@/src/data/fakeStats";
import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export const BarChartGraph = () => {
  const { colorScheme } = useColorScheme();
  const [selectedView, setSelectedView] = useState<'companies' | 'drivers'>(
    'companies',
  );
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'year'>(
    'month',
  );

  // Helper for generating labels for the chart
  const getLabels = (range: 'week' | 'month' | 'year') => {
    if (range === 'year')
      return [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
    if (range === 'month') return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  };

  // Bar data for chart
  const barData = useMemo(() => {
    const rawData = fakeStats[selectedView]?.[selectedRange] ?? [];
    const labels = getLabels(selectedRange);
    const paddedData = [...rawData];
    while (paddedData.length < labels.length) paddedData.push(0);

    return labels.map((label, index) => {
      const value = paddedData[index] ?? 0;
      const isDrivers = selectedView === 'drivers';
      const isDark = colorScheme === 'dark';
      return {
        value,
        label,
        frontColor: isDrivers
          ? isDark
            ? '#3B82F6'
            : '#60A5FA'
          : isDark
            ? '#22C55E'
            : '#4ADE80',
        sideColor: isDrivers
          ? isDark
            ? '#1E40AF'
            : '#3B82F6'
          : isDark
            ? '#166534'
            : '#22C55E',
        topColor: isDrivers
          ? isDark
            ? '#60A5FA'
            : '#BFDBFE'
          : isDark
            ? '#86EFAC'
            : '#BBF7D0',
      };
    });
  }, [selectedView, selectedRange, colorScheme]);

  // Chart stats for axis scaling
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
            fontSize: 10,
            color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100,
          }}
          maxValue={chartStats.maxValue}
          stepValue={chartStats.stepValue}
          noOfSections={chartStats.noOfSections}
        />
      </View>
    </View>
  );
};