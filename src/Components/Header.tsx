import { AppBar, Typography, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant={"h5"} mr={"auto"} textTransform={"uppercase"}>
          ScottLang
        </Typography>
        <Link
          style={{ color: "White", margin: "0.5rem", textDecoration: "none" }}
          to={"/"}
        >
          Home
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
