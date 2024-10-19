import React, { useState } from "react";
import { AutoComplete, AutoCompleteProps } from "antd";

interface AutoCompleteButtonProps
    extends Omit<AutoCompleteProps, 'options'> {
    options: { value: string }[];
}

const AutoCompleteComponent: React.FC<AutoCompleteButtonProps> = ({ options, ...props }) => {
    const [filteredOptions, setFilteredOptions] = useState<{ value: string }[]>(options);

    const handleSearch = (searchText: string) => {
        const newOptions = options.filter(option => option.value.includes(searchText));
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
            placeholder="Type something..."
            style={{ width: 200 }}
            {...props} // props will still apply without suffix
        />
    );
};

export default AutoCompleteComponent;