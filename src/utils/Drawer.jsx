import { useState } from "react";
import { Button, Drawer } from "antd";

const CommonDrawer = ({ content, open, setOpen, drawerTitle, width }) => {
  //   const [open, setOpen] = useState(false);
  //   const showDrawer = () => {
  //     setOpen(true);
  //   };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title={drawerTitle}
        placement="right"
        onClose={onClose}
        open={open}
        width={width}
      >
        {content}
      </Drawer>
    </>
  );
};

export default CommonDrawer;
