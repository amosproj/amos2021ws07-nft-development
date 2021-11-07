import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";


export default function CenterFlexBox({ children }) {
	return <Container component="main" maxWidth="xs">
		<CssBaseline />
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			{children}
		</Box>
	</Container>;
}