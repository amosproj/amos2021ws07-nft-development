// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import logo from "./nft-logo.png";
import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Button } from "@mui/material";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CenterFlexBox from "./components/CenterFlexBox";
import Profile from "./pages/Profile";
import EmailConfirmPage from "./pages/EmailConfirmPage";

function App() {
	const [user, setUser] = useState(null);

	return (<div style={{ backgroundColor: "#282c34", minHeight: "100vh" }}>
		<Router>
			<Header user={user}>
				<Route exact path="/">
					<CenterFlexBox>
						<p>
							Coming soon!
						</p>
						<img src={logo} className="App-logo" alt="logo" />
						<p>
							NFT the world!
						</p>
						<Button
							style={{ width: "min(50vw,500px)", minHeight: "min(30vh,150px)", fontSize: "4vh", backgroundColor: "#005438", borderRadius: "15px" }}
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
