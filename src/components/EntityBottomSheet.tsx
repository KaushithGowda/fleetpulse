import React, { ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { colorScheme } from 'nativewind';

import { COLORS } from '@/src/constants/colors';

import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

type EntityBottomSheetProps = {
  bottomSheetRef: any;
  children: ReactNode;
};

export const EntityBottomSheet = ({ bottomSheetRef, children }: EntityBottomSheetProps) => {
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
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.handleIndicatorStyle}
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
  },
  handleIndicatorStyle: {
    backgroundColor: colorScheme ? COLORS.textGray100 : COLORS.textSlate900
  },
  handleStyle: {
    backgroundColor: colorScheme ? '#000' : '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
})