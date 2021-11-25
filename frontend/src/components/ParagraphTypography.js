import { Typography } from "@mui/material";
import React from "react";

export default function ParagraphTypography(props){
	return <Typography {...props} style={{ ...props.style, fontFamily: "Noto Sans" }}>
		{props.children}
	</Typography>;
}