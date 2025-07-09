/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { DataTable, Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';

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
            <TextInput
                placeholder={filterPlaceholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="mt-3 mb-5 py-4 px-2 border bg-white dark:bg-gray-900 border-gray-200 rounded-xl text-black dark:text-white dark:border-gray-600"
                placeholderTextColor="#9CA3AF"
            />
            <ScrollView>
                <ScrollView horizontal>
                    <DataTable style={{ backgroundColor: colorScheme === 'light' ? '#fff' : '#4A4A58', marginBottom: 200, borderRadius: 10 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ minWidth: 60 }}>
                                <Text className="text-sm font-semibold text-gray-800 dark:text-white">Icon</Text>
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
                                        <Text className="text-sm font-semibold text-gray-800 dark:text-white">
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
                                                color={screenType === 'company' ? '#79B3A3' : '#9EB4DC'}
                                            />
                                        )}
                                    </View>
                                </DataTable.Title>
                            ))}
                        </DataTable.Header>

                        {sortedData.slice(from, to).map(row => (
                            <TouchableOpacity key={row.id} onPress={() => onRowPress?.(row)}>
                                <DataTable.Row>
                                    <DataTable.Cell style={{ minWidth: 60, paddingVertical: 8 }}>
                                        <View className={`w-8 h-8 flex rounded-full justify-center items-center" ${screenType === 'company' ? "bg-green-600 dark:bg-green-500" : "bg-blue-600 dark:bg-blue-500"}`}>
                                            <Text className="text-white font-bold text-lg text-center">
                                                {String(row[columns[0].key]).charAt(0)}
                                            </Text>
                                        </View>
                                    </DataTable.Cell>
                                    {columns.map(col => (
                                        <DataTable.Cell key={String(col.key)} style={{ minWidth: col.width || 150 }}>
                                            <Text
                                                className="text-sm"
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{
                                                    color: colorScheme === 'light' ? '#504f58' : '#ffffff',
                                                }}
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

            {/* Footer Pagination + Menu */}
            <View className='w-screen absolute bottom-10 pb-12 bg-gray-100 dark:bg-black z-10' >
                <View className="flex-row items-center justify-end px-10 py-2">
                    <Text className="text-sm text-gray-700 dark:text-gray-300">Rows per page</Text>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <TouchableOpacity
                                onPress={() => setMenuVisible(prev => !prev)}
                                className="flex-row items-center ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                            >
                                <Text className="text-sm text-gray-800 dark:text-white mr-1">{itemsPerPage}</Text>
                                <MaterialCommunityIcons
                                    name={menuVisible ? 'chevron-up' : 'chevron-down'}
                                    size={18}
                                    color={screenType === 'company' ? '#79B3A3' : '#9EB4DC'}
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
                                titleStyle={{ fontSize: 14 }}
                                rippleColor={screenType === 'company' ? '#79B3A3' : '#9EB4DC'}
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