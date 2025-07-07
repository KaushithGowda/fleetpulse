// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { RegisterSchema } from '@/schemas'
// import { useEffect, useState, useRef } from 'react'
// import { TextInput } from 'react-native'
// import { VStack } from '@/components/ui/vstack'
// import { Input, InputField } from '@/components/ui/input'
// import { FormControl } from '@/components/ui/form-control'
// import { Text } from '@/components/ui/text'
// import { Button } from '@/components/ui/button'
// import { Link } from 'expo-router'
// import { HStack } from '@/components/ui/hstack'
// import { AuthTransition } from '@/components/transistions/auth-transition'
// import { useRouter } from 'expo-router'
// import { InputFieldRef } from '@/types'

const Register = () => {
  return null

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const router = useRouter()

  const nameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setError('')
      setSuccess('')
      // TODO: Call your signup API
      setSuccess('Account created successfully')
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    }
  }

  return (
    <AuthTransition>
    <VStack className='flex-1 justify-center' space='2xl'>
      <VStack>
        <Text className='text-4xl font-bold text-typography-0 text-center'>
          Create Account
        </Text>
        <Text className='text-lg text-typography-500 text-center'>
          Join our community today
        </Text>
      </VStack>

      <VStack space='sm'>
        <FormControl isInvalid={!!errors.name}>
          <Input
            variant='outline'
            size='md'
            className='bg-white/10 border-0 rounded-lg h-14'
          >
            <InputField
              ref={nameInputRef as InputFieldRef}
              returnKeyType='next'
              placeholder='Full Name'
              placeholderTextColor='#9CA3AF'
              onChangeText={(text) => setValue('name', text)}
              onSubmitEditing={() => emailInputRef.current?.focus()}
              className='text-typography-50'
            />
          </Input>
          {errors.name && (
            <Text className='text-error-400 text-center font-medium text-sm mt-1'>
              {errors.name.message}
            </Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <Input
            variant='outline'
            size='md'
            className='bg-white/10 border-0 rounded-lg h-14'
          >
            <InputField
              ref={emailInputRef as InputFieldRef}
              returnKeyType='next'
              placeholder='Email'
              placeholderTextColor='#9CA3AF'
              inputMode='email'
              onChangeText={(text) => setValue('email', text)}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              className='text-typography-50'
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
          {errors.password && (
            <Text className='text-error-400 text-center font-medium text-sm mt-1'>
              {errors.password.message}
            </Text>
          )}
        </FormControl>

        {error && (
          <Text className='text-error-400 text-center font-medium'>
            {error}
          </Text>
        )}
        {success && (
          <Text className='text-success-400 text-center font-medium'>
            {success}
          </Text>
        )}

        <Button
          onPress={handleSubmit(onSubmit)}
          className='rounded-lg h-12 mt-2'
          isDisabled={isSubmitting}
        >
          <Text className='text-typography-200 font-bold'>Create Account</Text>
        </Button>

        <HStack className='flex items-center justify-center pt-4'>
          <Text className='text-typography-500'>Already have an account? </Text>
          <Button
            onPress={() => router.push('/(auth)/login')}
            variant='link'
          >
            <Text className='text-info-500 font-medium'>Login</Text>
          </Button>
        </HStack>
      </VStack>
    </VStack>
    </AuthTransition>
  )
}

export default Register
