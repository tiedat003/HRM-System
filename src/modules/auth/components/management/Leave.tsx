import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Breadcrumb, Button, DatePicker, Divider, Layout, Menu, Modal, Select, Table, theme } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "../../../css/general.css"
import "../../../css/leave.css"
import { ROUTES } from '../../../../configs/routes';


const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
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

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    padding: '0 24px 24px'
};

type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

const Leave: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
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
        { title: 'NIK', dataIndex: 'age' },
        { title: 'Name', dataIndex: 'address' },
        { title: 'Department', dataIndex: 'address' },
        { title: 'Position', dataIndex: 'address' },
        { title: 'Leave Type', dataIndex: 'address' },
        { title: 'Date', dataIndex: 'address' },
        { title: 'Approved by', dataIndex: 'address' },
        { title: 'Document', dataIndex: 'address' },
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

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
                        <Button type='link' className='button-link' href={ROUTES.attendance}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="36" height="36" rx="18" fill="#F1F3F5" />
                                <path d="M21.9582 10.967V9.66699C21.9582 9.32533 21.6749 9.04199 21.3332 9.04199C20.9915 9.04199 20.7082 9.32533 20.7082 9.66699V10.917H15.2915V9.66699C15.2915 9.32533 15.0082 9.04199 14.6665 9.04199C14.3249 9.04199 14.0415 9.32533 14.0415 9.66699V10.967C11.7915 11.1753 10.6999 12.517 10.5332 14.5087C10.5165 14.7503 10.7165 14.9503 10.9499 14.9503H25.0499C25.2915 14.9503 25.4915 14.742 25.4665 14.5087C25.2999 12.517 24.2082 11.1753 21.9582 10.967Z" fill="#40C4AA" />
                                <path opacity="0.4" d="M25.5 17.0331V18.4831C25.5 18.9914 25.05 19.3831 24.55 19.2997C24.3167 19.2664 24.075 19.2414 23.8333 19.2414C21.3083 19.2414 19.25 21.2997 19.25 23.8247C19.25 24.2081 19.4 24.7414 19.5583 25.2248C19.7417 25.7664 19.3417 26.3247 18.7667 26.3247H14.6667C11.75 26.3247 10.5 24.6581 10.5 22.1581V17.0247C10.5 16.5664 10.875 16.1914 11.3333 16.1914H24.6667C25.125 16.1997 25.5 16.5747 25.5 17.0331Z" fill="#40C4AA" />
                                <path d="M23.8333 20.5C21.9917 20.5 20.5 21.9917 20.5 23.8333C20.5 24.4583 20.675 25.05 20.9833 25.55C21.5583 26.5167 22.6167 27.1667 23.8333 27.1667C25.05 27.1667 26.1083 26.5167 26.6833 25.55C26.9917 25.05 27.1667 24.4583 27.1667 23.8333C27.1667 21.9917 25.675 20.5 23.8333 20.5ZM25.5583 23.475L23.7833 25.1167C23.6667 25.225 23.5083 25.2833 23.3583 25.2833C23.2 25.2833 23.0417 25.225 22.9167 25.1L22.0917 24.275C21.85 24.0333 21.85 23.6333 22.0917 23.3917C22.3333 23.15 22.7333 23.15 22.975 23.3917L23.375 23.7917L24.7083 22.5583C24.9583 22.325 25.3583 22.3417 25.5917 22.5917C25.825 22.8417 25.8083 23.2333 25.5583 23.475Z" fill="#40C4AA" />
                                <path d="M15.0833 20.5004C14.8667 20.5004 14.65 20.4087 14.4917 20.2587C14.3417 20.1004 14.25 19.8837 14.25 19.6671C14.25 19.4504 14.3417 19.2338 14.4917 19.0754C14.6833 18.8838 14.975 18.7921 15.25 18.8504C15.3 18.8587 15.35 18.8754 15.4 18.9004C15.45 18.9171 15.5 18.9421 15.55 18.9754C15.5917 19.0088 15.6333 19.0421 15.675 19.0754C15.825 19.2338 15.9167 19.4504 15.9167 19.6671C15.9167 19.8837 15.825 20.1004 15.675 20.2587C15.6333 20.2921 15.5917 20.3254 15.55 20.3587C15.5 20.3921 15.45 20.4171 15.4 20.4338C15.35 20.4588 15.3 20.4754 15.25 20.4838C15.1917 20.4921 15.1333 20.5004 15.0833 20.5004Z" fill="#40C4AA" />
                                <path d="M17.9998 20.5C17.7832 20.5 17.5665 20.4083 17.4082 20.2583C17.2582 20.1 17.1665 19.8833 17.1665 19.6667C17.1665 19.45 17.2582 19.2333 17.4082 19.075C17.7248 18.7667 18.2832 18.7667 18.5915 19.075C18.7415 19.2333 18.8332 19.45 18.8332 19.6667C18.8332 19.8833 18.7415 20.1 18.5915 20.2583C18.4332 20.4083 18.2165 20.5 17.9998 20.5Z" fill="#40C4AA" />
                                <path d="M15.0833 23.4167C14.8667 23.4167 14.65 23.325 14.4917 23.175C14.3417 23.0167 14.25 22.8001 14.25 22.5834C14.25 22.3667 14.3417 22.1501 14.4917 21.9917C14.575 21.9167 14.6583 21.8584 14.7667 21.8167C15.075 21.6834 15.4417 21.7584 15.675 21.9917C15.825 22.1501 15.9167 22.3667 15.9167 22.5834C15.9167 22.8001 15.825 23.0167 15.675 23.175C15.5167 23.325 15.3 23.4167 15.0833 23.4167Z" fill="#40C4AA" />
                            </svg>
                            Attendance Management
                        </Button>
                        <Button type='link' className='button-link' style={{ backgroundColor: "#F1F3F5" }}>
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_4250_20218)">
                                    <rect x="9" y="3" width="36" height="36" rx="18" fill="#FBFDFF" shape-rendering="crispEdges" />
                                    <path d="M21.9752 11.833H19.5252C18.4668 11.833 17.8335 12.4663 17.8335 13.5247V15.9747C17.8335 17.033 18.4668 17.6663 19.5252 17.6663H21.9752C23.0335 17.6663 23.6668 17.033 23.6668 15.9747V13.5247C23.6668 12.4663 23.0335 11.833 21.9752 11.833ZM22.3918 15.633C22.6002 15.8413 22.6002 16.183 22.3918 16.3913C22.2835 16.4913 22.1418 16.5413 22.0085 16.5413C21.8752 16.5413 21.7418 16.4913 21.6335 16.3913L20.7418 15.508L19.8752 16.3913C19.7668 16.4913 19.6335 16.5413 19.4835 16.5413C19.3502 16.5413 19.2168 16.4913 19.1085 16.3913C18.9002 16.183 18.9002 15.8413 19.1085 15.633L20.0002 14.7497L19.1168 13.8747C18.9085 13.6663 18.9085 13.3247 19.1168 13.1163C19.3252 12.908 19.6668 12.908 19.8752 13.1163L20.7418 13.9997L21.6252 13.1163C21.8335 12.908 22.1752 12.908 22.3835 13.1163C22.5918 13.3247 22.5918 13.6663 22.3835 13.8747L21.5085 14.7497L22.3918 15.633Z" fill="#FFA01C" />
                                    <path opacity="0.4" d="M30.8585 12.667H23.4835C23.6002 12.9087 23.6668 13.192 23.6668 13.5253V15.9753C23.6668 17.0337 23.0335 17.667 21.9752 17.667H19.5252C19.3668 17.667 19.2252 17.6503 19.0835 17.617V25.2753C19.0835 27.517 20.9002 29.3337 23.1418 29.3337H29.7835C29.9252 29.3337 30.0668 29.2837 30.1752 29.167C31.4085 27.9253 33.5585 25.7587 34.7668 24.542C34.8752 24.4337 34.9168 24.3087 34.9168 24.1837V16.7253C34.9168 14.4837 33.1002 12.667 30.8585 12.667Z" fill="#FFA01C" />
                                    <path d="M34.9167 24.1837C34.9167 24.3087 34.875 24.4337 34.7667 24.5421C33.5584 25.7587 31.4084 27.9254 30.175 29.1671C30.0667 29.2837 29.925 29.3337 29.7834 29.3337C29.5084 29.3337 29.2417 29.1171 29.2417 28.8004V25.8837C29.2417 24.6671 30.275 23.6587 31.5417 23.6587C32.3334 23.6504 33.4334 23.6504 34.375 23.6504C34.7 23.6504 34.9167 23.9087 34.9167 24.1837Z" fill="#FFA01C" />
                                    <path d="M29.3166 21.5918H23.1333C22.7833 21.5918 22.5083 21.3085 22.5083 20.9668C22.5083 20.6251 22.7916 20.3418 23.1333 20.3418H29.3166C29.6666 20.3418 29.9416 20.6251 29.9416 20.9668C29.9416 21.3085 29.6666 21.5918 29.3166 21.5918Z" fill="#FFA01C" />
                                    <path d="M27 24.6836H23.1333C22.7833 24.6836 22.5083 24.4003 22.5083 24.0586C22.5083 23.7086 22.7916 23.4336 23.1333 23.4336H27C27.35 23.4336 27.625 23.7169 27.625 24.0586C27.625 24.4003 27.35 24.6836 27 24.6836Z" fill="#FFA01C" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_4250_20218" x="0" y="0" width="54" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="6" />
                                        <feGaussianBlur stdDeviation="4.5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.627451 0 0 0 0 0.109804 0 0 0 0.15 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4250_20218" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4250_20218" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                            Leave Management
                        </Button>
                        <Button type='link' className='button-link' href={ROUTES.payroll}>
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
                        <Button type='link' className='button-link' href={ROUTES.employee}>
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
                                title: 'Leave Management',
                            },
                        ]}
                    />
                    <h2>Leave Management</h2>
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
                            <Button type="primary" className='button-primary' style={{ width: "178px" }}>Leave Record</Button>
                            <Button color="primary" className='button-primary' variant="filled" onClick={showModal} style={{ width: "169px" }}>Leave Request</Button>
                            <Modal title="Request Leave" open={isModalOpen} onOk={handleOk} >
                                <Divider />

                            </Modal>
                            <Button icon={<SearchOutlined />} className='button-search'>Search</Button>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <RangePicker className='rangepicker'
                                defaultValue={[dayjs('01/01/2024', dateFormat), dayjs('01/01/2024', dateFormat)]}
                                format={dateFormat}
                            />
                            <Button variant="filled" style={{ color: "#30A46C", backgroundColor: "#E9F9EE" }}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z" fill="#30A46C" />
                                </svg>
                                Unlock
                            </Button>
                            <Button color="danger" variant="filled">
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
                            pagination={{ position: [bottom] }} />
                        <Divider />
                    </Content>
                    <Footer style={footerStyle}>
                        CopyRight ©{new Date().getFullYear()}. All Rights Reserved
                    </Footer>
                </Layout>
            </Layout>
        </Layout >
    );
};

export default Leave;