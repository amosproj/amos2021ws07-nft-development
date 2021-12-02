// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

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
import JoinTeamPage from "./pages/JoinTeamPage";
import RequestPasswordResetPage from "./pages/RequestPasswordResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import appwriteApi from "./api/appwriteApi";
import AdminPage from "./pages/AdminPage";
import UserArea from "./areas/UserArea";
import AdminArea from "./areas/AdminArea";
import Footer from "./components/Footer";
import Grid from "@mui/material/Grid";
import HeaderTypography from "./components/HeaderTypography";
import FaqPage from "./pages/FaqPage";
import { backgroundColor, textColor } from "./assets/jss/colorPalette";
import ContractInteractionPage from "./pages/ContractInteractionPage";
import RoundedEdgesButton from "./components/RoundedEdgesButton";

/**
 * Main component of the frontend, mostly defining routes and the content to be display in specific routes.
 * @returns {JSX.Element}
 */
function App() {
	const [user, setUser] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		appwriteApi.getAccount()
			.then((r) => {
				setIsLoaded(true);
				setUser(r);
			})
			.catch(() => {
				setIsLoaded(true);
			});
	}, []);

	return (<div style={{ backgroundColor: backgroundColor, minHeight: "100vh", color: textColor }}>
		<Router>
			<Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
				<Grid item xs={12} sm={12} md={11} lg={10} xl={9} style={{ marginLeft: "12px", marginRight: "12px" }}>
					<Footer>
						<Header user={user}>
							{
								isLoaded &&
								<>
									<Route exact path="/">
										<CenterFlexBox>
											<HeaderTypography component="h1" variant="h5">
												Coming soon!
											</HeaderTypography>
											<img src={logo} className="App-logo" alt="logo" />
											<HeaderTypography component="h1" variant="h5">
												NFT the world!
											</HeaderTypography>
											<Button
												sx={{ mt: 2 }}
												style={{ width: "min(50vw,500px)", minHeight: "min(30vh,150px)", fontSize: "4vh", backgroundColor: "#005438", borderRadius: "15px" }}
												component={Link}
												to="/drop"
											>
												JOIN THE DROP!
											</Button>
											<RoundedEdgesButton
												sx={{ mt: 2 }}
												style={{ backgroundColor: "#005438" }}
												component={Link}
												to="/contractInteraction"
											>
												Contract interaction page!
											</RoundedEdgesButton>
										</CenterFlexBox>
									</Route>
									<Route path="/faq">
										<FaqPage/>
									</Route>
									<Route path="/termsOfUse">
										<CenterFlexBox>
											Terms of use. To be added!
										</CenterFlexBox>
									</Route>
									<Route path="/support">
										<CenterFlexBox>
											Support. To be added!
										</CenterFlexBox>
									</Route>
									<Route path="/privacy">
										<CenterFlexBox>
											Privacy. To be added!
										</CenterFlexBox>
									</Route>
									<Route path="/drop">
										<CenterFlexBox>
											Drop. To be added!
										</CenterFlexBox>
									</Route>
									<Route exact path="/login">
										<Login setUser={setUser} user={user} />
									</Route>
									<Route exact path="/signup">
										<SignUp setUser={setUser} user={user} />
									</Route>
									<Route exact path="/requestPasswordReset">
										<RequestPasswordResetPage setUser={setUser} user={user} />
									</Route>
									<Route exact path="/resetPassword">
										<ResetPasswordPage setUser={setUser} user={user} />
									</Route>
									<Route path="/user">
										<UserArea user={user}>
											<Route exact path="/user/changePassword">
												<ChangePasswordPage setUser={setUser} user={user} />
											</Route>
											<Route exact path="/user/profile">
												<Profile setUser={setUser} user={user} />
											</Route>
											<Route exact path="/user/admin">
												<AdminArea user={user}>
													<AdminPage setUser={setUser} user={user} />
												</AdminArea>
											</Route>
										</UserArea>
									</Route>
									<Route exact path="/confirmEmail">
										<EmailConfirmPage setUser={setUser} user={user} />
									</Route>
									<Route exact path="/joinTeam">
										<JoinTeamPage setUser={setUser} user={user} />
									</Route>
									<Route exact path="/contractInteraction">
										<ContractInteractionPage setUser={setUser} user={user} />
									</Route>
								</>
							}
						</Header>
					</Footer>
				</Grid>
			</Grid>
		</Router>
	</div>
	);
}

export default App;
