import React from "react";

import { Timeline, List } from "antd";
import { AssetDTO, Status } from "../../interfaces/AssetDTO";
import moment from "moment";

interface Props {
    data: AssetDTO[]
}

function ListAssets({ data }: Props) {

    function defineColor(status: Status | string) {
        switch(status) {
            case Status.inOperation:
                return "green";
            case Status.inDowntime:
                return "blue";
            case Status.inAlert:
            case Status.unplannedStop:
                return "red";
            default:
                return "grey";
        }
    }

  return (
    <div className="App">
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
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
                    <img
                        width={272}
                        alt={item.name}
                        src={item.image}
                    />
                    }
                >
                    <List.Item.Meta
                        // avatar={<Avatar src={item.image} />}
                        title={<a href={item.name}>{item.name}</a>}
                        description={item.model}
                    />
                    <Timeline
                        items={item.healthHistory.map((healthHistoryItem) => {
                            return { 
                                children: `${healthHistoryItem.status} ${moment(healthHistoryItem.timestamp).format("D/MM/YYYY HH:MM")}`,
                                color: defineColor(healthHistoryItem.status)   
                            }
                        })}
                    />
                </List.Item>
            )}
        />
    </div>
  );
}

export default ListAssets;
