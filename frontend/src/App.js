// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import logo from "./nft-logo.png";
import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Button } from "@material-ui/core";

function App() {
	return (<header className="App-header">
		<Router>
			<Route exact path="/">
				<p>
						Coming soon! :)
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
			</Route>
			<Route path="/drop">
				SOON!
			</Route>
		</Router>
	</header>
	);
}

export default App;
