import React from "react";
import { Dropdown, Button, MenuProps } from "antd";
import { Icons } from "../";

interface DropdownButtonProps {
  children?: React.ReactNode;
  icon?: 'default' | 'checkmark';
  menuItems: MenuProps['items']; // Expecting an array of menu items
}

function DropdownButton({ icon, menuItems, ...props }: DropdownButtonProps) {
  const menu = { items: menuItems };

  return (
    <Dropdown menu={menu} trigger={['click']}>
      <Button icon={<Icons icon={icon} />}>
        {props.children}
      </Button>
    </Dropdown>
  );
}

export default DropdownButton;