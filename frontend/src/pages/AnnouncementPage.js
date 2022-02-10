// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, {
	useEffect,
	useState
} from "react";
import appwriteApi from "../api/appwriteApi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import ConditionalAlert from "../components/ConditionalAlert";
import { useTeamMembership } from "../components/RestrictedArea";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import HeaderTypography from "../components/HeaderTypography";
import { whiteBoxBorderColor } from "../assets/jss/colorPalette";
import { headerFont } from "../assets/jss/fontPalette";
import InputFields from "../components/InputFields";
import AnnouncementContainer from "../components/AnnouncementContainer";

/**
 * Component to view announcements.
 * For admin: add and edit announcements.
 * @param user user object of the currently logged in user/admin
 * @param isSidebar true if this component is used in sidebar. Less feature will be rendered.
 * @returns {JSX.Element}
 */
export default function AnnouncementPage(user, isSidebar) {
	// This is to force reloading page after adding a new announcement
	const [announcementsFromServer, setAnnouncementsFromServer] = useState([]);
	const [announcementsAreUpToDate, setAnnouncementsAreUpToDate] = useState(false);
	const [errorMessageAddAnnouncement, setErrorMessageAddAnnouncement] = useState("");
	const [errorMessageGetAnnouncement, setErrorMessageGetAnnouncement] = useState("");
	const [userIsAdmin] = useTeamMembership(user);

	const [editing, setEditing] = useState("");

	const getAnnouncementsFromServer = () => {
		if (announcementsAreUpToDate) return;
		appwriteApi.getAnnouncements()
			.then((result) => {
				let documents = result.documents;
				// Sort announcements by created_at (most recent displayed first)
				// Copied from https://stackoverflow.com/a/8837511
				documents.sort(function (a, b) {
					let dateA = new Date(a.created_at),
						dateB = new Date(b.created_at);
					if (dateA > dateB) return -1;
					if (dateA < dateB) return 1;
					return 0;
				});
				setAnnouncementsFromServer(documents);
				setAnnouncementsAreUpToDate(true);
			})
			.catch((e) => {
				setErrorMessageGetAnnouncement("Error getting announcement from server:");
				console.log(e);
			});
	};
	useEffect(getAnnouncementsFromServer, [announcementsAreUpToDate]);

	const clearInputFields = () => {
		document.getElementById("titleInputText").value = "";
		document.getElementById("contentInputText").value = "";
	};

	const handleClearButton = () => {
		clearInputFields();
	};

	const handleSubmitButton = async () => {
		const title = document.getElementById("titleInputText");
		const content = document.getElementById("contentInputText");
		if (title.value.length == 0 || content.value.length == 0) {
			console.log("missing input or content!");
			return;
		}
		const now = new Date().valueOf() / 1000 | 0;
		appwriteApi.createAnnouncement({
			"title": title.value,
			"content": content.value,
			"created_at": now,
			"updated_at": now,
			"creator": (await appwriteApi.getAccount()).$id
		})
			.then(() => {
				setAnnouncementsAreUpToDate(false);
				clearInputFields();
			})
			.catch((e) => {
				setErrorMessageAddAnnouncement("Error adding announcement to server");
				console.log(e);
			});
	};

	function startup() {
		if (isSidebar && useLocation().pathname === "/announcements") {
			isSidebar = false;
		}
		const locationHash = window.location.hash.split("#");
		if (locationHash[1] && editing === "") {
			setEditing(locationHash[1]);
		}
	}
	startup();

	function AddAnnouncement() {
		return <Box sx={{ m: 0, p: 2 }}>
			<HeaderTypography variant="h4" sx={{ margin: 2 }}>Add a new announcement</HeaderTypography>
			<Box sx={{ m: 2, p: 2, backgroundColor: whiteBoxBorderColor, borderRadius: "15px" }}>
				<InputFields
					titleComponenId="titleInputText"
					contentComponenId="contentInputText"
				/>
				<div style={{ textAlign: "center" }}>
					<Button onClick={handleClearButton} variant="contained" sx={{ m: 2 }}>
						Clear
					</Button>
					<Button onClick={handleSubmitButton} variant="contained" sx={{ m: 2 }}>
						Submit
					</Button>
				</div>
			</Box>
		</Box>;
	}

	const fullWidth = isSidebar ? {} : {
		margin: "auto", width: "70%"
	};

	return <div component="main" style={fullWidth}>
		{!isSidebar && userIsAdmin && <>
			<AddAnnouncement />
			<ConditionalAlert severity="error" text={errorMessageAddAnnouncement} />
			<ConditionalAlert severity="error" text={errorMessageGetAnnouncement} />
		</>}
		<Box sx={{ ml: 4, p: 0 }}>
			{isSidebar
				?
				<RoundedEdgesButton color="inherit" component={RouterLink} to="/announcements" style={{ padding: "0px", marginBottom: 22 }}>
					<HeaderTypography style={{ fontFamily: headerFont, fontSize: 20, fontWeight: "bold" }}>
						Announcements
					</HeaderTypography>
				</RoundedEdgesButton>
				:
				<HeaderTypography sx={{ mt: 2, marginBottom: 2 }} variant="h4">
					Announcements
				</HeaderTypography>
			}
			<AnnouncementContainer
				announcements={announcementsFromServer}
				editing={editing}
				setEditing={setEditing}
				userIsAdmin={userIsAdmin}
				setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
				isSidebar={isSidebar}
			/>
		</Box>
	</div>;
}