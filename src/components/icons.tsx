import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";


// See icons: https://react-icons.github.io/react-icons/icons/io/

type IconProps = {
    icon?: 'default' | 'checkmark'
}

function Icons(props: IconProps) {
    switch(props.icon) {
        case 'default': 
            return(<IoMdCheckmarkCircle></IoMdCheckmarkCircle>);
        case 'checkmark': 
            return(<IoMdCheckmarkCircle></IoMdCheckmarkCircle>);
        default:
            return(<IoMdCheckmarkCircle></IoMdCheckmarkCircle>);
    }
}

export default Icons