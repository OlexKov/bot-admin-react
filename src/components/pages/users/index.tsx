import { useSelector } from "react-redux"
import { User } from "../../../models/User"
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Avatar, Button, Divider, Pagination, Space, Table, TableProps } from "antd";
import { APP_ENV } from "../../../env";
import { BotUser } from "../../../models/BotUser";
import { PagintionData } from "../../../models/PaginationData";
import { paginatorConfig } from "../../../helpers/constants";
import { userService } from "../../../services/userService";
import { getQueryString } from "../../../helpers/common-methods";
import { DeleteDialog } from "../../common/delete-dialog";
import { MessageOutlined } from "@ant-design/icons";




const imageFolder = `${APP_ENV.SERVER_HOST}${APP_ENV.IMAGES_FOLDER}`
export const Users: React.FC = () => {
    const user: User | undefined = useSelector((state: RootState) => state.userStore.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/Login')
        }
    }, [user])

    const [data, setData] = useState<BotUser[]>()
    const [searchParams, setSearchParams] = useSearchParams('');
    const [pagination, setPagination] = useState<PagintionData>({
        page: Number(searchParams.get("page")) || paginatorConfig.pagination.defaultCurrent,
        pageSize: Number(searchParams.get("pageSize")) || paginatorConfig.pagination.defaultPageSize,
    })
    const [total, setTotal] = useState<number>(0)
    const mainElement = document.querySelector('main') as HTMLElement;

    const columns: TableProps<BotUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Фото',
            dataIndex: 'image',
            key: 'image',
            render: (element: string) => <Avatar size={32} src={`${imageFolder}/200_${element}`} />
        },
        {
            title: 'Юзер',
            key: 'userName',
            dataIndex: 'userName',
        },
        {
            title: `Ім'я`,
            key: 'name',
            dataIndex: 'firstName',
            render: (element: string) => element && element !== '' ? element : "------"
        },
        {
            title: 'Прізвище',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (element: string) => element && element !== '' ? element : "------"
        },
        {
            title: 'Телефон',
            key: 'phoneNumbere',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Професія',
            dataIndex: 'professionName',
            key: 'professionName',
            render: (element: string) => element && element !== '' ? element : "------"
        },
        {
            title: 'Чат ID',
            key: 'chatId',
            dataIndex: 'chatId',
            render: (element: number) => element === 0 ? "ADMIN" : element
        },
        {
            title: '',
            key: 'action',
            render: (element: BotUser) =>
                element.chatId > 0 &&
                <Space>
                    <Button icon={<MessageOutlined />} onClick={() => navigate(`create?id=${element.id}`)} type='primary' />
                    <DeleteDialog title={"Ви впевненні?"}
                        description={`Видалити "${element.userName}"?`}
                        onSubmit={() => deleteCategory(element.id)} />
                </Space>
        },
    ];

    useEffect(() => {
        if (mainElement !== null) { mainElement.scrollTo({ top: 0, behavior: 'smooth' }); }
    }, [data])

    useEffect(() => {
        (async () => {
            setSearchParams(getQueryString(pagination))
            await getData()
        })()
    }, [pagination]);

    const getData = async () => {
        const result = await userService.get(pagination.page, pagination.pageSize)
        if (result.status == 200) {
            setData(result.data.elements)
            setTotal(result.data.totalCount)
        }
    }

    const deleteCategory = async (id: number) => {
        // const result = await categoryService.delete(id)
        // if (result.status == 200) {
        //     const category = data?.find(x => x.id === id);
        //     message.success(`Category "${category?.name}" successfully deleted`)
        //     if (data?.length === 1 && pagination.page > 1) {
        //         const newPage = pagination.page - 1;
        //         setPagination({ ...pagination, page: newPage })
        //     }
        //     else {
        //         await getData();
        //     }
        // }
    }

    const onPaginationChange = (currentPage: number, pageSize: number) => {
        setPagination({ ...pagination, page: currentPage, pageSize: pageSize })
    }
    return (

        <div className=' w-75 mx-auto my-4'>
            <Divider className='fs-5 border-dark-subtle mb-5' orientation="left">Таблиця юзерів</Divider>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={false}
            />
            {total > 0 &&
                <Pagination
                    align="center"
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={paginatorConfig.pagination.pageSizeOptions}
                    locale={paginatorConfig.pagination.locale}
                    showTotal={paginatorConfig.pagination.showTotal}
                    current={pagination.page}
                    total={total}
                    pageSize={pagination.pageSize}
                    onChange={onPaginationChange}
                    className='mt-4' />
            }

        </div>

    )
}