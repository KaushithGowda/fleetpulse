/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

export const Transition = ({ children }: { children: React.ReactNode }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const isFocused = useIsFocused()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isFocused) {
      setIsVisible(true)
      fadeAnim.setValue(0)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    } else {
      fadeAnim.setValue(0)
      setIsVisible(false)
    }
  }, [isFocused, fadeAnim])

  if (!isVisible) return null

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            }),
          },
          {
            scale: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          },
        ],
        pointerEvents: 'box-none',
      }}
    >
      {children}
    </Animated.View>
  )
}