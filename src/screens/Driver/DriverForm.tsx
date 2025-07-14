/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useColorScheme } from 'nativewind';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCreateDriver } from '@/src/hooks/driver/useCreateDriver';
import { useUpdateDriver } from '@/src/hooks/driver/useUpdateDriver';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Transition } from '@/src/components/Transistions/Transition';
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { CustomDatePicker } from '@/src/components/FormElements/CustomDatePicker';
import { driverSchema } from '@/src/schemas/drivers.schema';
import { COLORS } from '@/src/constants/colors';

import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Text,
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

type DriverFormData = z.infer<typeof driverSchema>;

type DriverFormRouteParams = {
    params?: {
        driver?: DriverFormData;
    };
};

const DriverForm = () => {
    const { bottom } = useSafeAreaInsets();

    const { colorScheme } = useColorScheme();
    const route = useRoute<RouteProp<DriverFormRouteParams>>();
    const driver = route.params?.driver;

    const firstNameRef = useRef<TextInput | null>(null);
    const lastNameRef = useRef<TextInput | null>(null);
    const emailRef = useRef<TextInput | null>(null);
    const mobileRef = useRef<TextInput | null>(null);
    const licenseRef = useRef<TextInput | null>(null);
    const address1Ref = useRef<TextInput | null>(null);
    const address2Ref = useRef<TextInput | null>(null);
    const zipRef = useRef<TextInput | null>(null);
    const countryRef = useRef<TextInput | null>(null);
    const stateRef = useRef<TextInput | null>(null);
    const cityRef = useRef<TextInput | null>(null);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
            id: driver?.id ?? undefined,
            firstName: driver?.firstName || '',
            lastName: driver?.lastName || '',
            email: driver?.email || '',
            mobile: driver?.mobile || '',
            licenseNumber: driver?.licenseNumber || '',
            address1: driver?.address1 || '',
            address2: driver?.address2 || '',
            zipCode: driver?.zipCode || '',
            licenseStartDate: driver?.licenseStartDate ? new Date(driver?.licenseStartDate) : undefined,
            dateOfBirth: driver?.dateOfBirth ? new Date(driver?.dateOfBirth) : undefined,
            country: driver?.country || '',
            state: driver?.state || '',
            city: driver?.city || '',
        },
    });

    useFocusEffect(
        useCallback(() => {
            if (!driver) {
                reset({
                    id: undefined,
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    licenseNumber: '',
                    address1: '',
                    address2: '',
                    zipCode: '',
                    licenseStartDate: undefined,
                    dateOfBirth: undefined,
                    country: '',
                    state: '',
                    city: '',
                });
            }
        }, [driver, reset])
    );

    useEffect(() => {
        register('firstName');
        register('lastName');
        register('email');
        register('mobile');
        register('licenseNumber');
        register('address1');
        register('address2');
        register('zipCode');
        register('licenseStartDate');
        register('dateOfBirth');
        register('country');
        register('state');
        register('city');
    }, [register]);

    const { updateDriver } = useUpdateDriver();
    const { createDriver } = useCreateDriver();

    const onSubmit = async (data: DriverFormData) => {
        if (driver) {
            const response = await updateDriver(data)
            if (response.success) {
                setTimeout(() => navigation.goBack(), 1200);
            }
        } else {
            const response = await createDriver(data)
            if (response.success) {
                setTimeout(() => navigation.goBack(), 1200);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}
            className="flex-1 px-6"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Transition>
                <ScrollView
                    contentContainerStyle={[styles.contentContainerStyle, { paddingBottom: bottom }]}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='flex-1 py-4'>
                        <View className="flex items-center justify-center mb-6">
                            <View className="w-28 h-28 rounded-full bg-blue-600 dark:bg-blue-500 flex justify-center items-center">
                                <Text className="text-white text-center font-extrabold text-5xl">{watch('firstName').charAt(0) || 'D'}</Text>
                            </View>
                        </View>

                        <View className="gap-y-4">
                            <CustomTextInput
                                ref={firstNameRef}
                                placeholder="First Name"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('firstName', text, { shouldValidate: true })}
                                onSubmitEditing={() => lastNameRef.current?.focus()}
                                inputMode="text"
                                value={watch('firstName')}
                                error={errors.firstName}
                                label='First Name'
                                disabled={isSubmitting}
                                autoCapitalize='words'
                                autoComplete='name'
                            />
                            <CustomTextInput
                                ref={lastNameRef}
                                placeholder="Last Name"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('lastName', text, { shouldValidate: true })}
                                onSubmitEditing={() => emailRef.current?.focus()}
                                inputMode="text"
                                value={watch('lastName')}
                                error={errors.lastName}
                                label='Last Name'
                                disabled={isSubmitting}
                                autoCapitalize='words'
                                autoComplete='name'
                            />
                            <CustomDatePicker
                                placeholder="Date of Birth"
                                value={watch('dateOfBirth')}
                                onChange={(date) => setValue('dateOfBirth', date, { shouldValidate: true })}
                                error={errors.dateOfBirth as FieldError}
                                label='Date of Birth'
                            />
                            <CustomTextInput
                                ref={emailRef}
                                placeholder="Email"
                                returnKeyType="next"
                                keyboardType="email-address"
                                onChangeText={(text) => setValue('email', text, { shouldValidate: true })}
                                onSubmitEditing={() => mobileRef.current?.focus()}
                                inputMode="email"
                                value={watch('email')}
                                error={errors.email}
                                label='Email Address'
                                disabled={isSubmitting}
                                autoCapitalize='none'
                                autoComplete='email'
                            />
                            <CustomTextInput
                                ref={mobileRef}
                                placeholder="Mobile"
                                returnKeyType="next"
                                keyboardType="phone-pad"
                                onChangeText={(text) => setValue('mobile', text, { shouldValidate: true })}
                                onSubmitEditing={() => licenseRef.current?.focus()}
                                inputMode="tel"
                                value={watch('mobile')}
                                error={errors.mobile}
                                label='Phone Number'
                                disabled={isSubmitting}
                                autoComplete='tel'
                            />
                            <CustomTextInput
                                ref={licenseRef}
                                placeholder="License"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('licenseNumber', text.toUpperCase(), { shouldValidate: true })}
                                onSubmitEditing={() => address1Ref.current?.focus()}
                                inputMode="text"
                                value={watch('licenseNumber')}
                                error={errors.licenseNumber}
                                label='License Number'
                                disabled={isSubmitting}
                                autoCapitalize='characters'
                            />
                            <CustomDatePicker
                                placeholder='License Start date'
                                value={watch('licenseStartDate')}
                                onChange={(date) => setValue('licenseStartDate', date, { shouldValidate: true })}
                                error={errors.licenseStartDate as FieldError}
                                label='License Issue Date'
                                disabled={isSubmitting}
                            />
                            <CustomTextInput
                                ref={address1Ref}
                                placeholder="Address 1"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('address1', text, { shouldValidate: true })}
                                onSubmitEditing={() => address2Ref.current?.focus()}
                                inputMode="text"
                                value={watch('address1') ?? ''}
                                error={errors.address1}
                                label='Address Line 1'
                                disabled={isSubmitting}
                                autoComplete='address-line1'
                                autoCapitalize='sentences'
                            />
                            <CustomTextInput
                                ref={address2Ref}
                                placeholder="Address 2"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('address2', text, { shouldValidate: true })}
                                onSubmitEditing={() => zipRef.current?.focus()}
                                inputMode="text"
                                value={watch('address2') ?? ''}
                                error={errors.address2}
                                label='Address Line 2'
                                disabled={isSubmitting}
                                autoComplete='address-line2'
                                autoCapitalize='sentences'
                            />
                            <CustomTextInput
                                ref={countryRef}
                                placeholder="Country"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('country', text, { shouldValidate: true })}
                                onSubmitEditing={() => stateRef.current?.focus()}
                                inputMode="text"
                                value={watch('country')}
                                error={errors.country}
                                label='Country'
                                disabled={isSubmitting}
                                autoComplete='country'
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={stateRef}
                                placeholder="State"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('state', text, { shouldValidate: true })}
                                onSubmitEditing={() => cityRef.current?.focus()}
                                inputMode="text"
                                value={watch('state')}
                                error={errors.state}
                                label='State'
                                disabled={isSubmitting}
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={cityRef}
                                placeholder="City"
                                returnKeyType="done"
                                keyboardType="default"
                                onChangeText={(text) => setValue('city', text, { shouldValidate: true })}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                inputMode="text"
                                value={watch('city')}
                                error={errors.city}
                                label='City'
                                disabled={isSubmitting}
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={zipRef}
                                placeholder="Zip Code"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('zipCode', text, { shouldValidate: true })}
                                inputMode="text"
                                value={watch('zipCode')}
                                error={errors.zipCode}
                                label='Zip code'
                                disabled={isSubmitting}
                            />
                            <CustomButton
                                title='Submit'
                                onPress={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                className='mt-2'
                            />
                        </View>
                    </View>
                </ScrollView>
            </Transition>
        </KeyboardAvoidingView>
    );
};

export default DriverForm;

const styles = StyleSheet.create({
    contentContainerStyle: { flexGrow: 1 }
})