import { List, Divider, Form, Button, Input, Modal, Timeline } from "antd";
import "./style.css";
import { UserDTO } from "../../dto/UserDTO";
import UsersService from "../../services/UsersService";
import { useState } from "react";
import { WorkorderDTO } from "../../dto/WorkorderDTO";
import moment from "moment";
import { defineStatus, defineColor } from "../../utils/stringFunctions";
import WorkordersService from "../../services/WorkordersService";

interface Props {
    data: WorkorderDTO[],
    title: string,
    className: string,
    resetGet: () => {},
}

function ListWorkorders({ data, title, className, resetGet }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<WorkorderDTO | undefined>(undefined);
    
    // Form
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm(); 

    const showModal = (item: WorkorderDTO) => {
        setIsModalOpen(true);
        setSelected(item)
    };

    const handleOk = async () => {
        if (editMode) {
            const title: string = form.getFieldValue("title");
            const description: string = form.getFieldValue("description");
            const priority: string = form.getFieldValue("priority");

            const dataEdited = {...selected}

            if (title) dataEdited.title = title;
            if (description) dataEdited.description = description;
            if (priority) dataEdited.priority = priority;

            const result = await putWorkorders(dataEdited);

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

    async function putWorkorders(data: any) {
        const response = await WorkordersService.PutWorkorder(data)
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
                title={<p>{item.title}</p>}
                description={item.description}
                />
            </List.Item>
        )}
      />
      <Modal 
            title={selected?.title} 
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
                        <Form.Item label="Título" name="title">
                            <Input placeholder="Digite o novo name" />
                        </Form.Item>
                        <Form.Item label="Descrição" name="description">
                            <Input placeholder="Digite a nova descrição" />
                        </Form.Item>
                        <Form.Item label="Prioridade" name="priority">
                            <Input placeholder="Digite o novo status de prioridade" />
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <>
                    <p><b>Descrição: </b>{selected?.description}</p>

                    <Timeline
                        items={selected?.checklist.map((checklistItem) => {
                            return { 
                                children: `${checklistItem.task}`,
                                color: checklistItem ? "green" : "red"   
                            }
                        })}
                    />
                </>
            )}
        </Modal>
    </div>
  );
}

export default ListWorkorders;