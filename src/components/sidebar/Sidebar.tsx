import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import PolicySharpIcon from "@mui/icons-material/PolicySharp";
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { Link } from "react-router-dom"

type Anchor = "top" | "left" | "bottom" | "right";

const Home: React.FC = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" ||
                        (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250, color: 'primary.dark' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[
                    { text: "Home", icon: <HomeIcon />, path: "/" },
                    { text: "Counter", icon: <AddCircleIcon />, path: "/counter" },
                    { text: "Modal", icon: <ViewModuleIcon />, path: "/modal" },
                    { text: "Quize", icon: <HelpOutlineIcon />, path: "/quiz" },
                    { text: "User Search", icon: <AccountCircleIcon />, path: "/userS" },
                    { text: "Converter", icon: <PolicySharpIcon />, path: "/currency-converter" },
                    { text: "Photo", icon: <CollectionsRoundedIcon />, path: "/photos" },
                ].map(({ text, icon, path }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to={path}>
                            <ListItemIcon sx={{ color: "secondary.dark" }}>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer("left", true)} style={{ color: "black" }}>
                <MenuSharpIcon />
            </Button>
            <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </div>
    );
};

export default Home;
