import { fakeStats } from '@/src/data/fakeStats';
import { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-gifted-charts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';

const Home = () => {
  const insets = useSafeAreaInsets();
  const [selectedView, setSelectedView] = useState<'companies' | 'drivers'>(
    'companies',
  );
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'year'>(
    'month',
  );
  const totalCompanies = fakeStats.totalCompanies;
  const totalDrivers = fakeStats.totalDrivers;
  const hasData = totalCompanies === 0 && totalDrivers === 0;

  const [displayCompanies, setDisplayCompanies] = useState(0);
  const [displayDrivers, setDisplayDrivers] = useState(0);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    let comp = 0;
    let driv = 0;

    const compInterval = setInterval(() => {
      if (comp < totalCompanies) {
        setDisplayCompanies(++comp);
      } else {
        clearInterval(compInterval);
      }
    }, 50);

    const drivInterval = setInterval(() => {
      if (driv < totalDrivers) {
        setDisplayDrivers(++driv);
      } else {
        clearInterval(drivInterval);
      }
    }, 50);

    return () => {
      clearInterval(compInterval);
      clearInterval(drivInterval);
    };
  }, [totalCompanies, totalDrivers]);

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
    const values = barData.map(d => d.value);
    const maxVal = Math.max(...values, 0);
    const paddedMax = Math.ceil(maxVal * 1.2) || 10;
    const step = Math.ceil(paddedMax / 4);
    return {
      maxValue: step * 4,
      stepValue: step,
      noOfSections: 4,
    };
  }, [barData]);

  const topLabelTextStyle = {
    color: colorScheme === 'light' ? '#000' : '#f9f9f9',
    fontWeight: 'bold',
    fontSize: 10,
  };

  const xAxisLabelTextStyle = { fontSize: 10, color: '#888' };

  const recentActivity = [
    '✔️ Added Driver: John Doe',
    '✔️ Added Company: Acme Inc',
    '✏️ Updated Company: Roadster Pvt Ltd',
  ];

  return (
    <ScrollView className="flex-1 px-4 pt-5 pb-10 bg-gray-100 dark:bg-black">
      <View style={{ paddingBottom: insets.bottom + 100 }}>
        {hasData ? (
          <View className="flex-1 justify-center items-center space-y-4">
            <Text className="text-lg font-bold text-gray-800 dark:text-white">
              Welcome!
            </Text>
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded">
              <Text className="text-white font-medium">Add Company</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded">
              <Text className="text-white font-medium">Add Driver</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-800 dark:text-white my-10 text-center">
                🚀 Keep expanding your fleet!
              </Text>
              <View className="flex-row justify-center gap-x-4 mb-5">
                <TouchableOpacity className="bg-green-500 gap-x-2 items-center justify-center flex-row p-3 rounded-full shadow-md">
                  <Text className="text-white font-bold">Add Company</Text>
                  <Icon name="building-o" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-blue-500 gap-x-2 items-center justify-center flex-row  p-3 rounded-full shadow-md">
                  <Text className="text-white font-bold">Add Driver</Text>
                  <Icon name="truck" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              {recentActivity.length > 0 && (
                <View className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2 mt-2">
                  <Text className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    Recent Activity
                  </Text>
                  {recentActivity.map((item, index) => (
                    <Text
                      key={index}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            <View className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-4">
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={() => setSelectedView('companies')}
                    className={`px-3 py-1 rounded ${
                      selectedView === 'companies'
                        ? 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`${selectedView === 'companies' ? 'text-white' : 'text-gray-800 dark:text-white'}`}
                    >
                      Companies
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedView('drivers')}
                    className={`px-3 py-1 rounded ${
                      selectedView === 'drivers'
                        ? 'bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`${selectedView === 'drivers' ? 'text-white' : 'text-gray-800 dark:text-white'}`}
                    >
                      Drivers
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={() => setSelectedRange('week')}
                    className={`px-3 py-1 rounded ${
                      selectedRange === 'week'
                        ? selectedView === 'drivers'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`${selectedRange === 'week' ? 'text-white' : 'text-gray-800 dark:text-white'}`}
                    >
                      Week
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedRange('month')}
                    className={`px-3 py-1 rounded ${
                      selectedRange === 'month'
                        ? selectedView === 'drivers'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`${selectedRange === 'month' ? 'text-white' : 'text-gray-800 dark:text-white'}`}
                    >
                      Month
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedRange('year')}
                    className={`px-3 py-1 rounded ${
                      selectedRange === 'year'
                        ? selectedView === 'drivers'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`${selectedRange === 'year' ? 'text-white' : 'text-gray-800 dark:text-white'}`}
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
                  xAxisLabelTextStyle={xAxisLabelTextStyle}
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
                  topLabelTextStyle={topLabelTextStyle}
                  maxValue={chartStats.maxValue}
                  stepValue={chartStats.stepValue}
                  noOfSections={chartStats.noOfSections}
                />
              </View>
            </View>

            <View className="bg-white dark:bg-gray-900 rounded-xl border border-gray-50 dark:border-gray-900 overflow-hidden mb-6">
              <TouchableOpacity className="flex-row justify-between items-center px-4 py-5 border-b border-gray-200 dark:border-gray-700">
                <Text className="text-base font-semibold text-gray-800 dark:text-white">
                  Total Drivers
                </Text>
                <View className="flex-row items-center gap-x-2">
                  <Text className="bg-blue-500 text-white font-semibold text-base rounded-md px-2">
                    {displayDrivers}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={colorScheme === 'dark' ? 'white' : 'gray'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row justify-between items-center px-4 py-5">
                <Text className="text-base font-semibold text-gray-800 dark:text-white">
                  Total Companies
                </Text>
                <View className="flex-row items-center gap-x-2">
                  <Text className="bg-green-500 text-white font-semibold text-base rounded-md px-2">
                    {displayCompanies}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={colorScheme === 'dark' ? 'white' : 'gray'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
