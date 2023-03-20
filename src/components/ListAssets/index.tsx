import React, { useState } from "react";

import { Timeline, List, Modal, Button, Form, Input } from "antd";
import { AssetDTO } from "../../dto/AssetDTO";
import moment from "moment";
import AssetPill from "../AssetPill";
import "./style.css";
import { defineStatus, defineColor } from "../../utils/stringFunctions";
import AssetsService from "../../services/AssetsService";
import HealthScore from "../HealthScore";

interface Props {
    data: AssetDTO[],
    className: string,
    resetGet: () => {},
}

function ListAssets({ data, className, resetGet }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<AssetDTO | undefined>(undefined);

    // Highcharts
    const plotOptions = {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
    };
    
    const dataLabels = {
        format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/><span style="font-size:12px;color:silver">km/h</span></div>',
        y: -50
    };
    const tooltip = {
        valueSuffix: ' km/h'
    }
    
    // Form
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm(); 

    const showModal = (item: AssetDTO) => {
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
            if (model) dataEdited.model = model;
            if (status) dataEdited.status = status;

            const result = await putAssets(dataEdited);

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

    async function putAssets(data: any) {
        const response = await AssetsService.PutAsset(data)
        console.log(response);
    }  

  return (
    <div className={`${className} list`}>
        <List
            itemLayout="vertical"
            size="small"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 2,
                align: "center",
            }}
            dataSource={data}
            // footer={
            // <div>
            //     <b>ant design</b> footer part
            // </div>
            // }
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    extra={
                        <div className="image-container">
                            <img
                                width={272}
                                alt={item.name}
                                src={item.image}
                            />
                        </div>
                    }
                    onClick={() => showModal(item)}
                >
                    <AssetPill status={defineStatus(item.status)} color={defineColor(item.status)} />
                    <List.Item.Meta
                        title={<a href={item.name}>{item.name}</a>}
                        description={item.model}
                    />
                    <div>
                        <Timeline
                            items={item.healthHistory.map((healthHistoryItem) => {
                                return { 
                                    children: `${defineStatus(healthHistoryItem.status)} ${moment(healthHistoryItem.timestamp).format("DD/MM/YYYY HH:MM")}`,
                                    color: defineColor(healthHistoryItem.status)   
                                }
                            })}
                        />
                    </div>
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
                        <Form.Item label="Modelo" name="model">
                            <Input placeholder="Digite o novo modelo" />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Input placeholder="Digite o novo status" />
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <>
                    <p><b>Modelo: </b>{selected?.model}</p>
                    <p><b>Status: </b>{selected?.status && defineStatus(selected?.status)}</p>
        
                    <h3>Pontuação da Saúde</h3>
                    {/* <meter value={selected?.healthscore} min="0" max="100" /> <span>{selected?.healthscore}</span> */}
                    {selected?.healthscore && <HealthScore score={selected?.healthscore} />}

                    <h3>Métricas</h3>
                    <p><b>Último tempo de atividade em: </b>{moment(selected?.metrics.lastUptimeAt).format("DD/MM/YYYY HH:MM")}</p>
                    <p><b>Tempo total de coleta: </b>{selected?.metrics.totalCollectsUptime}</p>
                    <p><b>Tempo de atividade total: </b>{selected?.metrics.totalUptime.toFixed(2)}</p>
        
                    <h3>Sensores</h3>
                    <div>
                        { selected?.sensors.map((item) => {
                            return (<p>{item}</p>);
                        })}
                    </div>
        
                    <h3>Especificações</h3>
                    <div>
                        { selected?.specifications && Object.entries(selected?.specifications).map(([key,value]) => {
                            return <p>{key}: {value}</p>
                        })}
                    </div>
        
                    <h3>Histórico de Saúde</h3>
                    <Timeline
                        items={selected?.healthHistory.map((healthHistoryItem) => {
                            return { 
                                children: `${defineStatus(healthHistoryItem.status)} ${moment(healthHistoryItem.timestamp).format("DD/MM/YYYY HH:MM")}`,
                                color: defineColor(healthHistoryItem.status)   
                            }
                        })}
                    />
                </>
            )}
        </Modal>
    </div>
  );
}

export default ListAssets;
