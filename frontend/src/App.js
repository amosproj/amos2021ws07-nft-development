// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import logo from "./nft-logo.png";
import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Button } from "@mui/material";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CenterFlexBox from "./components/CenterFlexBox";
import Profile from "./pages/Profile";
import EmailConfirmPage from "./pages/EmailConfirmPage";
import RequestPasswordResetPage from "./pages/RequestPasswordResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import appwriteApi from "./api/appwriteApi";
import Typography from "@mui/material/Typography";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		appwriteApi.getAccount()
			.then((r) => setUser(r))
			.catch(() => {});
	}, []);

	return (<div style={{ backgroundColor: "#282c34", minHeight: "100vh" }}>
		<Router>
			<Header user={user}>
				<Route exact path="/">
					<CenterFlexBox>
						<Typography component="h1" variant="h5" style={{ color: "white" }}>
							Coming soon!
						</Typography>
						<img src={logo} className="App-logo" alt="logo" />
						<Typography component="h1" variant="h5" style={{ color: "white" }}>
							NFT the world!
						</Typography>
						<Button
							sx={{ mt: 2 }}
							style={{ width: "min(50vw,500px)", minHeight: "min(30vh,150px)", fontSize: "4vh", backgroundColor: "#005438", borderRadius: "15px", color: "white" }}
							component={Link}
							to="/drop">
								JOIN THE DROP!
						</Button>
					</CenterFlexBox>
				</Route>
				<Route path="/drop">
					<CenterFlexBox>
						SOON!
					</CenterFlexBox>
				</Route>
				<Route exact path="/login">
					<Login setUser={setUser} user={user}/>
				</Route>
				<Route exact path="/signup">
					<SignUp setUser={setUser} user={user}/>
				</Route>
				<Route exact path="/requestPasswordReset">
					<RequestPasswordResetPage setUser={setUser} user={user}/>
				</Route>
				<Route exact path="/resetPassword">
					<ResetPasswordPage setUser={setUser} user={user}/>
				</Route>
				<Route exact path="/changePassword">
					<ChangePasswordPage setUser={setUser} user={user}/>
				</Route>
				<Route exact path="/profile">
					<Profile setUser={setUser} user={user}/>
				</Route>
				<Route exact path="/confirm">
					<EmailConfirmPage setUser={setUser} user={user}/>
				</Route>
			</Header>
		</Router>
	</div>
	);
}

export default App;
