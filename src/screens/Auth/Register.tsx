import React, { useEffect, useRef } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { registerSchema as RegisterSchema } from '@/src/schemas/register.schema'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthTransition } from '@/src/components/transistions/auth-transition'
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput'
import { CustomButton } from '@/src/components/FormElements/CustomButton'

const Register = () => {
  // const [error, setError] = useState<string | null>(null)
  // const [success, setSuccess] = useState<string | null>(null)

  const nameInputRef = useRef<TextInput | null>(null)
  const emailInputRef = useRef<TextInput | null>(null)
  const passwordInputRef = useRef<TextInput | null>(null)

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    register('name')
    register('email')
    register('password')
  }, [register])

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      // setError(null)
      // setSuccess(null)
      // TODO: Call your signup API
      console.log(values);

      // setSuccess('Account created successfully')
    } catch (err: any) {
      // setError(err.message || 'Signup failed')
    }
  }

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
            <View className='gap-y-2 mb-8'>
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
                onChangeText={(text) => setValue('name', text, { shouldValidate: true })}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                autoCapitalize="words"
                inputMode="text"
                value={watch('name')}
                error={errors.name}
              />

              <CustomTextInput
                ref={emailInputRef}
                returnKeyType="next"
                keyboardType="email-address"
                onChangeText={(text) => setValue('email', text, { shouldValidate: true })}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                placeholder="Email"
                error={errors.email}
                value={watch('email')}
                inputMode={'email'}
              />

              <CustomTextInput
                ref={passwordInputRef}
                placeholder="Password"
                returnKeyType="done"
                keyboardType="default"
                onChangeText={(text) => setValue('password', text, { shouldValidate: true })}
                onSubmitEditing={handleSubmit(onSubmit)}
                isSecureEntry={true}
                inputMode="text"
                value={watch('password')}
                error={errors.password}
              />
            </View>

            <CustomButton
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              title="Create Account"
              isLoading={isSubmitting}
            />

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-900 dark:text-white">Already have an account? </Text>
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
