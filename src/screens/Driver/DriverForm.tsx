import React, { useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { z } from 'zod';

import { AuthTransition } from '@/src/components/transistions/auth-transition';
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { CustomDatePicker } from '@/src/components/FormElements/CustomDatePicker';
import { CustomSelect } from '@/src/components/FormElements/CustomSelect';
import { Country, State, City } from 'country-state-city';

const driverSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    mobile: z.string().min(10, 'Mobile number is required'),
    licenseNumber: z.string().min(1, 'License number is required'),
    address1: z.string().min(1, 'Address 1 is required'),
    address2: z.string().optional(),
    zipCode: z.string().min(1, 'Zip Code is required'),
    licenseStartDate: z.date({ required_error: 'License start date is required' }),
    dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
    country: z.string().min(1, 'Country is required'),
    state: z.string().refine((val) => val.length > 0, {
        message: 'State is required',
        path: ['state'],
    }),
    city: z.string().refine((val) => val.length > 0, {
        message: 'City is required',
        path: ['city'],
    }),
});

type DriverFormData = z.infer<typeof driverSchema>;

const DriverForm = () => {
    const firstNameRef = useRef<TextInput | null>(null);
    const lastNameRef = useRef<TextInput | null>(null);
    const emailRef = useRef<TextInput | null>(null);
    const mobileRef = useRef<TextInput | null>(null);
    const licenseRef = useRef<TextInput | null>(null);
    const address1Ref = useRef<TextInput | null>(null);
    const address2Ref = useRef<TextInput | null>(null);
    const zipRef = useRef<TextInput | null>(null);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<DriverFormData>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
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
            city: ''
        },
    });

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [countryList, setCountryList] = useState<{ label: string; value: string }[]>([]);
    const [stateList, setStateList] = useState<{ label: string; value: string }[]>([]);
    const [cityList, setCityList] = useState<{ label: string; value: string }[]>([]);

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

    useEffect(() => {
        const countries = Country.getAllCountries().map((c) => ({
            label: c.name,
            value: c.isoCode,
        }));
        setCountryList(countries);
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry).map((s) => ({
                label: s.name,
                value: s.isoCode,
            }));
            setStateList(states);
        } else {
            setStateList([]);
        }

        setSelectedState('');
        setSelectedCity('');
        setCityList([]);
        setValue('state', '', { shouldValidate: false }); // ✅ avoid premature validation
        setValue('city', '', { shouldValidate: false });  // ✅ avoid premature validation
    }, [selectedCountry, setValue]);

    useEffect(() => {
        if (selectedState && selectedCountry) {
            const cities = City.getCitiesOfState(selectedCountry, selectedState).map((c) => ({
                label: c.name,
                value: c.name,
            }));
            setCityList(cities);
        } else {
            setCityList([]);
        }

        setSelectedCity('');
        setValue('city', '', { shouldValidate: false }); // ✅ avoid premature validation
    }, [selectedCountry, selectedState, setValue]);

    const onSubmit = (values: DriverFormData) => {
        console.log('Driver Submitted', values);
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-100 dark:bg-black"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <AuthTransition>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='flex-1 px-6 p-4'>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Add Driver Details
                        </Text>

                        <View className="flex items-center justify-center mb-6">
                            <View className="w-28 h-28 rounded-full bg-blue-600 dark:bg-blue-500 flex justify-center items-center">
                                <Text className="text-white text-center font-extrabold text-5xl">{watch('firstName').charAt(0) || 'D'}</Text>
                            </View>
                        </View>

                        <View className="gap-y-2">
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
                            />
                            <CustomTextInput
                                ref={mobileRef}
                                placeholder="Mobile #"
                                returnKeyType="next"
                                keyboardType="phone-pad"
                                onChangeText={(text) => setValue('mobile', text, { shouldValidate: true })}
                                onSubmitEditing={() => licenseRef.current?.focus()}
                                inputMode="tel"
                                value={watch('mobile')}
                                error={errors.mobile}
                            />
                            <CustomTextInput
                                ref={licenseRef}
                                placeholder="License #"
                                returnKeyType="next"
                                keyboardType="default"
                                onChangeText={(text) => setValue('licenseNumber', text, { shouldValidate: true })}
                                onSubmitEditing={() => address1Ref.current?.focus()}
                                inputMode="text"
                                value={watch('licenseNumber')}
                                error={errors.licenseNumber}
                            />
                            <CustomDatePicker
                                placeholder='License Start date'
                                value={watch('licenseStartDate')}
                                onChange={(date) => setValue('licenseStartDate', date, { shouldValidate: true })}
                                error={errors.licenseStartDate}
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
                            />
                            <CustomTextInput
                                ref={zipRef}
                                placeholder="Zip Code"
                                returnKeyType="done"
                                keyboardType="default"
                                onChangeText={(text) => setValue('zipCode', text, { shouldValidate: true })}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                inputMode="text"
                                value={watch('zipCode')}
                                error={errors.zipCode}
                            />
                            <CustomDatePicker
                                placeholder="Date of Birth"
                                value={watch('dateOfBirth')}
                                onChange={(date) => setValue('dateOfBirth', date, { shouldValidate: true })}
                                error={errors.dateOfBirth}
                            />
                            <CustomSelect
                                items={countryList}
                                value={selectedCountry}
                                onValueChange={(value) => {
                                    setSelectedCountry(value);
                                    setValue('country', value, { shouldValidate: true }); // ✅ already correct
                                }}
                                placeholder="Select Country"
                                error={errors.country}
                            />

                            <CustomSelect
                                items={stateList}
                                value={selectedState}
                                onValueChange={(value) => {
                                    setSelectedState(value);
                                    setValue('state', value, { shouldValidate: true }); // ✅ add this line
                                }}
                                placeholder="Select State"
                                error={errors.state}
                                disabled={!selectedCountry}
                            />

                            <CustomSelect
                                items={cityList}
                                value={selectedCity}
                                onValueChange={(value) => {
                                    setSelectedCity(value);
                                    setValue('city', value, { shouldValidate: true }); // ✅ add this line
                                }}
                                placeholder="Select City"
                                error={errors.city}
                                disabled={!selectedState}
                            />
                        </View>

                        <CustomButton
                            title="Submit"
                            onPress={handleSubmit(onSubmit)}
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                        />
                    </View>
                </ScrollView>
            </AuthTransition>
        </KeyboardAvoidingView>
    );
};

export default DriverForm;