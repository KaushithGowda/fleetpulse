import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const PieAnimation = ({
  children,
  duration = 600,
  delay = 0,
}: {
  children: React.ReactNode
  duration?: number
  delay?: number
}) => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start()
  }, [opacity, duration, delay])

  return (
    <Animated.View style={{ opacity }}>
      {children}
    </Animated.View>
  )
}