import { useMemo, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHomeStats } from '@/src/hooks/home/useHomeStats';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '@/src/constants/colors';

import { Transition } from '@/src/components/Transistions/Transition';

import { View, Text, ScrollView, StyleSheet } from 'react-native';

import HomeWelcome from '@/src/components/Home/HomeWelcome';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { RecentActivity } from '@/src/components/Home/RecentActivity';
import { BarChartGraph } from '@/src/components/Home/BarChartGraph';
import PieChartGraph from '@/src/components/Home/PieChartGraph';

const Home = () => {
  const { stats } = useHomeStats()
  const { colorScheme } = useColorScheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [selectedView, setSelectedView] = useState<'companies' | 'drivers'>('companies');
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'year'>('week');

  const getLabels = (range: 'week' | 'month' | 'year') => {
    if (range === 'year') return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (range === 'month') return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  };

  const labels = getLabels(selectedRange);
  const rawStatsMemo = useMemo(() => stats?.[selectedView]?.[selectedRange] ?? [], [stats, selectedView, selectedRange]);

  const isDark = colorScheme === 'dark';

  const barData = useMemo(() => {
    const paddedData = [...rawStatsMemo];
    while (paddedData.length < labels.length) paddedData.push(0);
    return labels.map((label, index) => {
      const value = paddedData[index] ?? 0;
      const isDrivers = selectedView === 'drivers';
      return {
        value,
        label,
        frontColor: isDrivers
          ? isDark ? '#3B82F6' : '#60A5FA'
          : isDark ? '#22C55E' : '#4ADE80',
        sideColor: isDrivers
          ? isDark ? '#1E40AF' : '#3B82F6'
          : isDark ? '#166534' : '#22C55E',
        topColor: isDrivers
          ? isDark ? '#60A5FA' : '#BFDBFE'
          : isDark ? '#86EFAC' : '#BBF7D0',
      };
    }
    )
  }, [rawStatsMemo, labels, selectedView, isDark]);

  const recentActivity = [
    ...(stats?.recentActivity?.latestCompany ? [`✅ Latest Onboarded Company: ${stats.recentActivity.latestCompany.companyName}`] : []),
    ...(stats?.recentActivity?.latestDriver ? [`✅ Latest Onboarded Driver: ${stats.recentActivity.latestDriver.firstName} ${stats.recentActivity.latestDriver.lastName}`] : []),
  ];

  const insets = useSafeAreaInsets();

  const totalCompanies = stats?.totalCompanies ?? 0
  const totalDrivers = stats?.totalDrivers ?? 0
  const hasData = totalCompanies === 0 && totalDrivers === 0

  return (
    <View className={`flex-1 px-6`} style={{
      backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300,
      paddingBottom: insets.bottom + 50
    }}>
      <Transition>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps="handled"
        >
          {hasData ? (
            <HomeWelcome />
          ) : (
            <>
              <View className="mb-4">
                <Text className="text-lg font-semibold text-slate-900 dark:text-gray-100 my-10 text-center">
                  🚀 Keep expanding your fleet!
                </Text>
                <View className="flex-row justify-center gap-x-4 mb-5">
                  <CustomButton
                    onPress={() => navigation.navigate('CompanyTab')}
                    title='Add Company'
                    rightIconName='office-building-outline'
                  />
                  <CustomButton
                    onPress={() => navigation.navigate('DriverTab')}
                    title='Add Driver'
                    rightIconName='truck'
                  />
                </View>
                {recentActivity?.length > 0 && (
                  <RecentActivity recentActivity={recentActivity} />
                )}
              </View>
              <BarChartGraph
                selectedView={selectedView}
                selectedRange={selectedRange}
                setSelectedView={setSelectedView}
                setSelectedRange={setSelectedRange}
                barData={barData}
              />
              <PieChartGraph totalCompanies={totalCompanies} totalDrivers={totalDrivers} />
            </>
          )}
        </ScrollView>
      </Transition>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainerStyle: { flexGrow: 1 }
})