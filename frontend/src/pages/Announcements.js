// SPDX-License-Identifier: MIT

import CenterFlexBoxLarge from "../components/CenterFlexBoxLarge";
import {
	// Accordion, AccordionDetails,
	// AccordionSummary,
	Typography,
} from "@mui/material";
// import EditAdminTeam from "../components/EditAdminTeam";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	// TableContainer,
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
/**
 * Page for use of admins to invite/remove other admins, post new announcements, schedule new drops and other admin tasks.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function AnnouncementsPage({ user }) {
	const [addedAnnouncement, setAddedAnnouncement] = useState(0);
	const [announcementsFromServer, setannouncementsFromServer] = useState([]);
	const [errorMessageAddAnnouncement, setErrorMessageAddAnnouncement] = useState("");
	const [errorMessageGetAnnouncement, setErrorMessageGetAnnouncement] = useState("");

	// console.log(user);
	// console.log(addedAnnouncement);
	const getAnnouncementsFromServer = () => {
		appwriteApi.getAnnouncements()
			.then((announcements) => {
				console.log({ announcements: announcements });
				// setannouncementsFromServer(announcements);
				// setErrorMessageGetAnnouncement("");
			})
			.catch((e) => {
				// setErrorMessageGetAnnouncement("Error getting announcement from server:");
				console.log(e);
			});
	};

	useEffect(() => {
		// console.log({ appwriteApi: appwriteApi });
		appwriteApi.getAnnouncements()
			.then((announcements) => {
				console.log({ announcements: announcements });
				// setannouncementsFromServer(announcements);
				// setErrorMessageGetAnnouncement("");
			})
			.catch((e) => {
				// setErrorMessageGetAnnouncement("Error getting announcement from server:");
				console.log(e);
			});
	});

	// const anns = {
	// 	"sum": 8,
	// 	"documents": [
	// 		{
	// 			"$id": "61955db3d4fb4",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637100804,
	// 			"updated_at": 1637100804,
	// 			"title": "Message _8_04",
	// 			"content": "Content for Message _8_04"
	// 		},
	// 		{
	// 			"$id": "61955db3d75c0",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637100704,
	// 			"updated_at": 1637178843.5115,
	// 			"title": "Message 7",
	// 			"content": "Message 7 UPDATED, from HTTP request"
	// 		},
	// 		{
	// 			"$id": "61955db3db207",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637100504,
	// 			"updated_at": 1637100504,
	// 			"title": "Message _5_04",
	// 			"content": "Content for Message _5_04"
	// 		},
	// 		{
	// 			"$id": "61955db3dec75",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637100404,
	// 			"updated_at": 1637100404,
	// 			"title": "Message _4_04",
	// 			"content": "Content for Message _4_04"
	// 		},
	// 		{
	// 			"$id": "61955db3e1581",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637100304,
	// 			"updated_at": 1637178843.4952,
	// 			"title": "Message 3",
	// 			"content": "Message 3 UPDATED, from HTTP request"
	// 		},
	// 		{
	// 			"$id": "61955db3e3bfc",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637100204,
	// 			"updated_at": 1637100204,
	// 			"title": "Message _2_04",
	// 			"content": "Content for Message _2_04"
	// 		},
	// 		{
	// 			"$id": "61955dc956f66",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637178825.3524,
	// 			"updated_at": 1637178825.3524,
	// 			"title": "Message 7",
	// 			"content": "Message 7 added from HTTP request"
	// 		},
	// 		{
	// 			"$id": "61955dc9592fb",
	// 			"$collection": "61955db3cf3c7",
	// 			"$permissions": {
	// 				"read": [],
	// 				"write": []
	// 			},
	// 			"created_at": 1637178825.3621,
	// 			"updated_at": 1637178825.3621,
	// 			"title": "Message 8",
	// 			"content": "Message 8 added from HTTP request"
	// 		}
	// 	]
	// };

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
				// setErrorMessageAddAnnouncement("");
				clearInputFields();
			})
			.catch((e) => {
				setErrorMessageAddAnnouncement("Error adding announcement to server");
				console.log(e);
			});
	};


	// console.log(anns);

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
						value="tttttt"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						name="content"
						label="Content"
						id="contentInputText"
						value="cccccccc"
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
	</CenterFlexBoxLarge >;
}