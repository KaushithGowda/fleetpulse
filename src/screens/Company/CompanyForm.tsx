/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useColorScheme } from 'nativewind';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUpdateCompany } from '@/src/hooks/company/useUpdateCompany';
import { useCreateCompany } from '@/src/hooks/company/useCreateCompany';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Transition } from '@/src/components/Transistions/Transition';
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { CustomDatePicker } from '@/src/components/FormElements/CustomDatePicker';
import { companySchema } from '@/src/schemas/company.schema';
import { COLORS } from '@/src/constants/colors';

import {
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
} from 'react-native';


type CompanyFormData = z.infer<typeof companySchema>;

type CompanyFormRouteParams = {
    params?: {
        company?: CompanyFormData;
    };
};

const CompanyForm = () => {
    const { bottom } = useSafeAreaInsets();

    const { colorScheme } = useColorScheme();
    const route = useRoute<RouteProp<CompanyFormRouteParams>>();
    const company = route.params?.company;

    const companyName = useRef<TextInput | null>(null);
    const registrationNumber = useRef<TextInput | null>(null);
    const website = useRef<TextInput | null>(null);
    const address1 = useRef<TextInput | null>(null);
    const address2 = useRef<TextInput | null>(null);
    const city = useRef<TextInput | null>(null);
    const state = useRef<TextInput | null>(null);
    const zipCode = useRef<TextInput | null>(null);
    const country = useRef<TextInput | null>(null);
    const primaryFirstName = useRef<TextInput | null>(null);
    const primaryLastName = useRef<TextInput | null>(null);
    const primaryEmail = useRef<TextInput | null>(null);
    const primaryMobile = useRef<TextInput | null>(null);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
    } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            id: company?.id ?? undefined,
            companyName: company?.companyName || '',
            establishedOn: company?.establishedOn ? new Date(company?.establishedOn) : undefined,
            registrationNumber: company?.registrationNumber || '',
            website: company?.website || '',
            address1: company?.address1 || '',
            address2: company?.address2 || '',
            country: company?.country || '',
            state: company?.state || '',
            city: company?.city || '',
            zipCode: company?.zipCode || '',
            primaryFirstName: company?.primaryFirstName || '',
            primaryLastName: company?.primaryLastName || '',
            primaryEmail: company?.primaryEmail || '',
            primaryMobile: company?.primaryMobile || '',
        },
    });

    useFocusEffect(
        useCallback(() => {
            if (!company) {
                reset({
                    id: undefined,
                    companyName: '',
                    establishedOn: undefined,
                    registrationNumber: '',
                    website: '',
                    address1: '',
                    address2: '',
                    country: '',
                    state: '',
                    city: '',
                    zipCode: '',
                    primaryFirstName: '',
                    primaryLastName: '',
                    primaryEmail: '',
                    primaryMobile: '',
                });
            }
        }, [company, reset])
    );

    useEffect(() => {
        register('companyName');
        register('establishedOn');
        register('registrationNumber');
        register('website');
        register('address1');
        register('address2');
        register('country');
        register('state');
        register('city');
        register('zipCode');
        register('primaryFirstName');
        register('primaryLastName');
        register('primaryEmail');
        register('primaryMobile');
    }, [register]);

    const { updateCompany } = useUpdateCompany();
    const { createCompany } = useCreateCompany();

    const onSubmit = async (data: CompanyFormData) => {
        if (company) {
            const response = await updateCompany(data);
            if (response.success) {
                setTimeout(() => navigation.goBack(), 1200);
            }
        } else {
            const response = await createCompany(data);
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
                    contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 py-4">
                        <View className="flex items-center justify-center mb-6">
                            <View className="w-28 h-28 rounded-full bg-blue-600 dark:bg-blue-500 flex justify-center items-center">
                                <Text className="text-white text-center font-extrabold text-5xl">{watch('companyName').charAt(0) || 'C'}</Text>
                            </View>
                        </View>
                        <View className="gap-y-4">
                            <CustomTextInput
                                ref={companyName}
                                label="Company Name"
                                value={watch('companyName')}
                                onChangeText={text => setValue('companyName', text, { shouldValidate: true })}
                                error={errors.companyName}
                                placeholder="Company Name"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onSubmitEditing={() => registrationNumber.current?.focus()}
                                autoCapitalize='words'
                                autoComplete='organization'
                            />
                            <CustomDatePicker
                                placeholder="Established On"
                                value={watch('establishedOn')}
                                onChange={date => setValue('establishedOn', date, { shouldValidate: true })}
                                error={errors.establishedOn as FieldError}
                                label="Established On"
                            />
                            <CustomTextInput
                                ref={registrationNumber}
                                placeholder="Registration Number"
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('registrationNumber', text.toUpperCase(), { shouldValidate: true })}
                                onSubmitEditing={() => website.current?.focus()}
                                inputMode='text'
                                value={watch('registrationNumber')}
                                error={errors.registrationNumber}
                                label="Registration Number"
                                disabled={isSubmitting}
                                autoCapitalize='characters'
                            />
                            <CustomTextInput
                                ref={website}
                                placeholder="Website"
                                returnKeyType="next"
                                keyboardType="url"
                                onChangeText={text => setValue('website', text, { shouldValidate: true })}
                                onSubmitEditing={() => address1.current?.focus()}
                                inputMode='url'
                                value={watch('website')}
                                error={errors.website}
                                label="Website"
                                disabled={isSubmitting}
                                autoCapitalize="none"
                                autoComplete='url'
                            />
                            <CustomTextInput
                                ref={address1}
                                placeholder='Address line 1'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('address1', text, { shouldValidate: true })}
                                error={errors.address1}
                                onSubmitEditing={() => address2.current?.focus()}
                                inputMode='text'
                                value={watch('address1')}
                                label="Address Line 1"
                                disabled={isSubmitting}
                                autoComplete='address-line1'
                                autoCapitalize='sentences'
                            />
                            <CustomTextInput
                                ref={address2}
                                placeholder='Address line 2'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('address2', text, { shouldValidate: true })}
                                error={errors.address2}
                                onSubmitEditing={() => country.current?.focus()}
                                inputMode='text'
                                value={watch('address2') ?? ''}
                                label="Address Line 2"
                                disabled={isSubmitting}
                                autoComplete='address-line2'
                                autoCapitalize='sentences'
                            />
                            <CustomTextInput
                                ref={country}
                                placeholder='Country'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('country', text, { shouldValidate: true })}
                                error={errors.country}
                                onSubmitEditing={() => state.current?.focus()}
                                inputMode='text'
                                value={watch('country')}
                                label="Country"
                                disabled={isSubmitting}
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={state}
                                placeholder='State'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('state', text, { shouldValidate: true })}
                                error={errors.state}
                                onSubmitEditing={() => zipCode.current?.focus()}
                                inputMode='text'
                                value={watch('state')}
                                label="State"
                                disabled={isSubmitting}
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={city}
                                placeholder='City'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('city', text, { shouldValidate: true })}
                                error={errors.city}
                                onSubmitEditing={() => state.current?.focus()}
                                inputMode='text'
                                value={watch('city')}
                                label="City"
                                disabled={isSubmitting}
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={zipCode}
                                placeholder='Zip Code'
                                returnKeyType="next"
                                keyboardType='numeric'
                                onChangeText={text => setValue('zipCode', text, { shouldValidate: true })}
                                error={errors.zipCode}
                                onSubmitEditing={() => country.current?.focus()}
                                inputMode='numeric'
                                value={watch('zipCode')}
                                label="Zip Code"
                                disabled={isSubmitting}
                                autoComplete='postal-code'
                            />
                            <CustomTextInput
                                ref={primaryFirstName}
                                placeholder='First Name'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('primaryFirstName', text, { shouldValidate: true })}
                                error={errors.primaryFirstName}
                                onSubmitEditing={() => primaryLastName.current?.focus()}
                                inputMode='text'
                                value={watch('primaryFirstName')}
                                label="Primary First Name"
                                autoComplete='name'
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={primaryLastName}
                                placeholder='Last Name'
                                returnKeyType="next"
                                keyboardType='default'
                                onChangeText={text => setValue('primaryLastName', text, { shouldValidate: true })}
                                error={errors.primaryLastName}
                                onSubmitEditing={() => primaryEmail.current?.focus()}
                                inputMode='text'
                                value={watch('primaryLastName')}
                                label="Primary Last Name"
                                autoComplete='name'
                                autoCapitalize='words'
                            />
                            <CustomTextInput
                                ref={primaryEmail}
                                placeholder='Email'
                                returnKeyType="next"
                                keyboardType="email-address"
                                onChangeText={text => setValue('primaryEmail', text, { shouldValidate: true })}
                                error={errors.primaryEmail}
                                onSubmitEditing={() => primaryMobile.current?.focus()}
                                inputMode='email'
                                value={watch('primaryEmail')}
                                label="Primary Email"
                                autoComplete='email'
                                autoCapitalize='none'
                            />
                            <CustomTextInput
                                ref={primaryMobile}
                                placeholder='Primary Phone Number'
                                returnKeyType="done"
                                keyboardType="phone-pad"
                                onChangeText={text => setValue('primaryMobile', text, { shouldValidate: true })}
                                error={errors.primaryMobile}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                inputMode='tel'
                                value={watch('primaryMobile')}
                                label="Primary Phone Number"
                                autoComplete='tel'
                            />
                            <CustomButton
                                title="Submit"
                                onPress={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                className="mt-2"
                            />
                        </View>
                    </View>
                </ScrollView>
            </Transition>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
});

export default CompanyForm;