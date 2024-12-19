import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { MenuProps, TableColumnsType, TableProps } from 'antd';
import { Breadcrumb, Button, Col, DatePicker, Divider, Layout, Menu, Row, Select, Table, theme } from 'antd';
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

type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

const Attendance: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [bordered, setBordered] = useState(true);

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
        { title: 'Date', dataIndex: 'name' },
        { title: 'NIK', dataIndex: 'age' },
        { title: 'Name', dataIndex: 'address' },
        { title: 'Department', dataIndex: 'address' },
        {
            title: 'ATTENDANCE', children: [
                { title: 'Start', dataIndex: 'address' },
                { title: 'Lunch', dataIndex: 'address' },
                { title: 'End of Lunch', dataIndex: 'address' },
                { title: 'End', dataIndex: 'address' }
            ]
        },
        {
            title: "OT", children: [
                { title: 'OT Start', dataIndex: 'address' },
                { title: 'OT End', dataIndex: 'address' },
            ]
        },
        {
            title: "CODE", children: [
                { title: 'Attendance Code', dataIndex: 'address' },
                { title: 'Attendance Value', dataIndex: 'address' },
            ]
        },
        { title: 'Late', dataIndex: 'address' },
    ];

    const dataSource = Array.from<DataType>({ length: 100 }).map<DataType>((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        age: `${i}`,
        address: `London${i}`,
    }));

    const hasSelected = selectedRowKeys.length > 0;

    dayjs.extend(customParseFormat);

    const { RangePicker } = DatePicker;

    const dateFormat = 'DD/MM/YYYY';

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
                <Row>
                    <Layout>
                        <Col flex="250px">
                            <Sider width={250} style={siderStyle}>
                                <Menu
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline"
                                    items={items}
                                />
                            </Sider>
                        </Col>
                        <Col span={12}>
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
                                            title: 'Attendance Management',
                                            href: '',
                                        },
                                        {
                                            title: 'Attendance Record',
                                        },
                                    ]}
                                />
                                <h2>Attendance Management</h2>
                                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", gap: "10px" }}>
                                    <Button type="primary"
                                        style={{
                                            width: "178px",
                                            height: "42px",
                                            borderRadius: "6px",
                                            padding: "8px 20px",
                                            gap: "6px"
                                        }}>Attendance Record</Button>
                                    <Button color="primary" variant="filled" style={{
                                        width: "169px",
                                        height: "42px",
                                        borderRadius: "6px",
                                        padding: "8px 20px",
                                        gap: "6px"
                                    }}>Overtime Request</Button>
                                    <Button icon={<SearchOutlined />} style={{
                                        width: "200px",
                                        height: "40px",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        gap: "10px",
                                        border: "1px"
                                    }}>
                                        Search</Button>
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
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <RangePicker
                                            defaultValue={[dayjs('01/01/2024', dateFormat), dayjs('01/01/2024', dateFormat)]}
                                            format={dateFormat}
                                        />
                                        <Button color="primary" variant="filled">
                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.3333 6.5H7.33333C6.59695 6.5 6 7.09695 6 7.83333V13.8333C6 14.5697 6.59695 15.1667 7.33333 15.1667H13.3333C14.0697 15.1667 14.6667 14.5697 14.6667 13.8333V7.83333C14.6667 7.09695 14.0697 6.5 13.3333 6.5Z" stroke="#0091FF" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.3335 10.4997H2.66683C2.31321 10.4997 1.97407 10.3592 1.72402 10.1092C1.47397 9.8591 1.3335 9.51996 1.3335 9.16634V3.16634C1.3335 2.81272 1.47397 2.47358 1.72402 2.22353C1.97407 1.97348 2.31321 1.83301 2.66683 1.83301H8.66683C9.02045 1.83301 9.35959 1.97348 9.60964 2.22353C9.85969 2.47358 10.0002 2.81272 10.0002 3.16634V3.83301" stroke="#0091FF" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Add
                                        </Button>
                                        <Button color="danger" variant="filled" >
                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.86686 1.56641C5.57231 1.56641 5.33353 1.80519 5.33353 2.09974C5.33353 2.39429 5.57231 2.63307 5.86686 2.63307H10.1335C10.4281 2.63307 10.6669 2.39429 10.6669 2.09974C10.6669 1.80519 10.4281 1.56641 10.1335 1.56641H5.86686ZM3.2002 4.23307C3.2002 3.93852 3.43898 3.69974 3.73353 3.69974H5.33353H10.6669H12.2669C12.5614 3.69974 12.8002 3.93852 12.8002 4.23307C12.8002 4.52762 12.5614 4.76641 12.2669 4.76641H11.7335V13.2997C11.7335 13.8889 11.256 14.3664 10.6669 14.3664H5.33353C4.74443 14.3664 4.26686 13.8889 4.26686 13.2997V4.76641H3.73353C3.43898 4.76641 3.2002 4.52762 3.2002 4.23307ZM5.33353 4.76641H10.6669V13.2997H5.33353V4.76641Z"
                                                    fill="#E5484D" />
                                            </svg>
                                            Delete
                                        </Button>
                                    </div>
                                    {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : null} */}
                                    <Divider />
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
                        </Col>
                    </Layout>
                </Row>
            </Layout>
        </div >
    );
};

export default Attendance;