// import { useEffect, useMemo, useRef, useState } from 'react'
// import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native'
// import { useForm } from 'react-hook-form'

// import { InputFieldRef } from '@/types'

// import { loginSchema } from '@/schemas'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'

// import { VStack } from '@/components/ui/vstack'
// import { Input, InputField } from '@/components/ui/input'
// import { FormControl } from '@/components/ui/form-control'
// import { Text } from '@/components/ui/text'
// import { Button, ButtonText } from '@/components/ui/button'
// import { HStack } from '@/components/ui/hstack'

// import { useRouter } from 'expo-router'

// import { AuthTransition } from '@/components/transistions/auth-transition'

// import { useCredentialsLogin } from '@/hooks/auth/useCredentialsLogin'
// import { showToast } from '@/utils/showToast'
// import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth'

// import { Keyboard, TouchableWithoutFeedback } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  return null
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    login: credLogin,
    error: credError,
    success: credSuccess,
  } = useCredentialsLogin()
  const {
    promptAsync: googlePromptAsync,
    error: googleError,
    success: googleSuccess,
  } = useGoogleAuth()

  const form = useMemo(
    () => ({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    }),
    []
  )

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>(form)

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await credLogin(values.email, values.password)
  }

  useEffect(() => {
    if (credError) showToast({ isError: true, errorMsg: credError })
    if (googleError) showToast({ isError: true, errorMsg: googleError })
    if (credSuccess) showToast({ isSuccess: true, successMsg: credSuccess })
    if (googleSuccess) showToast({ isSuccess: true, successMsg: googleSuccess })
  }, [credError, googleError, credSuccess, googleSuccess])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <AuthTransition>
          <VStack className='flex-1 justify-center' space='2xl'>
            <VStack>
              <Text className='text-4xl font-bold text-typography-0 text-center'>
                Welcome Back
              </Text>
              <Text className='text-lg text-typography-500 text-center'>
                Login to your account
              </Text>
            </VStack>

            <VStack space='sm'>
              <FormControl isInvalid={!!errors.email}>
                <Input
                  variant='outline'
                  size='md'
                  className='bg-white/10 border-0 rounded-lg h-14 uppercase'
                >
                  <InputField
                    ref={emailInputRef as InputFieldRef}
                    autoCapitalize='none'
                    autoComplete='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    onBlur={false}
                    returnKeyType='next'
                    placeholder='Email'
                    placeholderTextColor='#9CA3AF'
                    inputMode='email'
                    onChangeText={(text) => setValue('email', text)}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    className='text-typography-50 uppercase'
                  />
                </Input>
                {errors.email && (
                  <Text className='text-error-400 text-center font-medium text-sm mt-1'>
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <Input
                  variant='outline'
                  size='md'
                  className='bg-white/10 border-0 rounded-lg h-14'
                >
                  <InputField
                    ref={passwordInputRef as InputFieldRef}
                    returnKeyType='done'
                    placeholder='Password'
                    placeholderTextColor='#9CA3AF'
                    onChangeText={(text) => setValue('password', text)}
                    secureTextEntry
                    className='text-typography-50'
                  />
                </Input>
                <Button
                  variant='link'
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <ButtonText>o</ButtonText>
                </Button>
                {errors.password && (
                  <Text className='text-error-400 text-center font-medium text-sm mt-1'>
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <Button
                onPress={handleSubmit(onSubmit)}
                className='rounded-lg h-12 mt-2'
                isDisabled={isSubmitting}
              >
                <ButtonText className='text-typography-200 font-bold'>
                  Login
                </ButtonText>
              </Button>

              <HStack className='flex gap-4 items-center my-4'>
                <View className='flex-1 h-px bg-background-0' />
                <Text className='text-sm text-typography-500 capitalize'>
                  or
                </Text>
                <View className='flex-1 h-px bg-background-0' />
              </HStack>

              <Button
                onPress={() => googlePromptAsync()}
                className='rounded-lg h-12 mt-2'
              >
                <ButtonText className='text-typography-200 font-medium'>
                  Login with Google
                </ButtonText>
              </Button>

              <HStack className='flex items-center justify-center pt-2'>
                <Text className='text-typography-500'>
                  Don't have an account?{' '}
                </Text>
                <Button
                  onPress={() => router.push('/(auth)/register')}
                  variant='link'
                >
                  <ButtonText className='text-info-500 font-medium'>
                    Register
                  </ButtonText>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </AuthTransition>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Login
