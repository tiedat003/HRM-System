import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { ConfigProviderProps, MenuProps, TableColumnsType, TableProps } from 'antd';
import { Breadcrumb, Button, Col, DatePicker, Divider, Layout, Menu, Select, Table, theme } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "../../../css/attendance.css"

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    color: "#11181C",
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#FFFFFF',
};

const contentStyle: React.CSSProperties = {
    minHeight: 120,
    lineHeight: '20px',
    color: '#fff',
    gap: "10px"
};

const siderStyle: React.CSSProperties = {
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: "#FBFCFD"
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#687076',
};

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    padding: '0 24px 24px'
};

type MenuItem = Required<MenuProps>['items'][number];

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
            { key: '7', label: 'Global Setting' },
        ]
    }
]

type SizeType = ConfigProviderProps['componentSize'];
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

const Payroll: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [bordered, setBordered] = useState(true);
    const [size, setSize] = useState<SizeType>('large');

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);

        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomLeft');

    type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
    interface DataType {
        key: React.Key;
        name: string;
        age: string;
        address: string;
    }

    const columns: TableColumnsType<DataType> = [
        { title: 'No', dataIndex: 'age' },
        { title: 'Salary Name', dataIndex: 'name' },
        { title: 'Generate Date', dataIndex: 'address' },
        { title: 'Generate Date', dataIndex: 'address' },
        { title: 'Action' },
    ];

    const dataSource = Array.from<DataType>({ length: 100 }).map<DataType>((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        age: `${i}`,
        address: `London${i}`,
    }));

    const hasSelected = selectedRowKeys.length > 0;

    dayjs.extend(customParseFormat);


    const monthFormat = 'MMMM YYYY';

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div className='container'>
            <Layout>
                <Header style={headerStyle}>
                    <img src="https://web-qa.hrm.div4.pgtest.co/static/media/HR_Logo.7c93eebe8886301b470d6d7131b23a95.svg" alt="" />
                    <h3>
                        HR Management System
                    </h3>
                    <Select
                        defaultValue="EN"
                        options={[
                            { value: 'Eng', label: 'EN' },
                            { value: 'Vie', label: 'VI' },
                        ]}
                    />
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="16" fill="#F7CE00" />
                        <path d="M10.588 17.588C10.604 17.908 10.736 18.184 10.984 18.416C11.24 18.64 11.584 18.752 12.016 18.752C12.424 18.752 12.748 18.66 12.988 18.476C13.236 18.284 13.368 18.044 13.384 17.756C13.416 17.228 13.036 16.852 12.244 16.628L11.224 16.364C9.832 15.956 9.136 15.188 9.136 14.06C9.136 13.34 9.404 12.76 9.94 12.32C10.476 11.864 11.136 11.636 11.92 11.636C12.712 11.636 13.368 11.864 13.888 12.32C14.408 12.768 14.668 13.372 14.668 14.132H13.132C13.132 13.796 13.02 13.532 12.796 13.34C12.58 13.148 12.28 13.052 11.896 13.052C11.536 13.052 11.24 13.144 11.008 13.328C10.776 13.504 10.66 13.736 10.66 14.024C10.66 14.48 10.988 14.796 11.644 14.972L12.664 15.272C13.096 15.392 13.46 15.54 13.756 15.716C14.052 15.884 14.288 16.076 14.464 16.292C14.648 16.508 14.776 16.744 14.848 17C14.92 17.256 14.944 17.52 14.92 17.792C14.88 18.52 14.584 19.092 14.032 19.508C13.488 19.924 12.816 20.132 12.016 20.132C11.136 20.132 10.424 19.888 9.88 19.4C9.328 18.912 9.052 18.308 9.052 17.588H10.588ZM21.6538 20L20.8978 17.996H17.8138L17.0578 20H15.4258L18.5218 11.732H20.1778L23.2738 20H21.6538ZM19.3498 13.496L18.3298 16.652H20.3938L19.3498 13.496Z" fill="#FBFDFF" />
                    </svg>
                </Header>
                <Layout>
                    <Sider width={250} style={siderStyle}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={items}
                        />
                    </Sider>
                    <Layout style={layoutStyle}>
                        <Breadcrumb
                            separator=">"
                            style={{ gap: "6px", fontWeight: "400", fontSize: "14px", lineHeight: "19.07px", color: "#687076" }}
                            items={[
                                {
                                    title: 'General',
                                    href: '',
                                },
                                {
                                    title: 'Payroll Management',
                                },
                            ]}
                        />
                        <h2>Payroll Management</h2>
                        <div>
                            <Button type="primary"
                                style={{
                                    width: "178px",
                                    height: "42px",
                                    borderRadius: "6px",
                                    padding: "8px 20px",
                                    gap: "6px"
                                }}>Payroll</Button>
                            <Button color="primary" variant="filled" style={{
                                width: "169px",
                                height: "42px",
                                borderRadius: "6px",
                                padding: "8px 20px",
                                gap: "6px"
                            }}>13th Salary</Button>
                        </div>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <h4>Active Financial Year : {new Date().getFullYear()} </h4>
                            <Divider />
                            <h6>Salary Month</h6>
                            <DatePicker size={size} picker="month" format={monthFormat} />
                            <Table<DataType>
                                bordered={bordered}
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={dataSource}
                                scroll={{ x: 'max-content' }}
                                pagination={{ position: [bottom] }}
                            />
                            <Button variant="filled" style={{ backgroundColor: "#E5484D", color: "#FBFDFF" }}>
                                Unlock Record
                            </Button>
                            <Divider />
                        </Content>
                        <Footer style={footerStyle}>
                            CopyRight ©{new Date().getFullYear()}. All Rights Reserved
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

export default Payroll;