import React from 'react'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

import { StyleSheet } from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'

const GlobalLoadingOverlay = () => {
    const isFetching = useIsFetching()
    const isMutating = useIsMutating()

    const isLoading = isFetching > 0 || isMutating > 0

    return (
        <Spinner
            visible={isLoading}
            cancelable={false}
            textContent={'Loading...'}
            animation="fade"
            size="large"
            overlayColor="rgba(0, 0, 0, 0.6)"
            color='#fff'
            textStyle={styles.spinnerTextStyle}
            indicatorStyle={styles.indicator}
        />
    )
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    indicator: {
        transform: [{ scale: 1.1 }],
    },
})

export default GlobalLoadingOverlay