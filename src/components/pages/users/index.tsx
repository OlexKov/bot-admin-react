import { useSelector } from "react-redux"
import { User } from "../../../models/User"
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Avatar, Divider, message, Pagination, Space, Table, TableProps } from "antd";
import { APP_ENV } from "../../../env";
import { BotUser } from "../../../models/BotUser";
import { PagintionData } from "../../../models/PaginationData";
import { paginatorConfig } from "../../../helpers/constants";
import { userService } from "../../../services/userService";
import { getQueryString } from "../../../helpers/common-methods";
import { DeleteDialog } from "../../common/delete-dialog";
import { accountService } from "../../../services/accountService";
import { MessageDialog } from "../../common/message-dialog";
import { botService } from "../../../services/botService";
import noImage from "../../../../user.png"
import { MessageOutlined } from "@ant-design/icons";




const imageFolder = `${APP_ENV.SERVER_HOST}${APP_ENV.IMAGES_FOLDER}`
export const Users: React.FC = () => {
    const user: User | undefined = useSelector((state: RootState) => state.userStore.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
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
            render: (element: string) => <Avatar size={48} src={element ? `${imageFolder}/200_${element}` : noImage} />
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
                    <MessageDialog
                        title={`Повідомлення для "${element.userName}"`}
                        description="Текст повідомлення"
                        onSubmit={(message) => { sendMessage(element.chatId, message) }}
                        buttonIcon={<MessageOutlined />}
                        buttonText=""
                    />
                    <DeleteDialog
                        title={"Ви впевненні?"}
                        description={`Видалити "${element.userName}"?`}
                        onSubmit={() => deleteUser(element.id, element.chatId)} />
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

    const sendMessage = async (id: number, mess: string) => {
        const result = await botService.sendMessage({ chatId: id, message: mess });
        if (result.status == 200) {
            message.success("Повідомлення відправлено")
        }
    }

    const sendMessageAll = async (mess: string) => {
        const result = await userService.getAll()
        if (result.status === 200) {
            result.data.forEach(async (user: BotUser) => {
                if (user.chatId) {

                    await botService.sendMessage({ chatId: user.chatId, message: mess });
                }
            })
            if (result.data.filter(x => x.chatId).length > 0) {
                message.success("Повідомлення відправлені")
            }
            else {
                message.success("Юзери яким можна відправити повідомлення відсутні")
            }
        }
    }

    const deleteUser = async (id: number, chatId: number) => {
        const result = await accountService.delete(id)
        if (result.status == 200) {
            const user = data?.find(x => x.id === id);
            message.success(`Користувача"${user?.userName}" видалено`)
            if (data?.length === 1 && pagination.page > 1) {
                const newPage = pagination.page - 1;
                setPagination({ ...pagination, page: newPage })
            }
            else {
                await getData();
            }
            await botService.sendMessage({ chatId: chatId, message: "Адміністратор видалив вас з бази даних" })
        }
    }

    const onPaginationChange = (currentPage: number, pageSize: number) => {
        setPagination({ ...pagination, page: currentPage, pageSize: pageSize })
    }
    return (
        <>
            <div style={{ position: "absolute", right: 20, top: 100 }}>
                <MessageDialog
                    title={`Повідомлення всім учасникам`}
                    description="Текст повідомлення"
                    onSubmit={(message) => { sendMessageAll(message) }}
                    buttonIcon={<MessageOutlined />}
                    buttonText="Надіслати всім"
                />
            </div>
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
        </>


    )
}