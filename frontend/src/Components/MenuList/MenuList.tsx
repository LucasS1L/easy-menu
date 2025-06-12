import { Menu } from "antd";
import {
    HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router/ROUTES.ts";

export default function MenuList() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Menu style={{ flex: 1, fontSize: "2.2vh", overflow: "auto" }} mode="inline">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to={ROUTES.home}>Home</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}
