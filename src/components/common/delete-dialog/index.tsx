import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
    title: string;
    description: string;
    onSubmit: () => Promise<void>;
}
export const DeleteDialog: React.FC<Props> = ({ title, description, onSubmit}) => {
    const [open, setOpen] = useState(false);
    const handleCancel = () => {
        setOpen(false);
    };

    const hundleConfirm = async() => {
        handleCancel();
        await onSubmit();
    }
 
    return (
        <>
        <Button icon ={<DeleteOutlined />} onClick={() => setOpen(true)} danger type="primary"/>
            <Modal animation={true} open={open} title={title} footer={[
                <Button key="back" onClick={handleCancel}>
                    Скасувати
                </Button>,
                <Button key="submit" type="primary" onClick={hundleConfirm}>
                    Видалити
                </Button>
            ]} onCancel={handleCancel}>
                <p>{description}</p>
            </Modal>
        </>
    );
}