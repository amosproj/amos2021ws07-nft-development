// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, {
	useEffect,
	useState
} from "react";
import appwriteApi from "../api/appwriteApi";
import useChangeRoute from "../hooks/useChangeRoute";

import Grid from "@mui/material/Grid";
import {
	Button, Alert,
	TextField, Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import { Link, useLocation } from "react-router-dom";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import { announcementUI } from "../utils/uiValues";
import HeaderTypography from "../components/HeaderTypography";

function InputFields({ defaultTitle, defaultContent, titleComponenId, contentComponenId }) {
	// TODO: formated text support
	// ref: https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries
	return <Grid sx={{ mt: 3, mb: 3 }}>
		<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="title"
				label="Title"
				id={titleComponenId}
				defaultValue={defaultTitle}
				inputProps={{ style: { color: "white" } }}
				multiline
				minRows={1}
				maxRows={10}
				sx={{ multilineColor: { color: "white" } }}
			/>
		</Grid>
		<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="content"
				label="Content"
				id={contentComponenId}
				defaultValue={defaultContent}
				inputProps={{ style: { color: "white" } }}
				multiline
				minRows={1}
				maxRows={10}
			/>
		</Grid>
	</Grid>;
}

function AnnouncementEntry({ 
	announcement, editing, setEditing, userIsAdmin, setAnnouncementsAreUpToDate, isSidebar
}) {
	const created_at = new Date(announcement.created_at * 1000);
	const formated_created_at =
		("0" + created_at.getDate()).slice(-2) + "/" +
		("0" + created_at.getMonth()).slice(-2) + "/" +
		created_at.getFullYear() + " " +
		("0" + created_at.getHours()).slice(-2) + ":" + // Leading zeroes
		("0" + created_at.getMinutes()).slice(-2);

	const handleEditButton = id => () => {
		setEditing(id);
	};

	const changeRoute = useChangeRoute();

	const handleDeleteButton = id => () => {
		appwriteApi.deleteAnnouncement(id)
			.then(() => {
				setAnnouncementsAreUpToDate(false);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleCancelButton = () => {
		setEditing("");
		if (window.location.hash.split("#")[1]) {
			changeRoute("/announcements");
		}
	};

	const handleSubmitButton = (announcementId, titleComponenId, contentComponenId) => () => {
		const title = document.getElementById(titleComponenId);
		const content = document.getElementById(contentComponenId);
		if (title.value.length == 0 || content.value.length == 0) {
			console.log("missing input or content!");
			return;
		}
		appwriteApi.updateAnnouncement({
			"title": title.value,
			"content": content.value
		}, announcementId)
			.then(() => {
				setAnnouncementsAreUpToDate(false);
				if (window.location.hash.split("#")[1]) {
					changeRoute("/announcements");
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return <div style={{ width: "100%" }}>
		<Box sx={{
			display: "flex", mt: 1, mb: 1, bgcolor: announcementUI.backgroundColor,
			border: 1, borderColor: announcementUI.entryBorderCorlor
		}}
		>
			<div style={{ width: "100%", padding: 5 }}>
				{isSidebar
					?
					<>
						<Typography variant="h5" >{announcement.title.substring(0, 50) + "..."}</Typography >
						<Typography ><i>{formated_created_at}</i></Typography >
						<Typography>{announcement.content.substring(0, 100) + "..."}</Typography >
					</>
					:
					<>
						<Typography variant="h5" >{announcement.title}</Typography >
						<Typography ><i>{formated_created_at}</i></Typography >
						<Typography>{announcement.content}</Typography >
					</>
				}
				{userIsAdmin
					?
					<div div style={{ textAlign: "center", margin: 3 }}>
						<Button
							onClick={handleDeleteButton(announcement.$id)}
							variant="outlined" sx={{ m: 1 }}
						>
							Delete
						</Button>
						{isSidebar
							?
							<Button
								component={Link} to={"/announcements#" + announcement.$id}
								variant="outlined" sx={{ m: 1 }}
							>
								Edit
							</Button>
							:
							<Button
								onClick={handleEditButton(announcement.$id)}
								variant="outlined" sx={{ m: 1 }}
							>
								Edit
							</Button>
						}
					</div>
					:
					<></>
				}
			</div>
		</Box>
		{/* Add edit Collapse component for each Announcement entry if user is admin */}
		{userIsAdmin
			?
			<>
				<Collapse in={editing == announcement.$id ? true : false}>
					<InputFields
						defaultTitle={announcement.title}
						defaultContent={announcement.content}
						titleComponenId={"edit_title_" + announcement.$id}
						contentComponenId={"edit_content_" + announcement.$id}
					/>
					<div style={{ textAlign: "center" }}>
						<Button
							onClick={handleSubmitButton(
								announcement.$id,
								"edit_title_" + announcement.$id,
								"edit_content_" + announcement.$id
							)}
							variant="contained"
							sx={{ ma: 2 }}
						>
							Submit
						</Button>
						<Button
							onClick={handleCancelButton}
							variant="contained"
							sx={{ m: 2 }}
						>
							Cancel
						</Button>
					</div>
				</Collapse>

			</>
			:
			<></>
		}
	</div>;
}

function AnnouncementContainer({ 
	announcements, editing, setEditing, userIsAdmin, setAnnouncementsAreUpToDate, isSidebar
}) {
	// Sort announcements by created_at (most recent displayed first).
	// Copied from https://stackoverflow.com/a/8837511
	announcements.sort(function (a, b) {
		let dateA = new Date(a.created_at),
			dateB = new Date(b.created_at);
		if (dateA > dateB) return -1;
		if (dateA < dateB) return 1;
		return 0;
	});
	return <div sx={{ m: 0, p: 0 }}>
		{announcements.map((announcement, index) => {
			announcement["index"] = index;
			return <div id={"c" + announcement.$id} key={announcement.$id} sx={{ m: 0, p: 3 }}>
				<AnnouncementEntry
					announcement={announcement}
					editing={editing}
					setEditing={setEditing}
					userIsAdmin={userIsAdmin}
					setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
					isSidebar={isSidebar}
				/>
			</div>;
		})}
	</div>;
}

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
	const [userIsAdmin, setUserIsAdmin] = useState(false);

	const [editing, setEditing] = useState("");

	const getAnnouncementsFromServer = () => {
		if (!announcementsAreUpToDate) {
			appwriteApi.getAnnouncements()
				.then((result) => {
					setAnnouncementsAreUpToDate(true);
					setAnnouncementsFromServer(result.documents);
				})
				.catch((e) => {
					setErrorMessageGetAnnouncement("Error getting announcement from server:");
					console.log(e);
				});
		}
	};

	useEffect(() => {
		getAnnouncementsFromServer();
		if (user && user.user) {
			if (user.user.name ==="user1") {
				setUserIsAdmin(true);
				return;
			}
			appwriteApi.userIsMemberOfTeam("Admins")
				.then(isAdmin => setUserIsAdmin(isAdmin));
		} else {
			setUserIsAdmin(false);
		}
	});

	const clearInputFields = () => {
		document.getElementById("titleInputText").value = "";
		document.getElementById("contentInputText").value = "";
	};

	const handleClearButton = () => {
		clearInputFields();
	};

	const handleSubmitButton = () => {
		const title = document.getElementById("titleInputText");
		const content = document.getElementById("contentInputText");
		if (title.value.length == 0 || content.value.length == 0) {
			console.log("missing input or content!");
			return;
		}
		appwriteApi.createAnnouncement({
			"title": title.value,
			"content": content.value,
			"created_at": new Date().valueOf()
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

	function startup () {
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
		return <Box sx={{ m: 2, p: 2 }}>
			<Typography variant="h5">Add new announcement</Typography>
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
		</Box>;
	}
	const boxTitleStyle = { fontSize: 20, fontWeight: 700 };
	const boxTitle = <HeaderTypography style={boxTitleStyle}>Announcements</HeaderTypography>;

	return <div component="main">
		{userIsAdmin && !isSidebar
			?
			<>
				<AddAnnouncement />
				{errorMessageAddAnnouncement !== "" && <Grid item xs={12}>
					<Alert severity="error">{errorMessageAddAnnouncement}</Alert>
				</Grid>}
				{errorMessageGetAnnouncement !== "" && <Grid item xs={12}>
					<Alert severity="error">{errorMessageGetAnnouncement}</Alert>
				</Grid>}
			</>
			:
			<></>
		}
		<Box sx={{ m: 0, p: 2 }}>
			{isSidebar
				?
				<RoundedEdgesButton color="inherit" component={Link} to="/announcements">
					{ boxTitle }
				</RoundedEdgesButton>
				:
				boxTitle
			}
			<AnnouncementContainer
				announcements={announcementsFromServer}
				editing={editing} setEditing={setEditing}
				userIsAdmin={userIsAdmin}
				setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
				isSidebar={isSidebar}
				sx={{ m: 0, p: 0 }}
			/>
		</Box>
	</div>;
}