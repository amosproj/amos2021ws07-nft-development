// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, { useEffect, useState } from "react";
import appwriteApi from "./api/appwriteApi";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CenterFlexBox from "./components/CenterFlexBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EmailConfirmPage from "./pages/EmailConfirmPage";
import JoinTeamPage from "./pages/JoinTeamPage";
import RequestPasswordResetPage from "./pages/RequestPasswordResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AdminPage from "./pages/AdminPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import FaqPage from "./pages/FaqPage";
import ContractInteractionPage from "./pages/ContractInteractionPage";
import LandingPage from "./pages/LandingPage";
import UserArea from "./areas/UserArea";
import AdminArea from "./areas/AdminArea";
import Grid from "@mui/material/Grid";
import { backgroundColor, textColor } from "./assets/jss/colorPalette";
import NftDropPage from "./pages/NftDropPage";

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
										<LandingPage user={user}/>
									</Route>
									<Route path="/faq">
										<FaqPage user={user}/>
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
									<Route exact path="/announcements">
										<AnnouncementPage user={user} isSidebar={false}/>
									</Route>
									<Route exact path="/contractInteraction">
										<ContractInteractionPage setUser={setUser} user={user} />
									</Route>
									<Route exact path="/nftDropList">
										<NftDropPage setUser={setUser} user={user}/>
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
