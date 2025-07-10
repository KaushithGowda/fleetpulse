import React, { useMemo, useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { DataTable, Menu } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '@/src/constants/colors';
import { CustomTextInput } from './FormElements/CustomTextInput';
import { colorScheme, useColorScheme } from 'nativewind';

type ColumnConfig<T> = {
    key: keyof T;
    title: string;
    width?: number;
    sortable?: boolean;
};

type screenOptions = 'company' | 'driver'

type EntityTableProps<T> = {
    data: T[];
    columns: ColumnConfig<T>[];
    renderLeadingCell?: (item: T) => React.ReactNode;
    onRowPress?: (item: T) => void;
    filterPlaceholder?: string;
    className?: string;
    screenType: screenOptions;
};

const numberOfItemsPerPageList = [5, 10, 50];

export function EntityTable<T extends { id: string }>({
    data,
    columns,
    onRowPress,
    filterPlaceholder = 'Search...',
    className,
    screenType,
}: EntityTableProps<T>) {
    const { colorScheme } = useColorScheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
    const [page, setPage] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);

    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

    const filteredData = useMemo(() => {
        return data.filter(item =>
            Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = String(a[sortColumn] ?? '').toLowerCase();
            const bVal = String(b[sortColumn] ?? '').toLowerCase();
            const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            return sortDirection === 'ascending' ? comparison : -comparison;
        });
    }, [filteredData, sortColumn, sortDirection]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, sortedData.length);

    useEffect(() => setPage(0), [searchQuery, itemsPerPage]);

    return (
        <View className={className}>
            <CustomTextInput
                placeholder={filterPlaceholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
                inputMode='text'
                returnKeyType='search'
                disabled={false}
                className='my-5'
                error={{}}
            />
            <ScrollView>
                <ScrollView horizontal>
                    <DataTable style={[
                        styles.DataTable,
                        {
                            backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray100 : COLORS.backgroundSlate700
                        }
                    ]}>
                        <DataTable.Header>
                            <DataTable.Title style={styles.DataTitle}>
                                <Text className="text-sm font-semibold text-slate-900 dark:text-gray-100">Icon</Text>
                            </DataTable.Title>
                            {columns.map(col => (
                                <DataTable.Title
                                    key={String(col.key)}
                                    style={{ minWidth: col.width || 150 }}
                                    onPress={() => {
                                        if (!col.sortable) return;
                                        setSortColumn(col.key);
                                        setSortDirection(prev =>
                                            sortColumn === col.key && prev === 'ascending'
                                                ? 'descending'
                                                : 'ascending'
                                        );
                                    }}
                                >
                                    <View className="flex-row items-center gap-1">
                                        <Text className="text-sm font-semibold text-slate-900 dark:text-gray-100">
                                            {col.title}
                                        </Text>
                                        {col.sortable && (
                                            <MaterialCommunityIcons
                                                name={
                                                    sortColumn === col.key
                                                        ? sortDirection === 'ascending'
                                                            ? 'arrow-up'
                                                            : 'arrow-down'
                                                        : 'arrow-up-down'
                                                }
                                                size={12}
                                                color={screenType === 'company' ? COLORS.textBlue500 : COLORS.textGreen500}
                                            />
                                        )}
                                    </View>
                                </DataTable.Title>
                            ))}
                        </DataTable.Header>

                        {sortedData.slice(from, to).map(row => (
                            <TouchableOpacity key={row.id} onPress={() => onRowPress?.(row)}>
                                <DataTable.Row>
                                    <DataTable.Cell style={styles.DataCell}>
                                        <View className={`w-8 h-8 flex rounded-full justify-center items-center" ${screenType === 'company' ? "bg-green-500" : "bg-blue-500"}`}>
                                            <Text className="text-white font-bold text-lg text-center">
                                                {String(row[columns[0].key]).charAt(0)}
                                            </Text>
                                        </View>
                                    </DataTable.Cell>
                                    {columns.map(col => (
                                        <DataTable.Cell key={String(col.key)} style={{ minWidth: col.width || 150 }}>
                                            <Text
                                                className="text-sm text-slate-900 dark:text-gray-100"
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {String(row[col.key]).length > 15
                                                    ? String(row[col.key]).slice(0, 15) + '…'
                                                    : String(row[col.key])}
                                            </Text>
                                        </DataTable.Cell>
                                    ))}
                                </DataTable.Row>
                            </TouchableOpacity>
                        ))}
                    </DataTable>
                </ScrollView>
            </ScrollView>

            <View className='w-screen absolute -left-4 bottom-10 pb-12 bg-gray-100 border-slate-300 dark:border-slate-700 border-t-2 z-10' style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}>
                <View className="flex flex-row items-center justify-end px-10 py-2">
                    <Text className="text-sm text-slate-900 dark:text-gray-100">Rows per page</Text>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <TouchableOpacity
                                onPress={() => setMenuVisible(prev => !prev)}
                                className="flex flex-row items-center ml-2 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded-md"
                            >
                                <Text className="text-sm text-slate-900 dark:text-gray-100 mr-1">{itemsPerPage}</Text>
                                <MaterialCommunityIcons
                                    name={menuVisible ? 'chevron-up' : 'chevron-down'}
                                    size={18}
                                    color={screenType === 'company' ? COLORS.textBlue500 : COLORS.textGreen500}
                                />
                            </TouchableOpacity>
                        }
                    >
                        {numberOfItemsPerPageList.map(n => (
                            <Menu.Item
                                key={n}
                                onPress={() => {
                                    setItemsPerPage(n);
                                    setMenuVisible(false);
                                }}
                                title={`${n}`}
                                titleStyle={styles.MenuTitle}
                                rippleColor={screenType === 'company' ? COLORS.textBlue500 : COLORS.textGreen500}
                            />
                        ))}
                    </Menu>
                </View>

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(sortedData.length / itemsPerPage)}
                    onPageChange={setPage}
                    label={`${from + 1}-${to} of ${sortedData.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPage={itemsPerPage}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    DataTable: {
        marginBottom: 200,
        borderRadius: 10
    },
    DataTitle: {
        minWidth: 60
    },
    DataCell: {
        minWidth: 60,
        paddingVertical: 8
    },
    MenuTitle: {
        fontSize: 14
    }
})