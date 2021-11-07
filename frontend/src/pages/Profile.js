import CenterFlexBox from "../components/CenterFlexBox";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import appwriteApi from "../api/appwriteApi";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";

export default function Profile({ user, setUser }) {
	const [data, setData] = useState({ name: "", email: "", emailVerification: false });
	const history = useHistory();

	const routeChange = (path) =>{
		history.push(path);
	};

	useEffect(() => {
		appwriteApi.getAccount().then((d) => {
			setData(d);
		});
	}, []);

	if (!user){
		routeChange("/");
	}
	return <CenterFlexBox>
		<Grid
			container
			spacing={2}
			alignItems="center"
			justifyContent="center"
			direction="column">
			<Grid item style={{ width: "100%" }}>
				<TableContainer  style={{ color: "white" }}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell style={{ color: "white", borderBottom: "none" }}>Name</TableCell>
								<TableCell style={{ color: "white", borderBottom: "none" }}>{data.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ color: "white", borderBottom: "none" }}>Email</TableCell>
								<TableCell style={{ color: "white", borderBottom: "none" }}>{data.email}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ color: "white", borderBottom: "none" }}>Email verified?</TableCell>
								<TableCell style={{ color: "white", borderBottom: "none" }}>{data.emailVerification ? "Yes" : <>No <span style={{ textDecorationLine: "underline", cursor: "pointer" }} onClick={() => appwriteApi.sendEmailConfirmation().then(e => console.log(e))}>Resent email verification</span></>}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item>
				<Button variant="outlined" style={{ color: "red" }} onClick={() => appwriteApi.deleteCurrentSession().then(() => setUser(null))}>Logout</Button>
			</Grid>
		</Grid>

	</CenterFlexBox>;
}