import React from "react";
import { FloatButton, FloatButtonProps } from "antd";
import {Icons} from "../"

interface ButtonProps
    extends Omit<FloatButtonProps, 'icon'> {
        children?: React.ReactNode
        icon?: 'default' | 'checkmark'
}

function ButtonIcon({...props}: ButtonProps){

    return(
        <FloatButton {...props} icon={<Icons icon={props.icon}></Icons>}>
            {props.children}
        </FloatButton>
    );
}

export default ButtonIcon