import { Outlet } from "react-router";
import MenuComponent from "../Menu/MenuComponent";

export default function LayoutWelcome() {
  return (
    <>
      <MenuComponent />
      <>
        <Outlet />
      </>
    </>
  );
}
