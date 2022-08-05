import React, { FC, useState } from "react";
import SidebarItems from "./SidebarItems";

type AdminSidebarProps = {
  selectedItem: string | undefined;
  setSelectedItem: (item: string) => void;
};

const AdminSidebar: FC<AdminSidebarProps> = ({
  selectedItem = SidebarItems[0],
  setSelectedItem,
}) => {
  return (
    <div className="border-r border-sky-500 border-opacity-20 hidden md:flex flex-col gap-1 px-6 py-4">
      {SidebarItems.map((item) => (
        <div
          key={item}
          className={`text-white  drop-shadow-lg text-center px-12 py-2 rounded-lg font-semibold hover:cursor-pointer transition-all duration-150 ${
            selectedItem === item
              ? "bg-sky-500"
              : "hover:bg-black hover:bg-opacity-10"
          }`}
          onClick={() => setSelectedItem(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default AdminSidebar;
