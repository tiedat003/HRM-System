import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps, TableColumnsType, TableProps } from 'antd';
import { Button, Flex, Menu, Table } from 'antd';
import { Header } from 'antd/es/layout/layout';

type MenuItem = Required<MenuProps>['items'][number];
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
}));


const items: MenuItem[] = [
    {
        key: 'grp',
        label: 'General',
        type: 'group',
        children: [
            { key: '1', label: 'Attendance Management' },
            { key: '2', label: 'Leave Management' },
            { key: '3', label: 'Payroll Management' },
            { key: '4', label: 'Employee Management' },
            { key: '5', label: 'User Management' },
            { key: '6', label: 'Master Management' },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'grp',
        label: 'Advance',
        type: 'group',
        children: [
            { key: '7', label: 'Global Settings' },
        ],
    },
];

const ManagementPage = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <Header style={{ backgroundColor: "#ffffff" }}>
                <img src="https://web-qa.hrm.div4.pgtest.co/static/media/HR_Logo.7c93eebe8886301b470d6d7131b23a95.svg" alt="" />
                <h3>HR Management System</h3>
            </Header>
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <Flex gap="middle" vertical>
                <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
            </Flex>
        </div>
    );
};

export default ManagementPage;