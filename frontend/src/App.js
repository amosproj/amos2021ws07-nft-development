// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React, { useEffect, useRef, useState } from "react";
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
import AdminPage from "./pages/AdminPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import FaqPage from "./pages/FaqPage";
import ContractInteractionPage from "./pages/ContractInteractionPage";
import LandingPage from "./pages/LandingPage";
import NftDropPage from "./pages/NftDropPage";
import NftCollection from "./pages/NFTCollection";
import NFTInfoPage from "./pages/NFTInfoPage";
import { LoggedInArea as UserArea, AdminArea, PartnerArea } from "./components/RestrictedArea";
import Grid from "@mui/material/Grid";
import { backgroundColor, textColor } from "./assets/jss/colorPalette";
import { useContainerDimensions } from "./hooks/useContainerDimensions";
import CreateDropPage from "./pages/CreateDropPage";

/**
 * Main component of the frontend, mostly defining routes and the content to be display in specific routes.
 * @returns {JSX.Element}
 */
function App() {
	const [user, setUser] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const componentRef = useRef();
	const { width } = useContainerDimensions(componentRef);

	let mainContainerWidth = `${Math.min(width, 1168)}px`;

	const initializeUserStatus = async () => {
		try {
			// if we want to get rid of 401 http error, we can check appwrite.sdk.account.getSessions().length first
			setUser(await appwriteApi.getAccount());
		} catch(e) {
			return;
		} finally {
			setIsLoaded(true);
		}
	};
	useEffect(() => initializeUserStatus(), []);

	return (<div style={{ backgroundColor: backgroundColor, minHeight: "100vh", color: textColor }} ref={componentRef}>
		<Router>
			<Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
				<Grid item style={{ marginLeft: "12px", marginRight: "12px", width: `calc(${mainContainerWidth} - 8px)`, paddingLeft: "4px", paddingRight: "4px" }}>
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
									<Route path="/info">
										<NFTInfoPage setUser={setUser} user={user} />
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
										<UserArea user={user} enableAccessErrorMessage>
											<Route exact path="/user/myCollection">
												<NftCollection setUser={setUser} user={user} />
											</Route>
											<Route exact path="/user/profile">
												<Profile setUser={setUser} user={user} />
											</Route>
											<Route exact path="/user/admin">
												<AdminArea user={user} enableAccessErrorMessage>
													<AdminPage setUser={setUser} user={user} />
												</AdminArea>
											</Route>
										</UserArea>
									</Route>
									<Route exact path="/createNewDrop">
										<PartnerArea user={user}>
											<CreateDropPage setUser={setUser} user={user} />
										</PartnerArea>
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
