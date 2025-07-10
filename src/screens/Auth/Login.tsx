import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/src/schemas/login.schema';
import { AuthTransition } from '@/src/components/transistions/auth-transition';
import { useCredentialsLogin } from '@/src/hooks/auth/useCredentialsLogin';
import { showToast } from '@/src/utils/showToast';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput';
import { CustomButton } from '@/src/components/FormElements/CustomButton';

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef<TextInput | null>(null);;
  const passwordInputRef = useRef<TextInput | null>(null);;
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const {
    login: credLogin,
    error: credError,
    success: credSuccess,
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

  useEffect(() => {
    if (credError) showToast({ isError: true, errorMsg: credError });
    if (credSuccess) showToast({ isSuccess: true, successMsg: credSuccess });
  }, [credError, credSuccess]);

  const onSubmit = async (data: FormData) => {
    await credLogin(data.email, data.password);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100 dark:bg-black"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AuthTransition>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6">
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
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                title="Login"
                isLoading={isSubmitting}
              />
            </View>

            <View className="flex-row items-center justify-center gap-2 my-5 px-5">
              <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <Text className="text-xs text-gray-500 dark:text-white uppercase px-5">or</Text>
              <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
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
