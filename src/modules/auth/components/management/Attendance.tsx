import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { MenuProps, TableColumnsType, TableProps } from 'antd';
import { Breadcrumb, Button, Col, DatePicker, Divider, Layout, Menu, Row, Select, Table, theme } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "../../../css/attendance.css"
import "../../../css/general.css"
import { Link, Route } from 'react-router-dom';
import Leave from './Leave';
import Payroll from './Payroll';
import Employee from './Employee';

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

const siderStyle: React.CSSProperties = {
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: "#FBFCFD",
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
                    <Menu>
                        <Button type='link' className='button-link' style={{ backgroundColor: "#F1F3F5" }}>
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_4344_20893)">
                                    <rect x="9" y="3" width="36" height="36" rx="18" fill="#FBFDFF" shape-rendering="crispEdges" />
                                    <path d="M30.9582 13.967V12.667C30.9582 12.3253 30.6749 12.042 30.3332 12.042C29.9915 12.042 29.7082 12.3253 29.7082 12.667V13.917H24.2915V12.667C24.2915 12.3253 24.0082 12.042 23.6665 12.042C23.3249 12.042 23.0415 12.3253 23.0415 12.667V13.967C20.7915 14.1753 19.6999 15.517 19.5332 17.5087C19.5165 17.7503 19.7165 17.9503 19.9499 17.9503H34.0499C34.2915 17.9503 34.4915 17.742 34.4665 17.5087C34.2999 15.517 33.2082 14.1753 30.9582 13.967Z" fill="#40C4AA" />
                                    <path opacity="0.4" d="M34.5 20.0331V21.4831C34.5 21.9914 34.05 22.3831 33.55 22.2997C33.3167 22.2664 33.075 22.2414 32.8333 22.2414C30.3083 22.2414 28.25 24.2997 28.25 26.8247C28.25 27.2081 28.4 27.7414 28.5583 28.2248C28.7417 28.7664 28.3417 29.3247 27.7667 29.3247H23.6667C20.75 29.3247 19.5 27.6581 19.5 25.1581V20.0247C19.5 19.5664 19.875 19.1914 20.3333 19.1914H33.6667C34.125 19.1997 34.5 19.5747 34.5 20.0331Z" fill="#40C4AA" />
                                    <path d="M32.8333 23.5C30.9917 23.5 29.5 24.9917 29.5 26.8333C29.5 27.4583 29.675 28.05 29.9833 28.55C30.5583 29.5167 31.6167 30.1667 32.8333 30.1667C34.05 30.1667 35.1083 29.5167 35.6833 28.55C35.9917 28.05 36.1667 27.4583 36.1667 26.8333C36.1667 24.9917 34.675 23.5 32.8333 23.5ZM34.5583 26.475L32.7833 28.1167C32.6667 28.225 32.5083 28.2833 32.3583 28.2833C32.2 28.2833 32.0417 28.225 31.9167 28.1L31.0917 27.275C30.85 27.0333 30.85 26.6333 31.0917 26.3917C31.3333 26.15 31.7333 26.15 31.975 26.3917L32.375 26.7917L33.7083 25.5583C33.9583 25.325 34.3583 25.3417 34.5917 25.5917C34.825 25.8417 34.8083 26.2333 34.5583 26.475Z" fill="#40C4AA" />
                                    <path d="M24.0833 23.5004C23.8667 23.5004 23.65 23.4087 23.4917 23.2587C23.3417 23.1004 23.25 22.8837 23.25 22.6671C23.25 22.4504 23.3417 22.2338 23.4917 22.0754C23.6833 21.8838 23.975 21.7921 24.25 21.8504C24.3 21.8587 24.35 21.8754 24.4 21.9004C24.45 21.9171 24.5 21.9421 24.55 21.9754C24.5917 22.0088 24.6333 22.0421 24.675 22.0754C24.825 22.2338 24.9167 22.4504 24.9167 22.6671C24.9167 22.8837 24.825 23.1004 24.675 23.2587C24.6333 23.2921 24.5917 23.3254 24.55 23.3587C24.5 23.3921 24.45 23.4171 24.4 23.4338C24.35 23.4588 24.3 23.4754 24.25 23.4838C24.1917 23.4921 24.1333 23.5004 24.0833 23.5004Z" fill="#40C4AA" />
                                    <path d="M26.9998 23.5C26.7832 23.5 26.5665 23.4083 26.4082 23.2583C26.2582 23.1 26.1665 22.8833 26.1665 22.6667C26.1665 22.45 26.2582 22.2333 26.4082 22.075C26.7248 21.7667 27.2832 21.7667 27.5915 22.075C27.7415 22.2333 27.8332 22.45 27.8332 22.6667C27.8332 22.8833 27.7415 23.1 27.5915 23.2583C27.4332 23.4083 27.2165 23.5 26.9998 23.5Z" fill="#40C4AA" />
                                    <path d="M24.0833 26.4167C23.8667 26.4167 23.65 26.325 23.4917 26.175C23.3417 26.0167 23.25 25.8001 23.25 25.5834C23.25 25.3667 23.3417 25.1501 23.4917 24.9917C23.575 24.9167 23.6583 24.8584 23.7667 24.8167C24.075 24.6834 24.4417 24.7584 24.675 24.9917C24.825 25.1501 24.9167 25.3667 24.9167 25.5834C24.9167 25.8001 24.825 26.0167 24.675 26.175C24.5167 26.325 24.3 26.4167 24.0833 26.4167Z" fill="#40C4AA" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_4344_20893" x="0" y="0" width="54" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="6" />
                                        <feGaussianBlur stdDeviation="4.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.768627 0 0 0 0 0.666667 0 0 0 0.15 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4344_20893" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4344_20893" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                            Attendance Management
                        </Button>
                        <Link to="/leave-management">
                            <Button type='link' className='button-link'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#F1F3F5" />
                                    <path d="M12.9752 8.83301H10.5252C9.46683 8.83301 8.8335 9.46634 8.8335 10.5247V12.9747C8.8335 14.033 9.46683 14.6663 10.5252 14.6663H12.9752C14.0335 14.6663 14.6668 14.033 14.6668 12.9747V10.5247C14.6668 9.46634 14.0335 8.83301 12.9752 8.83301ZM13.3918 12.633C13.6002 12.8413 13.6002 13.183 13.3918 13.3913C13.2835 13.4913 13.1418 13.5413 13.0085 13.5413C12.8752 13.5413 12.7418 13.4913 12.6335 13.3913L11.7418 12.508L10.8752 13.3913C10.7668 13.4913 10.6335 13.5413 10.4835 13.5413C10.3502 13.5413 10.2168 13.4913 10.1085 13.3913C9.90016 13.183 9.90016 12.8413 10.1085 12.633L11.0002 11.7497L10.1168 10.8747C9.9085 10.6663 9.9085 10.3247 10.1168 10.1163C10.3252 9.90801 10.6668 9.90801 10.8752 10.1163L11.7418 10.9997L12.6252 10.1163C12.8335 9.90801 13.1752 9.90801 13.3835 10.1163C13.5918 10.3247 13.5918 10.6663 13.3835 10.8747L12.5085 11.7497L13.3918 12.633Z" fill="#FFA01C" />
                                    <path opacity="0.4" d="M21.8585 9.66699H14.4835C14.6002 9.90866 14.6668 10.192 14.6668 10.5253V12.9753C14.6668 14.0337 14.0335 14.667 12.9752 14.667H10.5252C10.3668 14.667 10.2252 14.6503 10.0835 14.617V22.2753C10.0835 24.517 11.9002 26.3337 14.1418 26.3337H20.7835C20.9252 26.3337 21.0668 26.2837 21.1752 26.167C22.4085 24.9253 24.5585 22.7587 25.7668 21.542C25.8752 21.4337 25.9168 21.3087 25.9168 21.1837V13.7253C25.9168 11.4837 24.1002 9.66699 21.8585 9.66699Z" fill="#FFA01C" />
                                    <path d="M25.9167 21.1837C25.9167 21.3087 25.875 21.4337 25.7667 21.5421C24.5584 22.7587 22.4084 24.9254 21.175 26.1671C21.0667 26.2837 20.925 26.3337 20.7834 26.3337C20.5084 26.3337 20.2417 26.1171 20.2417 25.8004V22.8837C20.2417 21.6671 21.275 20.6587 22.5417 20.6587C23.3334 20.6504 24.4334 20.6504 25.375 20.6504C25.7 20.6504 25.9167 20.9087 25.9167 21.1837Z" fill="#FFA01C" />
                                    <path d="M20.3166 18.5918H14.1333C13.7833 18.5918 13.5083 18.3085 13.5083 17.9668C13.5083 17.6251 13.7916 17.3418 14.1333 17.3418H20.3166C20.6666 17.3418 20.9416 17.6251 20.9416 17.9668C20.9416 18.3085 20.6666 18.5918 20.3166 18.5918Z" fill="#FFA01C" />
                                    <path d="M18 21.6836H14.1333C13.7833 21.6836 13.5083 21.4003 13.5083 21.0586C13.5083 20.7086 13.7916 20.4336 14.1333 20.4336H18C18.35 20.4336 18.625 20.7169 18.625 21.0586C18.625 21.4003 18.35 21.6836 18 21.6836Z" fill="#FFA01C" />
                                </svg>
                                Leave Management
                            </Button>
                            <Route path="/leave-management" component={Leave} />
                        </Link>
                        <Link to="/payroll-management">
                            <Button type='link' className='button-link'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#F1F3F5" />
                                    <path d="M26.3335 13.0004V15.0171C26.3335 16.3337 25.5002 17.1671 24.1835 17.1671H21.3335V11.3421C21.3335 10.4171 22.0918 9.65873 23.0168 9.66706C23.9252 9.67539 24.7585 10.0421 25.3585 10.6421C25.9585 11.2504 26.3335 12.0837 26.3335 13.0004Z" fill="#006ADC" />
                                    <path opacity="0.4" d="M9.6665 13.8337V25.5003C9.6665 26.192 10.4498 26.5837 10.9998 26.167L12.4248 25.1003C12.7582 24.8503 13.2248 24.8837 13.5248 25.1837L14.9082 26.5753C15.2332 26.9003 15.7665 26.9003 16.0915 26.5753L17.4915 25.1753C17.7832 24.8837 18.2498 24.8503 18.5748 25.1003L19.9998 26.167C20.5498 26.5753 21.3332 26.1837 21.3332 25.5003V11.3337C21.3332 10.417 22.0832 9.66699 22.9998 9.66699H13.8332H12.9998C10.4998 9.66699 9.6665 11.1587 9.6665 13.0003V13.8337Z" fill="#006ADC" />
                                    <path d="M18 18.2168H15.5C15.1583 18.2168 14.875 18.5001 14.875 18.8418C14.875 19.1835 15.1583 19.4668 15.5 19.4668H18C18.3417 19.4668 18.625 19.1835 18.625 18.8418C18.625 18.5001 18.3417 18.2168 18 18.2168Z" fill="#006ADC" />
                                    <path d="M15.5 16.1328H18C18.3417 16.1328 18.625 15.8495 18.625 15.5078C18.625 15.1661 18.3417 14.8828 18 14.8828H15.5C15.1583 14.8828 14.875 15.1661 14.875 15.5078C14.875 15.8495 15.1583 16.1328 15.5 16.1328Z" fill="#006ADC" />
                                    <path d="M12.9749 14.6748C12.5083 14.6748 12.1416 15.0498 12.1416 15.5081C12.1416 15.9665 12.5166 16.3415 12.9749 16.3415C13.4333 16.3415 13.8083 15.9665 13.8083 15.5081C13.8083 15.0498 13.4333 14.6748 12.9749 14.6748Z" fill="#006ADC" />
                                    <path d="M12.9749 18.0078C12.5083 18.0078 12.1416 18.3828 12.1416 18.8411C12.1416 19.2995 12.5166 19.6745 12.9749 19.6745C13.4333 19.6745 13.8083 19.2995 13.8083 18.8411C13.8083 18.3828 13.4333 18.0078 12.9749 18.0078Z" fill="#006ADC" />
                                </svg>
                                Payroll Management
                            </Button>
                            <Route path="/payroll-management" component={Payroll} />
                        </Link>
                        <Link to="/employee-management">
                            <Button type='link' className='button-link'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="18" fill="#F1F3F5" />
                                    <path d="M13.8332 14.667H11.3332C10.4165 14.667 9.6665 13.917 9.6665 13.0003V11.3337C9.6665 10.417 10.4165 9.66699 11.3332 9.66699H13.8332C14.7498 9.66699 15.4998 10.417 15.4998 11.3337V13.0003C15.4998 13.917 14.7498 14.667 13.8332 14.667Z" fill="#94BA2C" />
                                    <path d="M25.3335 13.8333H22.3335C21.7835 13.8333 21.3335 13.3833 21.3335 12.8333V11.5C21.3335 10.95 21.7835 10.5 22.3335 10.5H25.3335C25.8835 10.5 26.3335 10.95 26.3335 11.5V12.8333C26.3335 13.3833 25.8835 13.8333 25.3335 13.8333Z" fill="#94BA2C" />
                                    <path d="M25.3335 20.0833H22.3335C21.7835 20.0833 21.3335 19.6333 21.3335 19.0833V17.75C21.3335 17.2 21.7835 16.75 22.3335 16.75H25.3335C25.8835 16.75 26.3335 17.2 26.3335 17.75V19.0833C26.3335 19.6333 25.8835 20.0833 25.3335 20.0833Z" fill="#94BA2C" />
                                    <path opacity="0.37" d="M21.3333 19.042C21.675 19.042 21.9583 18.7587 21.9583 18.417C21.9583 18.0753 21.675 17.792 21.3333 17.792H19.0417V12.792H21.3333C21.675 12.792 21.9583 12.5087 21.9583 12.167C21.9583 11.8253 21.675 11.542 21.3333 11.542H15.5C15.1583 11.542 14.875 11.8253 14.875 12.167C14.875 12.5087 15.1583 12.792 15.5 12.792H17.7917V23.0003C17.7917 24.267 18.8167 25.292 20.0833 25.292H21.3333C21.675 25.292 21.9583 25.0087 21.9583 24.667C21.9583 24.3253 21.675 24.042 21.3333 24.042H20.0833C19.5083 24.042 19.0417 23.5753 19.0417 23.0003V19.042H21.3333Z" fill="#94BA2C" />
                                    <path d="M25.3335 26.3333H22.3335C21.7835 26.3333 21.3335 25.8833 21.3335 25.3333V24C21.3335 23.45 21.7835 23 22.3335 23H25.3335C25.8835 23 26.3335 23.45 26.3335 24V25.3333C26.3335 25.8833 25.8835 26.3333 25.3335 26.3333Z" fill="#94BA2C" />
                                </svg>
                                Employee Management
                            </Button>
                            <Route path="/employee-management" component={Employee} />
                        </Link>
                        <Button type='link' className='button-link'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="36" height="36" rx="18" fill="#F1F3F5" />
                                <path d="M18.0002 18.0003C20.3013 18.0003 22.1668 16.1348 22.1668 13.8337C22.1668 11.5325 20.3013 9.66699 18.0002 9.66699C15.699 9.66699 13.8335 11.5325 13.8335 13.8337C13.8335 16.1348 15.699 18.0003 18.0002 18.0003Z" fill="#E5484D" />
                                <path opacity="0.4" d="M17.9998 20.083C13.8248 20.083 10.4248 22.883 10.4248 26.333C10.4248 26.5663 10.6081 26.7497 10.8415 26.7497H25.1582C25.3915 26.7497 25.5748 26.5663 25.5748 26.333C25.5748 22.883 22.1748 20.083 17.9998 20.083Z" fill="#E5484D" />
                                <path d="M25.8585 20.2838C25.1085 19.5338 24.5169 19.7754 24.0085 20.2838L21.0585 23.2338C20.9418 23.3505 20.8335 23.5671 20.8085 23.7254L20.6502 24.8504C20.5919 25.2587 20.8752 25.5421 21.2835 25.4838L22.4085 25.3254C22.5668 25.3004 22.7919 25.1921 22.9002 25.0754L25.8502 22.1255C26.3668 21.6255 26.6085 21.0338 25.8585 20.2838Z" fill="#E5484D" />
                            </svg>
                            User Management
                        </Button>
                        <Button type='link' className='button-link'>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="36" height="36" rx="18" fill="#F1F3F5" />
                                <path opacity="0.4" d="M26.2082 17.5088L25.6915 23.1588C25.5165 24.8255 24.8332 26.5255 21.1665 26.5255H14.8165C11.1498 26.5255 10.4665 24.8255 10.2998 23.1671L9.7915 17.7421C9.79984 17.7505 9.80817 17.7588 9.82484 17.7671C10.1082 17.9505 10.3832 18.1338 10.6832 18.3005C10.7998 18.3755 10.9248 18.4421 11.0498 18.5088C11.9915 19.0255 12.9998 19.4338 14.0415 19.7171C14.4582 19.8421 14.8832 19.9338 15.3165 20.0088C15.4832 21.3421 16.6248 22.3755 17.9998 22.3755C19.3915 22.3755 20.5415 21.3171 20.6915 19.9588V19.9505C21.1165 19.8671 21.5415 19.7588 21.9582 19.6338C22.9998 19.3088 24.0082 18.8755 24.9498 18.3255C24.9998 18.3005 25.0415 18.2755 25.0748 18.2505C25.4582 18.0421 25.8248 17.8005 26.1748 17.5505C26.1915 17.5421 26.1998 17.5255 26.2082 17.5088Z" fill="#6E56CF" />
                                <path d="M25.5749 13.8163C24.8665 13.0329 23.6915 12.6413 21.9665 12.6413H21.7665V12.6079C21.7665 11.2079 21.7665 9.47461 18.6332 9.47461H17.3665C14.2332 9.47461 14.2332 11.2079 14.2332 12.6079V12.6413H14.0332C12.3082 12.6413 11.1249 13.0329 10.4249 13.8163C9.59987 14.7413 9.62487 15.9663 9.7082 16.8079L9.71654 16.8663L9.79154 17.7413C9.79987 17.7496 9.81654 17.7579 9.8332 17.7663C10.1165 17.9496 10.3915 18.1329 10.6915 18.2996C10.8082 18.3746 10.9332 18.4413 11.0582 18.5079C11.9999 19.0246 13.0082 19.4329 14.0415 19.7163C14.0665 21.8746 15.8332 23.6246 17.9999 23.6246C20.1832 23.6246 21.9582 21.8496 21.9582 19.6663V19.6329C23.0082 19.3163 24.0165 18.8746 24.9582 18.3246C25.0082 18.2996 25.0415 18.2746 25.0832 18.2496C25.4665 18.0413 25.8332 17.7996 26.1832 17.5496C26.1915 17.5413 26.2082 17.5246 26.2165 17.5079L26.2499 17.2079L26.2915 16.8163C26.2999 16.7663 26.2999 16.7246 26.3082 16.6663C26.3749 15.8329 26.3582 14.6829 25.5749 13.8163ZM15.4249 12.6079C15.4249 11.1913 15.4249 10.6579 17.3665 10.6579H18.6332C20.5749 10.6579 20.5749 11.1913 20.5749 12.6079V12.6413H15.4249V12.6079ZM17.9999 22.3746C16.6249 22.3746 15.4832 21.3413 15.3165 20.0079C15.2999 19.8996 15.2915 19.7829 15.2915 19.6663C15.2915 18.1746 16.5082 16.9579 17.9999 16.9579C19.4915 16.9579 20.7082 18.1746 20.7082 19.6663C20.7082 19.7663 20.6999 19.8579 20.6915 19.9496V19.9579C20.5415 21.3163 19.3915 22.3746 17.9999 22.3746Z" fill="#6E56CF" />
                                <path d="M17.5251 21.3583C17.3667 21.3583 17.2084 21.3 17.0834 21.175L16.2584 20.3583C16.0167 20.1166 16.0167 19.7166 16.2584 19.475C16.5001 19.2333 16.9001 19.2333 17.1417 19.475L17.5417 19.875L18.8834 18.6416C19.1334 18.4083 19.5334 18.425 19.7667 18.675C20.0001 18.925 19.9834 19.325 19.7334 19.5583L17.9584 21.2C17.8251 21.3 17.6751 21.3583 17.5251 21.3583Z" fill="#6E56CF" />
                            </svg>
                            Master Management
                        </Button>
                    </Menu>
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
                                title: 'Attendance Management',
                                href: '',
                            },
                            {
                                title: 'Attendance Record',
                            },
                        ]}
                    />
                    <h2>Attendance Management</h2>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", gap: "10px" }}>
                            <Button type="primary" className='button-primary' style={{ width: "178px" }}>Attendance Record</Button>
                            <Button color="primary" className='button-primary' variant="filled" style={{ width: "169px" }}>Overtime Request</Button>
                            <Button icon={<SearchOutlined />} className='button-search'>Search</Button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <RangePicker className='rangepicker'
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
            </Layout>
        </Layout>
    );
};

export default Attendance;