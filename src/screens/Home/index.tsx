import { fakeStats } from '@/src/data/fakeStats';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/src/constants/colors';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useHomeStats } from '@/src/hooks/home/useHomeStats';
import { AuthTransition } from '@/src/components/transistions/auth-transition';
import HomeWelcome from '@/src/components/Home/HomeWelcome';
import { RecentActivity } from '@/src/components/Home/RecentActivity';
import { BarChartGraph } from '@/src/components/Home/BarChartGraph';
// import { PieCenterLabel } from '@/src/components/Home/PieChartLabel';
import PieChartGraph from '@/src/components/Home/PieChartGraph';

const Home = () => {
  // const { stats, isLoading, isError } = useHomeStats()

  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  // const rawData = stats?.[selectedView]?.[selectedRange] ?? []
  // const recentActivity = [
  //   ...(stats?.recentActivity?.latestCompany ? [`✔️ Added Company: ${stats.recentActivity.latestCompany.companyName}`] : []),
  //   ...(stats?.recentActivity?.latestDriver ? [`✔️ Added Driver: ${stats.recentActivity.latestDriver.firstName} ${stats.recentActivity.latestDriver.lastName}`] : []),
  // ]
  const insets = useSafeAreaInsets();
  const totalCompanies = fakeStats.totalCompanies;
  const totalDrivers = fakeStats.totalDrivers;
  const hasData = totalCompanies === 0 && totalDrivers === 0;
  const { colorScheme } = useColorScheme();

  const recentActivity = [
    '✔️ Added Driver: John Doe',
    '✔️ Added Company: Acme Inc',
    '✏️ Updated Company: Roadster Pvt Ltd',
  ];

  // const totalCompanies = stats?.totalCompanies ?? 0
  // const totalDrivers = stats?.totalDrivers ?? 0
  // const hasData = totalCompanies === 0 && totalDrivers === 0

  return (
    <View className={`flex-1 px-6`} style={{
      backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300,
      paddingBottom: insets.bottom + 50
    }}>
      <AuthTransition>
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
                    onPress={() => navigation.navigate('CompanyForm')}
                    title='Add Company'
                    rightIconName='office-building-outline'
                  />
                  <CustomButton
                    onPress={() => navigation.navigate('DriverForm')}
                    title='Add Driver'
                    rightIconName='truck'
                  />
                </View>
                {recentActivity.length > 0 && (
                  <RecentActivity recentActivity={recentActivity} />
                )}
              </View>
              <BarChartGraph />
              <PieChartGraph totalCompanies={20} totalDrivers={20}/>
            </>
          )}
        </ScrollView>
      </AuthTransition>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainerStyle: { flexGrow: 1 }
})