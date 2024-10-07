# Advance Dynamic Table

A React component for creating dynamic, editable tables using Ant Design.

## Installation

```bash
npm install advance-dynamic-table

Usage:

import React from 'react';
import { AdvanceDynamicTable } from 'advance-dynamic-table';
import 'antd/dist/antd.css';

const apiData = {
    name: { values: ['John', 'Jane'] },
    age: { values: [28, 26] }
};

const App = () => (
    <AdvanceDynamicTable apiData={apiData} editable={true} pagination={true} />
);

export default App;

Props:

apiData: Object - Table data in the form of headers and values.
editable: Boolean - Makes table cells editable.
pagination: Boolean - Enables/disables pagination.
