import { fakeStats } from '@/src/data/fakeStats';
import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/src/constants/colors';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const PieCenterLabel = ({ totalCompanies, totalDrivers }: { totalCompanies: number; totalDrivers: number }) => {
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

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
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
  const { colorScheme } = useColorScheme();

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
    color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100,
    fontWeight: 'bold',
    fontSize: 10,
  };

  const xAxisLabelTextStyle = { fontSize: 10, color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100, };

  const recentActivity = [
    '✔️ Added Driver: John Doe',
    '✔️ Added Company: Acme Inc',
    '✏️ Updated Company: Roadster Pvt Ltd',
  ];

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

  const renderDot = (color: string) => (
    <View
      className='h-2.5 w-2.5 rounded-full'
      style={{
        backgroundColor: color,
      }}
    />
  );

  return (
    <ScrollView className={`flex-1 px-4 pt-5`} style={{
      backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300,
    }}>
      <View className={`flex-1`} style={{ paddingBottom: insets.bottom + 100 }}>
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
              <Text className="text-lg font-semibold text-slate-900 dark:text-gray-100 my-10 text-center">
                🚀 Keep expanding your fleet!
              </Text>
              <View className="flex-row justify-center gap-x-4 mb-5">
                <CustomButton
                  onPress={() => navigation.navigate('CompanyForm')}
                  title='Add Company'
                  className='bg-green-500 rounded-full'
                  rightIconName='office-building-outline'
                />
                <CustomButton
                  onPress={() => navigation.navigate('DriverForm')}
                  title='Add Company'
                  className='bg-blue-500 rounded-full'
                  rightIconName='truck'
                />
              </View>
              {recentActivity.length > 0 && (
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
              )}
            </View>

            <View className={`${colorScheme === 'light' ? 'bg-gray-100' : 'bg-slate-700'} p-4 rounded-xl mb-4`}>
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => setSelectedView('companies')}
                    className={`px-3 py-1 rounded-l ${selectedView === 'companies'
                      ? 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
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
                    className={`px-3 py-1 rounded-r ${selectedView === 'drivers'
                      ? 'bg-blue-500'
                      : 'bg-gray-200 dark:bg-gray-700'
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
                    className={`px-3 py-1 rounded-l ${selectedRange === 'week'
                      ? selectedView === 'drivers'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
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
                    className={`px-3 py-1 ${selectedRange === 'month'
                      ? selectedView === 'drivers'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
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
                    className={`px-3 py-1 rounded-r ${selectedRange === 'year'
                      ? selectedView === 'drivers'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
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
            <View className={`${colorScheme === 'light' ? 'bg-gray-100' : 'bg-slate-700'} rounded-xl`}>
              <View className='mx-4 mt-4 flex-1'>
                <Text className={`w-1/2 text-center text-md rounded py-1 px-3 text-white ${(totalDrivers > totalCompanies) ? 'bg-blue-500' : 'bg-green-500'}`}>
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
                  innerCircleColor={colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray200}
                  centerLabelComponent={() => <PieCenterLabel totalCompanies={totalCompanies} totalDrivers={totalDrivers} />}
                />
              </View>
              <View className="flex-row justify-center flex-wrap flex-1 pb-5 gap-x-4">
                <View className="flex-row items-center gap-x-1">
                  {renderDot('#4ADE80')}
                  <Text style={{ color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100 }} className={`text-xs`}>Companies: {totalCompanies}</Text>
                </View>
                <View className="flex-row items-center gap-x-1">
                  {renderDot('#60A5FA')}
                  <Text style={{ color: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundGray100 }} className={'text-xs'}>Drivers: {totalDrivers}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
