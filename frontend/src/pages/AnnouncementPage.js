// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

// import CenterFlexBoxLarge from "../components/CenterFlexBoxLarge";
// import CenterFlexBoxMedium from "../components/CenterFlexBoxMedium";
// import {
// 	Typography,
// } from "@mui/material";

import React, {
	useEffect,
	useState
} from "react";
import appwriteApi from "../api/appwriteApi";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import {
	Button, Alert,
	Table, TableBody,
	TableCell, TableRow,
	TextField, Typography,
	// Accordion, AccordionDetails,
	// AccordionSummary,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AnnouncementEntry({ announcement }) {
	const created_at = new Date(announcement.created_at * 1000);
	const formated_created_at =
		created_at.getDate() + "/" +
		created_at.getMonth() + "/" +
		created_at.getFullYear() + " " +
		created_at.getHours() + ":" +
		created_at.getMinutes();

	return <div style={{ width: "100%" }}>
		<Box sx={{ display: "flex", p: 1, bgcolor: "blue" }}>
			<Container sx={{ flex: "850%" }}>
				<Typography variant="h5">{announcement.title}</Typography >
				<Typography><i>{formated_created_at}</i></Typography >
				<Typography>{announcement.content}</Typography >
			</Container>
			<Container sx={{ flex: "15%" }}>
				<Box>
					<Button
						// onClick={ }
						fullWidth
						variant="contained"
						sx={{ m: 1 }}>
						Edit
					</Button>
				</Box>
				<Box>
					<Button
						// onClick={}
						fullWidth
						variant="contained"
						sx={{ m: 1 }}>
						Delete
					</Button>
				</Box>
			</Container>
		</Box>
		{/* <Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header">
				<Typography>Edit admin team</Typography>
			</AccordionSummary>
			<AccordionDetails>
				Detail
			</AccordionDetails>
		</Accordion> */}
	</div>;
}

function AnnouncementContainer({ announcements }) {
	// Sort announcements by created_dat.
	// Copied from  https://stackoverflow.com/a/8837511
	announcements.sort(function (a, b) {
		var keyA = new Date(a.created_at),
			keyB = new Date(b.created_at);
		// Compare the 2 dates.
		if (keyA > keyB) return -1;
		if (keyA < keyB) return 1;
		return 0;
	});
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
export default function AnnouncementPage(user) {
	// This is to force reloading page after adding a new announcement
	const [addedAnnouncement, setAddedAnnouncement] = useState(0);
	const [announcementsFromServer, setAnnouncementsFromServer] = useState([]);
	const [
		announcementsFetchedFromServer, setAnnouncementsFetchedFromServer
	] = useState(false);
	const [errorMessageAddAnnouncement, setErrorMessageAddAnnouncement] = useState("");
	const [errorMessageGetAnnouncement, setErrorMessageGetAnnouncement] = useState("");
	const [userIsAdmin, setUserIsAdmin] = useState(false);

	console.log(user);
	const getAnnouncementsFromServer = () => {
		if (!announcementsFetchedFromServer) {
			appwriteApi.getAnnouncements()
				.then((result) => {
					setAnnouncementsFetchedFromServer(true);
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
			"content": content.value
		})
			.then(() => {
				setAddedAnnouncement(addedAnnouncement + 1);
				clearInputFields();
			})
			.catch((e) => {
				setErrorMessageAddAnnouncement("Error adding announcement to server");
				console.log(e);
			});
	};
	
	function AddAnnouncement() {
		const useStyles = makeStyles(() => ({
			input: {
				color: "#FFF",
			},
		}));
	
		const classes = useStyles();
	
		return <Box>
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
						color="warning"
						inputProps={{ className: classes.input }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						name="content"
						label="Content"
						id="contentInputText"
						inputProps={{ className: classes.input }}
					/>
				</Grid>
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
		</Box>;
	}

	return <Container component="main" maxWidth="md">
		{userIsAdmin
			?
			<>
				<AddAnnouncement/>
				{errorMessageAddAnnouncement !== "" && <Grid item xs={12}><Alert severity="error">{errorMessageAddAnnouncement}</Alert></Grid>}
				{errorMessageGetAnnouncement !== "" && <Grid item xs={12}><Alert severity="error">{errorMessageGetAnnouncement}</Alert></Grid>}
				{/* <Box>
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
								color="warning"
								inputProps={{ className: classes.input }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="content"
								label="Content"
								id="contentInputText"
								inputProps={{ className: classes.input }}
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
				</Box> */}
			</>
			:
			<></>}
		<Box>
			<Typography>Announcements</Typography>
			<AnnouncementContainer announcements={announcementsFromServer}></AnnouncementContainer>
		</Box>
	</Container >;
}