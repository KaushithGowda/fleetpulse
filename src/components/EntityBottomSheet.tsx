/* eslint-disable react-native/no-inline-styles */
import React, { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { useColorScheme } from 'nativewind';

import { COLORS } from '@/src/constants/colors';

import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

type EntityBottomSheetProps = {
  bottomSheetRef: any;
  setState: Dispatch<SetStateAction<any>>
  children: ReactNode;
};

export const EntityBottomSheet = ({ bottomSheetRef,setState, children }: EntityBottomSheetProps) => {
  const { colorScheme } = useColorScheme();
  const renderBackdrop = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        onPress={() => setState(null)}
      />
    ),
    [setState]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%', '70%', '100%']}
      backdropComponent={renderBackdrop}
      handleStyle={{
        backgroundColor: colorScheme === 'light' ? COLORS.textGray100 : '#000',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === 'light' ? '#000' : '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <BottomSheetScrollView
        className="bg-gray-100 dark:bg-black"
        contentContainerStyle={styles.containerStyle}
      >
        <View className="bg-gray-100 dark:bg-black pb-32">
          {children}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 100
  }
})