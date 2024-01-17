import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Sidebar from "../sidebar/Sidebar";
import "./NavigationBar.scss";


const Navbar: React.FC = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Sidebar />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: 'black'
                    }}
                >
                    ***__ Welcome to Multi Project App __***
                </Typography>
                {/* <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 0.1,
                        display: "flex",
                        justifyContent: "end",
                        fontWeight: "bold",
                        color: 'black'
                    }}
                >
                    Created By Amol Pounikar
                </Typography> */}
            </Toolbar>
        </AppBar>
    </Box>
);

export default Navbar;
