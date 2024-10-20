import React, { useState } from "react";
import { AutoComplete, AutoCompleteProps } from "antd";
import styles from "./autocomplete.module.css";

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
        <div className={styles.autoCompleteContainer}>
        <AutoComplete
            className={styles.autoCompleteInput}
            options={filteredOptions}
            onSearch={handleSearch}
            onSelect={handleSelect}
            placeholder="Add a food..."
            style={{ width: 200 }}
            {...props} 
        />
        </div>
    );
};

export default AutoCompleteComponent;