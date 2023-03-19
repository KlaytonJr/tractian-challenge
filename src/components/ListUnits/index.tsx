import { List, Divider, Form, Input, Button, Modal } from "antd";
import "./style.css";
import { UnitDTO } from "../../dto/UnitDTO";
import UnitsService from "../../services/UnitsService";
import { useState } from "react";

interface Props {
    data: UnitDTO[],
    title: string,
    className: string,
    resetGet: () => {},
}

function ListUnits({ data, title, className, resetGet }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<UnitDTO | undefined>(undefined);
    
    // Form
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm(); 

    const showModal = (item: UnitDTO) => {
        setIsModalOpen(true);
        setSelected(item)
    };

    const handleOk = async () => {
        if (editMode) {
            const name: string = form.getFieldValue("name");
            const model: string = form.getFieldValue("model");
            const status: string = form.getFieldValue("status");

            const dataEdited = {...selected}

            if (name) dataEdited.name = name;

            const result = await putUnits(dataEdited);

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

    async function putUnits(data: any) {
        const response = await UnitsService.PutUnit(data)
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
                description=""
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
                    </Form>
                </>
            ) : (
                <>
                </>
            )}
        </Modal>
    </div>
  );
}

export default ListUnits;