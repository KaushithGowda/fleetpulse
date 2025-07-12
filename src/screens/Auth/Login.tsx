import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCredentialsLogin } from '@/src/hooks/auth/useCredentialsLogin';
import { useNavigation } from '@react-navigation/native';

import { loginSchema } from '@/src/schemas/login.schema';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AuthTransition } from '@/src/components/transistions/auth-transition';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/src/constants/colors';

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [showPassword, setShowPassword] = useState(false);
  
  const emailInputRef = useRef<TextInput | null>(null);;
  const passwordInputRef = useRef<TextInput | null>(null);;

  const {
    login: credLogin,
  } = useCredentialsLogin();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = async (data: FormData) => {
    await credLogin(data.email, data.password);
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}
      className="flex-1 px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AuthTransition>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center">
            <View className="mb-16 gap-y-1">
              <Text className="text-4xl font-bold text-center text-gray-900 dark:text-white">Welcome Back</Text>
              <Text className="text-lg text-center text-gray-900 dark:text-white">Login to your account</Text>
            </View>

            <View className="gap-y-2">
              <CustomTextInput
                ref={emailInputRef}
                placeholder="Email"
                returnKeyType="next"
                keyboardType="email-address"
                onChangeText={text => setValue('email', text)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                inputMode="email"
                value={watch('email')}
                error={errors.email}
              />

              <CustomTextInput
                ref={passwordInputRef}
                placeholder="Password"
                returnKeyType="done"
                keyboardType="default"
                onChangeText={text => setValue('password', text)}
                onSubmitEditing={handleSubmit(onSubmit)}
                isSecureEntry={!showPassword}
                toggleSecureEntry={() => setShowPassword(prev => !prev)}
                inputMode="text"
                value={watch('password')}
                error={errors.password}
              />

              <CustomButton
                className='mt-2'
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                title="Login"
              />
            </View>

            <View className="flex-row items-center justify-center gap-2 my-5 px-5">
              <View className="flex-1 h-px bg-gray-400 dark:bg-gray-700" />
              <Text className="text-xs text-gray-500 dark:text-white uppercase px-5">or</Text>
              <View className="flex-1 h-px bg-gray-400 dark:bg-gray-700" />
            </View>

            <View className="flex-row items-center justify-center">
              <Text className="text-gray-900 dark:text-white">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-blue-500 font-semibold text-sm">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </AuthTransition>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  contentContainerStyle: { flexGrow: 1 }
})