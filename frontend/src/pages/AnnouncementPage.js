// SPDX-License-Identifier: MIT

import CenterFlexBoxLarge from "../components/CenterFlexBoxLarge";
import {
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, {
	useEffect,
	useState
} from "react";
import appwriteApi from "../api/appwriteApi";
import { Alert } from "@mui/material";

function AnnouncementEntry({ announcement }) {
	return <div sx={{
		// marginTop: 8,
		// display: "flex",
		flexDirection: "column",
		// alignItems: "center",
		borderColor: "white",
		borderWidth: 10,
	}}>
		<Typography>{ announcement.title }</Typography>
		<Typography>{ announcement.content }</Typography>
		<Typography>{ announcement.created_at }</Typography>
		<Typography>{ announcement.updated_at }</Typography>
	</div>;
}

function AnnouncementContainer({ announcements }) {
	console.log({ AnnouncementContainer: announcements });
	return <div>
		{announcements.map((announcement) => {
			return <AnnouncementEntry key={announcement.$id} announcement={announcement} />;
		})}
	</div>;
}

/**
 * Page to view announcements.
 * For admin: add and edit announcements.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function AnnouncementPage() {
	// This is to force reloading page after adding a new announcement
	const [addedAnnouncement, setAddedAnnouncement] = useState(0);
	const [announcementsFromServer, setAnnouncementsFromServer] = useState([]);
	const [announcementsFetchedFromServer, setannouncementsFetchedFromServer] = useState(false);
	const [errorMessageAddAnnouncement, setErrorMessageAddAnnouncement] = useState("");
	const [errorMessageGetAnnouncement, setErrorMessageGetAnnouncement] = useState("");

	const getAnnouncementsFromServer = () => {
		if (!announcementsFetchedFromServer) {
			appwriteApi.getAnnouncements()
				.then((result) => {
					setannouncementsFetchedFromServer(true);
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
		appwriteApi.createAnnouncement([
			{
				"title": title.value,
				"content": content.value
			}
		])
			.then(() => {
				setAddedAnnouncement(addedAnnouncement + 1);
				clearInputFields();
			})
			.catch((e) => {
				setErrorMessageAddAnnouncement("Error adding announcement to server");
				console.log(e);
			});
	};

	return <CenterFlexBoxLarge>
		<Box component="form" noValidate sx={{ mt: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography>Add new announcement</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						name="title"
						label="Title"
						id="titleInputText"
						// value="tttttt"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						name="content"
						label="Content"
						id="contentInputText"
						// value="cccccccc"
					// autoComplete="new-password"
					/>
				</Grid>
				{errorMessageAddAnnouncement !== "" && <Grid item xs={12}><Alert severity="error">{errorMessageAddAnnouncement}</Alert></Grid>}
				{errorMessageGetAnnouncement !== "" && <Grid item xs={12}><Alert severity="error">{errorMessageGetAnnouncement}</Alert></Grid>}
			</Grid>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell style={{ color: "white", borderBottom: "none" }}>
							<Button
								onClick={handleClearButton}
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Clear
							</Button>
						</TableCell>
						<TableCell style={{ color: "white", borderBottom: "none" }}>
							<Button
								// type="submit"
								onClick={handleSubmitButton}
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Submit
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
		<Box>
			<AnnouncementContainer announcements={announcementsFromServer}></AnnouncementContainer>
		</Box>
	</CenterFlexBoxLarge >;
}