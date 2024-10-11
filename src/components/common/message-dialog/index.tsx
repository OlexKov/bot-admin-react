import React, { ReactNode, useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

interface Props {
    title: string;
    description: string;
    onSubmit: (message:string) => void,
    buttonIcon:ReactNode | undefined,
    buttonText:string | undefined
}
export const MessageDialog: React.FC<Props> = ({ title, description, onSubmit,buttonIcon,buttonText}) => {
    const [open, setOpen] = useState(false);
    const [message,setMessage] = useState<string>('Адмін: ');
    const handleCancel = () => {
        setOpen(false);
        setMessage('Адмін: ')
    };
   

    const hundleConfirm = async() => {
        handleCancel();
        onSubmit(message);
    }
 //<MessageOutlined />
    return (
        <>
        <Button icon ={buttonIcon} onClick={() => setOpen(true)} type="primary">{buttonText}</Button>
            <Modal animation={true} open={open} title={title} footer={[
                <Button key="back" onClick={handleCancel}>
                    Скасувати
                </Button>,
                <Button key="submit" type="primary" onClick={hundleConfirm}>
                    Надіслати
                </Button>
            ]} onCancel={handleCancel}>
                <p>{description}</p>
                <TextArea value={message} onChange={(e)=>setMessage(e.target.value)}/>
            </Modal>
        </>
    );
}