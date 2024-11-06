import React, { useEffect, useState } from 'react';
import { Table, Input, Empty } from "antd";

const AdvanceDynamicTable = ({ apiData, pagination, editable }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([[]]);

    useEffect(() => {
        // Check if apiData is empty or null
        if (!apiData || Object.keys(apiData).length === 0) {
            console.warn("apiData is empty.");
            setData([]);
            setFilteredData([]);
            return;
        }

        const headers = Object.keys(apiData);

        // Validate that each header has a 'values' array
        const isValid = headers.every((header) => Array.isArray(apiData[header]?.values));
        if (!isValid) {
            console.warn("Invalid data format: Each key in apiData must contain a 'values' array.");
            setData([]);
            setFilteredData([]);
            return;
        }

        // Ensure that each values array has consistent lengths
        const firstHeaderLength = apiData[headers[0]].values.length;
        const hasConsistentLengths = headers.every(
            (header) => apiData[header].values.length === firstHeaderLength
        );

        if (!hasConsistentLengths) {
            console.warn("Inconsistent row lengths in 'values' arrays.");
            setData([]);
            setFilteredData([]);
            return;
        }

        // Process rows by matching each header's values at row index
        const rows = apiData[headers[0]].values.map((_, rowIndex) =>
            headers.map((header) => apiData[header].values[rowIndex] ?? "")
        );

        setData([headers, ...rows]);
        setFilteredData([headers, ...rows]);
    }, [apiData]);

    // Function to handle inline editing of cell values
    const handleCellEdit = (rowIndex, colIndex, value) => {
        const updatedData = [...filteredData];
        updatedData[rowIndex + 1][colIndex] = value !== undefined ? value : ""; // Fallback for undefined
        setFilteredData(updatedData);
    };

    // Generate columns based on the headers in data[0]
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
        data.length === 0 ? (
            <Empty />
        ) : (
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
        )
    );
};

export default AdvanceDynamicTable;
