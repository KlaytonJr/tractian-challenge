import { List, Divider, Form, Input, Modal, Button } from "antd";
import "./style.css";
import { CompanyDTO } from "../../dto/CompanyDTO";
import CompaniesService from "../../services/CompaniesService";
import { useState } from "react";

interface Props {
    data: CompanyDTO[],
    title: string,
    className: string,
    resetGet: () => {},
}

function ListCompanies({ data, title, className, resetGet }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<CompanyDTO | undefined>(undefined);
    
    // Form
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm(); 

    const showModal = (item: CompanyDTO) => {
        setIsModalOpen(true);
        setSelected(item)
    };

    const handleOk = async () => {
        if (editMode) {
            const name: string = form.getFieldValue("name");

            const dataEdited = {...selected}

            if (name) dataEdited.name = name;

            const result = await putCompanies(dataEdited);

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

    async function putCompanies(data: any) {
        const response = await CompaniesService.PutCompany(data)
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

export default ListCompanies;