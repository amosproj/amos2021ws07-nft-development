import { Typography } from "@mui/material";
import React from "react";

export default function HeaderTypography(props){
	return <Typography {...props} style={{ ...props.style, fontFamily: "Montserrat" }}>
		{props.children}
	</Typography>;
}