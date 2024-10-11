import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

interface Props {
    title: string;
    description: string;
    onSubmit: (message:string) => void
}
export const MessageDialog: React.FC<Props> = ({ title, description, onSubmit}) => {
    const [open, setOpen] = useState(false);
    const [message,setMessage] = useState<string>('');
    const handleCancel = () => {
        setOpen(false);
        setMessage('')
    };
   

    const hundleConfirm = async() => {
        handleCancel();
        onSubmit(message);
    }
 
    return (
        <>
        <Button icon ={<MessageOutlined />} onClick={() => setOpen(true)} type="primary"/>
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