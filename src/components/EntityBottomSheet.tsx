/* eslint-disable react-native/no-inline-styles */
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { ReactNode, useCallback } from "react";
import { useColorScheme } from 'nativewind';
import { View } from "react-native";

type EntityBottomSheetProps = {
  bottomSheetRef: any;
  children: ReactNode;
};

export const EntityBottomSheet = ({ bottomSheetRef, children }: EntityBottomSheetProps) => {
  const { colorScheme } = useColorScheme();

  const renderBackdrop = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%', '70%', '100%']}
      backdropComponent={renderBackdrop}
      handleStyle={{
        backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === 'light' ? '#000' : '#fff'
      }}
    >
      <BottomSheetScrollView
        className="bg-gray-100 dark:bg-black"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <View className="bg-gray-100 dark:bg-black pb-28">
          {children}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};