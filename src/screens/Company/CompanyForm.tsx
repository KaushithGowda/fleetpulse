import React, { useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AuthTransition } from '@/src/components/transistions/auth-transition';
import { CustomTextInput } from '@/src/components/FormElements/CustomTextInput';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { CustomDatePicker } from '@/src/components/FormElements/CustomDatePicker';

const companyFormSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    establishedOn: z.date({ required_error: 'Established date is required' }),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    address1: z.string().min(1, 'Address line 1 is required'),
    address2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    primaryFirstName: z.string().min(1, 'First name is required'),
    primaryLastName: z.string().min(1, 'Last name is required'),
    primaryEmail: z.string().email('Invalid email address'),
    primaryMobile: z.string().min(1, 'Mobile number is required'),
});

type CompanyFormFields = z.infer<typeof companyFormSchema>;

const CompanyForm: React.FC = () => {
    const companyNameRef = useRef<any>(null);
    const establishedOnRef = useRef<any>(null);
    const registrationNumberRef = useRef<any>(null);
    const websiteRef = useRef<any>(null);
    const address1Ref = useRef<any>(null);
    const address2Ref = useRef<any>(null);
    const cityRef = useRef<any>(null);
    const stateRef = useRef<any>(null);
    const zipCodeRef = useRef<any>(null);
    const primaryFirstNameRef = useRef<any>(null);
    const primaryLastNameRef = useRef<any>(null);
    const primaryEmailRef = useRef<any>(null);
    const primaryMobileRef = useRef<any>(null);

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CompanyFormFields>({
        resolver: zodResolver(companyFormSchema),
        defaultValues: {
            companyName: '',
            establishedOn: undefined,
            registrationNumber: '',
            website: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
            primaryFirstName: '',
            primaryLastName: '',
            primaryEmail: '',
            primaryMobile: '',
        },
    });

    useEffect(() => {
        register('companyName');
        register('establishedOn');
        register('registrationNumber');
        register('website');
        register('address1');
        register('address2');
        register('city');
        register('state');
        register('zipCode');
        register('primaryFirstName');
        register('primaryLastName');
        register('primaryEmail');
        register('primaryMobile');
    }, [register]);


    const onSubmit = (data: CompanyFormFields) => {
        console.log(data);
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-100 dark:bg-black"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <AuthTransition>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='flex-1 px-6 p-4'>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Add Company Details
                        </Text>

                        <View className="flex items-center justify-center mb-6">
                            <View className="w-28 h-28 rounded-full bg-blue-600 dark:bg-blue-500 flex justify-center items-center">
                                <Text className="text-white text-center font-extrabold text-5xl">{watch('companyName').charAt(0) || 'C'}</Text>
                            </View>
                        </View>

                        <View className="gap-y-4">
                            <CustomTextInput
                                ref={companyNameRef}
                                placeholder="Company Name"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('companyName', text, { shouldValidate: true })}
                                onSubmitEditing={() => establishedOnRef.current?.focus()}
                                value={watch('companyName')}
                                error={errors.companyName}
                            />
                            <CustomDatePicker
                                placeholder='Established On'
                                value={watch('establishedOn')}
                                onChange={(date) => setValue('establishedOn', date, { shouldValidate: true })}
                                error={errors.establishedOn}
                            />
                            <CustomTextInput
                                ref={registrationNumberRef}
                                placeholder="Registration Number"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('registrationNumber', text, { shouldValidate: true })}
                                onSubmitEditing={() => websiteRef.current?.focus()}
                                value={watch('registrationNumber')}
                                error={errors.registrationNumber}
                            />
                            <CustomTextInput
                                ref={websiteRef}
                                placeholder="Website"
                                returnKeyType="next"
                                keyboardType="url"
                                inputMode="text"
                                onChangeText={(text) => setValue('website', text, { shouldValidate: true })}
                                onSubmitEditing={() => address1Ref.current?.focus()}
                                value={watch('website') ?? ''}
                                error={errors.website}
                                autoCapitalize="none"
                            />
                            <CustomTextInput
                                ref={address1Ref}
                                placeholder="Address Line 1"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('address1', text, { shouldValidate: true })}
                                onSubmitEditing={() => address2Ref.current?.focus()}
                                value={watch('address1')}
                                error={errors.address1}
                            />
                            <CustomTextInput
                                ref={address2Ref}
                                placeholder="Address Line 2"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('address2', text, { shouldValidate: true })}
                                onSubmitEditing={() => cityRef.current?.focus()}
                                value={watch('address2') ?? ''}
                                error={errors.address2}
                            />
                            <CustomTextInput
                                ref={cityRef}
                                placeholder="City"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('city', text, { shouldValidate: true })}
                                onSubmitEditing={() => stateRef.current?.focus()}
                                value={watch('city')}
                                error={errors.city}
                            />
                            <CustomTextInput
                                ref={stateRef}
                                placeholder="State"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('state', text, { shouldValidate: true })}
                                onSubmitEditing={() => zipCodeRef.current?.focus()}
                                value={watch('state')}
                                error={errors.state}
                            />
                            <CustomTextInput
                                ref={zipCodeRef}
                                placeholder="Zip Code"
                                returnKeyType="next"
                                keyboardType="numeric"
                                inputMode="text"
                                onChangeText={(text) => setValue('zipCode', text, { shouldValidate: true })}
                                onSubmitEditing={() => primaryFirstNameRef.current?.focus()}
                                value={watch('zipCode')}
                                error={errors.zipCode}
                            />
                            <CustomTextInput
                                ref={primaryFirstNameRef}
                                placeholder="Primary Contact First Name"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('primaryFirstName', text, { shouldValidate: true })}
                                onSubmitEditing={() => primaryLastNameRef.current?.focus()}
                                value={watch('primaryFirstName')}
                                error={errors.primaryFirstName}
                            />
                            <CustomTextInput
                                ref={primaryLastNameRef}
                                placeholder="Primary Contact Last Name"
                                returnKeyType="next"
                                keyboardType="default"
                                inputMode="text"
                                onChangeText={(text) => setValue('primaryLastName', text, { shouldValidate: true })}
                                onSubmitEditing={() => primaryEmailRef.current?.focus()}
                                value={watch('primaryLastName')}
                                error={errors.primaryLastName}
                            />
                            <CustomTextInput
                                ref={primaryEmailRef}
                                placeholder="Primary Contact Email"
                                returnKeyType="next"
                                keyboardType="email-address"
                                inputMode="text"
                                onChangeText={(text) => setValue('primaryEmail', text, { shouldValidate: true })}
                                onSubmitEditing={() => primaryMobileRef.current?.focus()}
                                value={watch('primaryEmail')}
                                error={errors.primaryEmail}
                                autoCapitalize="none"
                            />
                            <CustomTextInput
                                ref={primaryMobileRef}
                                placeholder="Primary Contact Mobile"
                                returnKeyType="done"
                                keyboardType="phone-pad"
                                inputMode="decimal"
                                onChangeText={(text) => setValue('primaryMobile', text, { shouldValidate: true })}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                value={watch('primaryMobile')}
                                error={errors.primaryMobile}
                            />
                        </View>

                        <CustomButton
                            title={isSubmitting ? 'Submitting...' : 'Submit'}
                            onPress={handleSubmit(onSubmit)}
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            className='mt-2'
                        />
                    </View>
                </ScrollView>
            </AuthTransition>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, paddingBottom: 100 }
});

export default CompanyForm;