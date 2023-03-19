import { List, Divider, Form, Button, Input, Modal } from "antd";
import "./style.css";
import { UserDTO } from "../../dto/UserDTO";
import UsersService from "../../services/UsersService";
import { useState } from "react";

interface Props {
    data: UserDTO[],
    title: string,
    className: string,
    resetGet: () => {},
}

function ListUsers({ data, title, className, resetGet }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<UserDTO | undefined>(undefined);
    
    // Form
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm(); 

    const showModal = (item: UserDTO) => {
        setIsModalOpen(true);
        setSelected(item)
    };

    const handleOk = async () => {
        if (editMode) {
            const name: string = form.getFieldValue("name");
            const email: string = form.getFieldValue("email");

            const dataEdited = {...selected}

            if (name) dataEdited.name = name;
            if (email) dataEdited.email = email;

            const result = await putUsers(dataEdited);

            console.log("put: ", result);

            setEditMode(false);
            resetGet();
        }

        setIsModalOpen(false);
        setSelected(undefined);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    async function putUsers(data: any) {
        const response = await UsersService.PutUser(data)
        console.log(response);
    }

  return (
    <div className={`${className} list`}>
        <Divider orientation="left">{ title }</Divider>
        <List
            pagination={{ position: 'bottom', align: 'center', pageSize: 2, }}
            dataSource={data}
            renderItem={(item, index) => (
            <List.Item
                key={item.id}
                onClick={() => showModal(item)}
            >
                <List.Item.Meta
                title={<p>{item.name}</p>}
                description={item.email}
                />
            </List.Item>
        )}
      />
      <Modal 
            title={selected?.name} 
            open={isModalOpen}
            footer={[
                <Button key="back" onClick={editMode ? () => handleCancel() : () => handleEdit()}>
                  {editMode ? "cancelar" : "Editar"}
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                  Ok
                </Button>,
            ]}
        >
            {editMode ? (
                <>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="Nome" name="name">
                            <Input placeholder="Digite o novo nome" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Digite o novo e-mail" />
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <>
                    <p><b>E-mail: </b>{selected?.email}</p>
                </>
            )}
        </Modal>
    </div>
  );
}

export default ListUsers;