// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, {
	useEffect,
	useState
} from "react";
import appwriteApi from "../api/appwriteApi";

import Grid from "@mui/material/Grid";
// import { makeStyles } from "@mui/styles";
import {
	Button, Alert,
	Table, TableBody,
	TableCell, TableRow,
	TextField, Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";

function InputFields({ defaultTitle, defaultContent, titleComponenId, contentComponenId }) {
	// TODO: formated text support
	// ref: https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries
	return <Grid>
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

function AnnouncementEntry({ announcement, editing, setEditing, userIsAdmin, setAnnouncementsAreUpToDate }) {
	const created_at = new Date(announcement.created_at * 1000);
	const formated_created_at =
		created_at.getDate() + "/" +
		created_at.getMonth() + "/" +
		created_at.getFullYear() + " " +
		("0" + created_at.getHours()).slice(-2) + ":" + // Leading zeroes
		("0" + created_at.getMinutes()).slice(-2);

	const handleEditButton = index => () => {
		// console.log("edit pressed for index " + index);
		setEditing(index);
	};

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
		setEditing(-1);
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
				// TODO: update edited announcement
			})
			.catch((e) => {
				console.log(e);
			});
		// TODO: update list after new announcement added
	};

	return <div style={{ width: "100%" }}>
		<Box sx={{ display: "flex", p: 1, bgcolor: "blue" }}>
			<Container sx={{ flex: "850%" }}>
				<Typography variant="h5">{announcement.title}</Typography >
				<Typography><i>{formated_created_at}</i></Typography >
				<Typography>{announcement.content}</Typography >
			</Container>
			{userIsAdmin
				?
				<>
					<Container sx={{ flex: "15%" }}>
						<Box>
							<Button
								announcementindex={announcement.index}
								onClick={handleDeleteButton(announcement.$id)}
								fullWidth
								variant="contained"
								sx={{ m: 1 }}
							>
								Delete
							</Button>
						</Box>
						<Box>
							<Button
								announcementindex={announcement.index}
								onClick={handleEditButton(announcement.index)}
								fullWidth
								variant="contained"
								sx={{ m: 1 }}
							>
								Edit
							</Button>
						</Box>
					</Container>

				</>
				:
				<></>
			}
		</Box>
		{userIsAdmin
			?
			<>
				<Collapse in={editing == announcement.index ? true : false}>
					<InputFields
						defaultTitle={announcement.title}
						defaultContent={announcement.content}
						titleComponenId={"edit_title_" + announcement.$id}
						contentComponenId={"edit_content_" + announcement.$id}
					/>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell style={{ color: "white", borderBottom: "none" }}>
									<Button
										onClick={handleSubmitButton(
											announcement.$id,
											"edit_title_" + announcement.$id,
											"edit_content_" + announcement.$id
										)}
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
									>
										Submit
									</Button>
								</TableCell>
								<TableCell style={{ color: "white", borderBottom: "none" }}>
									<Button
										onClick={handleCancelButton}
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
									>
										Cancel
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Collapse>

			</>
			:
			<></>
		}
	</div>;
}

function AnnouncementContainer({ announcements, editing, setEditing, userIsAdmin, setAnnouncementsAreUpToDate }) {
	// Sort announcements by created_dat.
	// Copied from https://stackoverflow.com/a/8837511
	announcements.sort(function (a, b) {
		var keyA = new Date(a.created_at),
			keyB = new Date(b.created_at);
		// Compare the 2 dates.
		if (keyA > keyB) return -1;
		if (keyA < keyB) return 1;
		return 0;
	});
	return <div>
		{announcements.map((announcement, index) => {
			announcement["index"] = index;
			return <AnnouncementEntry
				key={announcement.$id}
				announcement={announcement}
				editing={editing}
				setEditing={setEditing}
				userIsAdmin={userIsAdmin}
				setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate} 
			/>;
		})}
	</div>;
}

/**
 * Page to view announcements.
 * For admin: add and edit announcements.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function AnnouncementPage(user) {
	// This is to force reloading page after adding a new announcement
	const [announcementsFromServer, setAnnouncementsFromServer] = useState([]);
	const [announcementsAreUpToDate, setAnnouncementsAreUpToDate] = useState(false);
	const [errorMessageAddAnnouncement, setErrorMessageAddAnnouncement] = useState("");
	const [errorMessageGetAnnouncement, setErrorMessageGetAnnouncement] = useState("");
	const [userIsAdmin, setUserIsAdmin] = useState(false);

	const [editing, setEditing] = useState(-1);

	// console.log(user);
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
			// console.log(user.user);
			if (user.user.name === "user1") {
				setUserIsAdmin(true);
			}
			// appwriteApi.userIsMemberOfTeam("Admins")
			// 	.then(isAdmin => setUserIsAdmin(isAdmin));
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
		// TODO: update list after new announcement added
	};

	function AddAnnouncement() {
		return <Box>
			<Typography variant="h5">Add new announcement</Typography>
			<InputFields
				titleComponenId="titleInputText"
				contentComponenId="contentInputText"
			/>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell style={{ color: "white", borderBottom: "none" }}>
							<Button
								onClick={handleClearButton}
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Clear
							</Button>
						</TableCell>
						<TableCell style={{ color: "white", borderBottom: "none" }}>
							<Button
								onClick={handleSubmitButton}
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Submit
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>;
	}

	return <Container component="main" maxWidth="md">
		{userIsAdmin
			?
			<>
				<AddAnnouncement />
				{errorMessageAddAnnouncement !== "" && <Grid item xs={12}><Alert severity="error">{errorMessageAddAnnouncement}</Alert></Grid>}
				{errorMessageGetAnnouncement !== "" && <Grid item xs={12}><Alert severity="error">{errorMessageGetAnnouncement}</Alert></Grid>}
			</>
			:
			<></>
		}
		<Box>
			<Typography variant="h5">Announcements</Typography>
			<AnnouncementContainer
				announcements={announcementsFromServer}
				editing={editing} setEditing={setEditing}
				userIsAdmin={userIsAdmin}
				setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
			/>
		</Box>
	</Container>;
}