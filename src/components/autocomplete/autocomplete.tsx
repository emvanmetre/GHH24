import React, { useState } from "react";
import { AutoComplete, AutoCompleteProps } from "antd";

const foodOptions = [
    { value: "Apple" },
    { value: "Banana" },
    { value: "Cherry" },
    { value: "Date" },
    { value: "Eggplant" },
    { value: "Fig" },
    { value: "Grape" },
    { value: "Honeydew" },
];

interface AutoCompleteButtonProps
    extends Omit<AutoCompleteProps, 'options'> {
    options: { value: string }[];
}

const AutoCompleteComponent: React.FC<AutoCompleteButtonProps> = ({ options = foodOptions, ...props }) => {
    const [filteredOptions, setFilteredOptions] = useState<{ value: string }[]>(options);

    const handleSearch = (searchText: string) => {
        const newOptions = options.filter(option => option.value.toLowerCase().includes(searchText.toLowerCase())); // Case-insensitive search
        setFilteredOptions(newOptions);
    };

    const handleSelect = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <AutoComplete
            options={filteredOptions}
            onSearch={handleSearch}
            onSelect={handleSelect}
            placeholder="Add a food..."
            style={{ width: 200 }}
            {...props} 
        />
    );
};

export default AutoComplete;