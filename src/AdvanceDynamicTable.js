import React, { useEffect, useState } from 'react';
import { Table, Input } from "antd";

export const AdvanceDynamicTable = ({ apiData, pagination, editable }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([[]]);

    useEffect(() => {
        if (apiData && typeof apiData === 'object') {
            const headers = Object.keys(apiData);
            if (!Array.isArray(apiData[headers[0]].values)) {
                throw new Error("Invalid data format");
            }
            const rows = apiData[headers[0]].values.map((_, rowIndex) =>
                headers.map((header) => apiData[header].values[rowIndex])
            );
            setData([headers, ...rows]);
            setFilteredData([headers, ...rows]);
        }
    }, [apiData]);

    const handleCellEdit = (rowIndex, colIndex, value) => {
        const updatedData = [...filteredData];
        updatedData[rowIndex + 1][colIndex] = value;
        setFilteredData(updatedData);
    };

    const columns = Array.isArray(data[0])
        ? data[0].map((header, index) => ({
            title: header,
            dataIndex: index,
            key: index,
            render: (text, record, rowIndex) => {
                if (editable) {
                    return (
                        <Input
                            style={{ border: "none" }}
                            value={record[index]}
                            onChange={(e) =>
                                handleCellEdit(rowIndex, index, e.target.value)
                            }
                        />
                    );
                }
                return text;
            },
        }))
        : [];

    return (
        <Table
            rowClassName={() => (editable ? "editable-row" : "")}
            bordered
            dataSource={filteredData.slice(1).map((row, rowIndex) => ({
                key: rowIndex,
                ...row.reduce((acc, cell, colIndex) => {
                    acc[colIndex] = cell;
                    return acc;
                }, {}),
            }))}
            columns={columns}
            pagination={pagination}
            scroll={{
                y: pagination === false ? 300 : undefined,
                x: '100%',
            }}
            style={{ width: '100%' }}
        />
    );
};
