import React, { useState } from "react";
import { AutoComplete, AutoCompleteProps } from "antd";


interface AutoCompleteButtonProps
    extends Omit<AutoCompleteProps, 'options'> {
    options: { value: string }[];
    handleSelect: (value: string) => void;
}

const AutoCompleteComponent: React.FC<AutoCompleteButtonProps> = ({ options, handleSelect, ...props }) => {
    const [filteredOptions, setFilteredOptions] = useState<{ value: string }[]>(options);

    const handleSearch = (searchText: string) => {
        const newOptions = options.filter(option => option.value.toLowerCase().includes(searchText.toLowerCase())); // Case-insensitive search
        setFilteredOptions(newOptions);
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

export default AutoCompleteComponent;