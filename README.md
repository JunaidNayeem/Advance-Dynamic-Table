


# AdvanceDynamicTable

**AdvanceDynamicTable** is a flexible and dynamic React component designed to render table data with support for cell editing, pagination, and customizable API data format. This component is ideal for applications needing a user-friendly, editable data table interface.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Required Props](#required-props)
  - [API Data Format](#api-data-format)
  - [Edge Cases & Error Handling](#edge-cases--error-handling)
  - [Component Customization](#component-customization)
  - [Example Code](#example-code)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Installation

To install the `AdvanceDynamicTable` package, run the following command:

```bash
npm install advance-dynamic-table
```

## Usage

### Basic Usage

1. Import the `AdvanceDynamicTable` component into your React project:

   ```javascript
   import { AdvanceDynamicTable } from "advance-dynamic-table";
   ```

2. Use the component in your React app by passing the required props:

   ```javascript
   const apiData = {
       name: { values: ["Alice", "Bob", "Charlie"] },
       age: { values: [25, 30, 35] },
       city: { values: ["New York", "Los Angeles", "Chicago"] },
   };

   const App = () => (
       <AdvanceDynamicTable
           apiData={apiData}
           pagination={true} // Enable pagination
           editable={true}  // Make table cells editable
       />
   );

   export default App;
   ```

### Required Props

- **`apiData`**: An object containing column headers and values for the table.
- **`pagination`**: Boolean flag to enable/disable pagination.
- **`editable`**: Boolean flag to allow cells to be editable.

### API Data Format

The `apiData` prop must follow a specific format to render correctly. Here’s the required structure:

```javascript
const apiData = {
    column1: { values: ["row1_data", "row2_data", ...] },
    column2: { values: ["row1_data", "row2_data", ...] },
    // Additional columns can be added
};
```

#### Example of Valid `apiData`:

```javascript
const apiData = {
    name: { values: ["Alice", "Bob", "Charlie"] },
    age: { values: [25, 30, 35] },
    city: { values: ["New York", "Los Angeles", "Chicago"] },
};
```

#### Handling Incorrect Data Formats

To avoid errors:
- Ensure each column has the same number of rows (consistent data length).
- Data should be structured in objects with arrays as `values` for each column.

### Edge Cases & Error Handling

- **Empty `apiData`**: If no data is provided, a "No data available" message will appear.
- **Invalid Format**: If the data is not in the correct format, a warning will appear in the console, and "No data available" will render on the screen.
- **Inconsistent Row Lengths**: If row lengths are mismatched, the table will not render and a warning will be logged.

### Component Customization

- **Pagination**: Set `pagination={true}` to enable pagination or `pagination={false}` to display all rows at once.
- **Editable Cells**: Setting `editable={true}` will allow cells to be edited. When a user edits a cell, the updated data will reflect in the table.

### Example Code

Here’s an example showing all the main props in action:

```javascript
import React from "react";
import { AdvanceDynamicTable } from "advance-dynamic-table";

const apiData = {
    name: { values: ["Alice", "Bob", "Charlie"] },
    age: { values: [25, 30, 35] },
    city: { values: ["New York", "Los Angeles", "Chicago"] },
};

const App = () => (
    <div style={{ padding: "20px" }}>
        <h1>My Dynamic Table</h1>
        <AdvanceDynamicTable apiData={apiData} pagination={true} editable={true} />
    </div>
);

export default App;
```

## Troubleshooting

- **Error: "Invalid data format"**: Check that `apiData` is structured with column names as keys and `values` arrays as data.
- **Table not rendering**: Ensure all columns have the same number of data entries to maintain consistent row length.

## License

This project is licensed under the MIT License.
