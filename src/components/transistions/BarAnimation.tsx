import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const BarAnimation = ({
  children,
  duration = 1000,
  delay = 0,
}: {
  children: React.ReactNode
  duration?: number
  delay?: number
}) => {
  const translateY = useRef(new Animated.Value(50)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateY, opacity, duration, delay])

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      {children}
    </Animated.View>
  )
}