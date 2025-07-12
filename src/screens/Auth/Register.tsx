import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCredentialsRegister } from '@/src/hooks/auth/useCredentialsRegister'
import { useNavigation } from '@react-navigation/native';

import { registerSchema } from '@/src/schemas/register.schema'

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

type FormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [showPassword, setShowPassword] = useState(false);

  const nameInputRef = useRef<TextInput | null>(null)
  const emailInputRef = useRef<TextInput | null>(null)
  const passwordInputRef = useRef<TextInput | null>(null)

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const {
    register: registerUser,
  } = useCredentialsRegister()

  useEffect(() => {
    register('name')
    register('email')
    register('password')
  }, [register])

  const onSubmit = async (data: FormData) => {
    await registerUser(data.name, data.email, data.password)
  }

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
            <View className='mb-8 gap-y-1'>
              <Text className="text-4xl font-bold text-center text-gray-900 dark:text-white">
                Create Account
              </Text>
              <Text className="text-lg text-center text-gray-900 dark:text-white">
                Join our community today
              </Text>
            </View>

            <View className="gap-y-2">
              <CustomTextInput
                ref={nameInputRef}
                placeholder="Full Name"
                returnKeyType="next"
                keyboardType="default"
                onChangeText={(text) => setValue('name', text)}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                autoCapitalize="sentences"
                autoComplete='name'
                inputMode="text"
                value={watch('name')}
                error={errors.name}
              />

              <CustomTextInput
                ref={emailInputRef}
                placeholder="Email"
                returnKeyType="next"
                keyboardType="email-address"
                onChangeText={(text) => setValue('email', text)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                autoCapitalize='none'
                autoComplete='email'
                inputMode={'email'}
                value={watch('email')}
                error={errors.email}
              />

              <CustomTextInput
                ref={passwordInputRef}
                placeholder="Password"
                returnKeyType="done"
                keyboardType="default"
                onChangeText={(text) => setValue('password', text)}
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
                title="Create Account"
              />
            </View>


            <View className="flex-row items-center justify-center mt-4">
              <Text className="text-gray-900 dark:text-white text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-blue-500 font-semibold text-sm">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </AuthTransition>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  contentContainerStyle: { flexGrow: 1 }
})