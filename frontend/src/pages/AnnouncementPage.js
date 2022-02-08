// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, {
	useEffect,
	useState,
	useRef,
} from "react";
import appwriteApi from "../api/appwriteApi";
import useChangeRoute from "../hooks/useChangeRoute";
import { Link as RouterLink, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";

import RoundedEdgesButton from "../components/RoundedEdgesButton";
import HeaderTypography from "../components/HeaderTypography";
import ParagraphTypography from "../components/ParagraphTypography";
import ButtonLinkTypography from "../components/ButtonLinkTypography";

import examplePhoto1 from "../assets/img/announcementPhotoExamples/anouncement_1.png";
import examplePhoto2 from "../assets/img/announcementPhotoExamples/anouncement_2.png";
import examplePhoto3 from "../assets/img/announcementPhotoExamples/anouncement_3.png";
import examplePhoto4 from "../assets/img/announcementPhotoExamples/anouncement_4.png";
import examplePhoto5 from "../assets/img/announcementPhotoExamples/anouncement_5.png";
const photos = [examplePhoto1, examplePhoto2, examplePhoto3, examplePhoto4, examplePhoto5];

import { Margin } from "../components/common";
import EditableImage from "../components/EditableImage";

import { useTeamMembership } from "../components/RestrictedArea";
import ConditionalAlert from "../components/ConditionalAlert";

// announcement might be undefined
const AnnouncementEditor = ({ announcement, ...inputFieldsProps }) => {
	const render = () => (<Grid container direction="row" columns={12} sx={{ marginTop: 3, marginBottom: 3 }}>
		<Grid item xs={3}>
			<AnnouncementImage from={announcement} canEditImage imageStyle={{ width: "90%", }} style={{ color: "black", opacity: 0.8, paddingLeft: "5%", }}/>
		</Grid>
		<Grid item xs={9} style={{ paddingLeft: "10px", }}>
			<InputFields {...inputFieldsProps} />
		</Grid>
	</Grid>);

	return render();
};

// if announcement is undefined, then it won't show an image
// if canEditImage, then it won't use a fallback image
const AnnouncementImage = ({ from: announcement, canEditImage=false, imageStyle, style, }) => {
	canEditImage = canEditImage && !!announcement;

	const imageIDString = announcement?.getImageIDString();
	const fallbackPhoto = !canEditImage && photos[announcement?.index % photos.length];
	const onUpdate = canEditImage && announcement.onUpdate.bind(announcement);
	const photoStyle = { width: "126px", height: "100px", borderRadius: "10px", backgroundColor: "inherit", ...imageStyle };

	return <EditableImage onUpdate={onUpdate} imageID={imageIDString} fallbackImage={fallbackPhoto} imageStyle={photoStyle} style={style} />;
};

function InputFields({ defaultTitle, defaultContent, titleComponentId, contentComponentId }) {
	// TODO: formated text support; https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries
	return <Grid>
		<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="title"
				label="Title"
				id={titleComponentId}
				defaultValue={defaultTitle}
				sx={{ marginTop: 1, marginBottom: 1 }}
			/>
		</Grid>
		<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="content"
				label="Content"
				id={contentComponentId}
				defaultValue={defaultContent}
				multiline
				minRows={1}
				maxRows={10}
				sx={{ marginTop: 1, marginBottom: 1 }}
			/>
		</Grid>
	</Grid>;
}

function AnnouncementEntry({
	announcement, editedId, setEditedId, userIsAdmin, setAnnouncementsAreUpToDate, isSidebar
}) {

	const handleEditButton = id => () => {
		setEditedId(id);
	};

	const changeRoute = useChangeRoute();

	const handleDeleteButton = announcement => async () => {
		// TODO: display confirmation message
		try {
			await appwriteApi.deleteAnnouncement(announcement.$id);
			setAnnouncementsAreUpToDate(false);
			await appwriteApi.removeImageFromDatabase(announcement.getImageIDString());
		} catch(e) {
			console.error(e);
		}
	};

	const handleCancelButton = () => {
		setEditedId("");
		if (window.location.hash.split("#")[1]) {
			changeRoute("/announcements");
		}
	};

	const handleSubmitButton = (announcement, titleComponentId, contentComponentId) => () => {
		const title = document.getElementById(titleComponentId);
		const content = document.getElementById(contentComponentId);
		if (!(title.value.length != 0 && content.value.length != 0)) {
			console.error("missing input or content!");
			return;
		}
		// Note: js get Unix time in Milisecond. Backend uses Python which utilizes *second, 
		// so for consistency we store all time in seconds 
		appwriteApi.updateAnnouncement({
			"title": title.value,
			"content": content.value,
			"updated_at": new Date().valueOf() / 1000 | 0,
			...( announcement.imageID !== undefined ?
				{ "imageID": announcement.imageID }
				: {}
			)
		}, announcement.$id)
			.then(() => {
				setAnnouncementsAreUpToDate(false);
				if (window.location.hash.split("#")[1]) {
					changeRoute("/announcements");
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};

	/* Prepare datetime */
	const created_at = new Date(announcement.created_at * 1000);
	const formated_created_at = created_at.toString().substring(4, 16);

	const limitLines = isSidebar ? {
		display: "-webkit-box",
		overflow: "hidden",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 2,
	} : {};

	const boxPageStyle = { display: "flex", marginTop: 1, marginBottom: 3, padding: 1, border: 1, borderColor: "rgba(255, 255, 255, 0.1)" };
	const titleStyle = { fontSize: "14px", fontStyle: "normal", fontWeight: "bold" };
	const dateStyle = {
		fontSize: "11px", fontStyle: "normal",
		fontWeight: "medium", opacity: 0.4
	};
	const contentStyle = {
		fontSize: "12px",
		fontStyle: "normal", fontWeight: "medium",
		color: "rgba(255, 255, 255, 0.81)"
	};
	const linkStyle = {
		fontFamily: "PT Sans", fontSize: "12px",
		fontStyle: "normal", fontWeight: "medium",
		color: "#ffffff", textDecoration: "underline",
	};

	const adminControls = userIsAdmin && <>
		|&nbsp;&nbsp;
		<Typography onClick={handleDeleteButton(announcement)} style={linkStyle}>
			Delete &#x2715;
		</Typography>
		&nbsp; | &nbsp;
		<RouterLink to={"/announcements#" + announcement.$id} style={linkStyle} >
			Edit &#9881;
		</RouterLink>
	</>;

	const ImageLink = ({ children }) => {
		return (!isSidebar) ? children
			: <Link href="/announcements" to={`/announcements#${announcement.$id}`} style={{}}>{children}</Link>;
	};

	const Wrapper = ({ children }) => (<div id={"c" + announcement.$id} key={announcement.$id}>
		{children}
	</div>);

	const Announcement = () => (
		<Grid container spacing={0} sx={isSidebar ? { maxWidth: "sm", } : { padding: 2, } } columns={24}>
			<Grid item xs={isSidebar ? 9 : undefined}>
				<ImageLink>
					<AnnouncementImage from={announcement} imageStyle={!isSidebar ? { width: "200px", height: "165px", } : {}}/>
				</ImageLink>
			</Grid>
			<Grid item xs sx={isSidebar? { minHeight: "100px", } : { width: "100%", } } style={{ marginLeft: "8px", }}>
				<HeaderTypography style={titleStyle} sx={limitLines} variant="h5">
					{announcement.title}
				</HeaderTypography>
		
				<Box style={{ display: "flex", flexDirection: "row", marginBottom: 1, marginTop: 5 }}>
					<ParagraphTypography style={dateStyle} sx={{ marginBottom: 1 }}>
						{formated_created_at}
					</ParagraphTypography>
					{ isSidebar && <>
						&nbsp;&nbsp;&nbsp;&nbsp;{adminControls}
					</>}
				</Box>

				<ParagraphTypography style={contentStyle} sx={limitLines}>
					{announcement.content}
				</ParagraphTypography>
		
				{ isSidebar &&
					<ButtonLinkTypography component={RouterLink} to={`/announcements#${announcement.$id}`} style={linkStyle}>
						Read more
					</ButtonLinkTypography>
				}
			</Grid>
			<Grid item xs={24}>
				{ !isSidebar && userIsAdmin &&
					<div style={{ textAlign: "center", marginTop: 4 }}>
						<Button onClick={handleDeleteButton(announcement)} variant="outlined" sx={{ margin: 1 }}>
							Delete
						</Button>
						<Button onClick={handleEditButton(announcement.$id)} variant="outlined" sx={{ margin: 1 }}>
							Edit
						</Button>
					</div>
				}
			</Grid>
		</Grid>
	);


	const sidebarComponents = <Wrapper>
		<div style={{ marginBottom: "2px" }}>
			<Box>
				<Announcement />
				<Margin height="10px" borderSpace={2} />
			</Box>
		</div>
	</Wrapper>;
	
	if (isSidebar)
		return sidebarComponents;

	const pageComponents = <Wrapper>
		<div style={{ width: "100%" }}>
			<Box xs={12} sx={boxPageStyle}>
				<Announcement />
			</Box>
			{/* Add edit Collapse component for each Announcement entry if user is admin */}
			{ userIsAdmin &&
				<Collapse in={editedId == announcement.$id ? true : false}>
					<Box sx={{ margin: 2, padding: 2, backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
						<AnnouncementEditor
							announcement={announcement}
							defaultTitle={announcement.title}
							defaultContent={announcement.content}
							titleComponentId={"edit_title_" + announcement.$id}
							contentComponentId={"edit_content_" + announcement.$id}
						/>
						<div style={{ textAlign: "center" }}>
							<Button
								onClick={handleSubmitButton(
									announcement,
									"edit_title_" + announcement.$id,
									"edit_content_" + announcement.$id
								)}
								variant="contained" sx={{ ma: 2 }}
							>
								Submit
							</Button>
							<Button onClick={handleCancelButton} variant="contained" sx={{ margin: 2 }}>
								Cancel
							</Button>
						</div>
					</Box>
				</Collapse>
			}
		</div>
	</Wrapper>;

	return pageComponents;
}

const sortAnnouncements = (announcements) => {
	// Sort announcements by created_at (most recent displayed first).
	// Copied from https://stackoverflow.com/a/8837511
	announcements.sort(function (a, b) {
		let dateA = new Date(a.created_at),
			dateB = new Date(b.created_at);
		if (dateA > dateB) return -1;
		if (dateA < dateB) return 1;
		return 0;
	});
};

function AnnouncementContainer({
	announcements, editedId, setEditedId, userIsAdmin, setAnnouncementsAreUpToDate, isSidebar
}) {
	return <div>
		{announcements.map((announcement) => (
			<div id={"c" + announcement.$id} key={announcement.$id}>
				<AnnouncementEntry
					announcement={announcement}
					editedId={editedId}
					setEditedId={setEditedId}
					userIsAdmin={userIsAdmin}
					setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
					isSidebar={isSidebar}
				/>
			</div>
		))}
	</div>;
}

/**
 * Component to view announcements.
 * For admin: add and edit announcements.
 * @param user user object of the currently logged in user/admin
 * @param isSidebar true if this component is used in sidebar. Less feature will be rendered.
 * @returns {JSX.Element}
 */
export default function AnnouncementPage({ user, isSidebar }) {

	// This is to force reloading page after adding a new announcement
	const [announcementsFromServer, setAnnouncementsFromServer] = useState([]);
	const [announcementsAreUpToDate, setAnnouncementsAreUpToDate] = useState(false);
	const [errorMessageAddAnnouncement, setErrorMessageAddAnnouncement] = useState("");
	const [errorMessageGetAnnouncement, setErrorMessageGetAnnouncement] = useState("");

	const newImageID = useRef(undefined);
	const [userIsAdmin] = useTeamMembership(user);

	// In React, impure functions/methods can only be executed with useEffect or event handlers
	class AnnouncementType {
		constructor(announcementData, index) {
			Object.assign(this, announcementData);
			this.index = index;
		}

		getImageIDString() {
			return this.imageID;
		}

		updateAnnouncement(updatedProperties) {
			if (!updatedProperties) return;

			let newAnnouncement = Object.assign(this, updatedProperties);
			setAnnouncementsFromServer(announcements => {
				console.debug("updateAnnouncement index", this.index, "properties", updatedProperties);
				announcements[this.index] = newAnnouncement;
				return announcements;
			});
		}

		onUpdate(newImageDocument) {
			console.debug("onUpdate", newImageDocument);
			this.updateAnnouncement({ imageID: newImageDocument.fileID, });
		}
	}


	const getAnnouncementsFromServer = () => {
		if (announcementsAreUpToDate) return;
		appwriteApi.getAnnouncements()
			.then((result) => {
				let announcements = result.documents.map((document, index) => new AnnouncementType(document, index));
				sortAnnouncements(announcements);
				
				setAnnouncementsFromServer(announcements);
				setAnnouncementsAreUpToDate(true);
			})
			.catch((e) => {
				setErrorMessageGetAnnouncement("Error getting announcement from server:");
				console.error(e);
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

	const [lastEditedTitle, setLastEditedTitle] = useState(undefined);
	const [lastEditedContent, setLastEditedContent] = useState(undefined);

	const handleSubmitButton = async () => {
		const title = document.getElementById("titleInputText");
		const content = document.getElementById("contentInputText");
		if (title.value.length == 0 || content.value.length == 0) {
			console.error("missing input or content!");
			return;
		}
		const now = new Date().valueOf() / 1000 | 0;
		appwriteApi.createAnnouncement({
			"title": title.value,
			"content": content.value,
			"created_at": now,
			"updated_at": now,
			"creator": (await appwriteApi.getAccount()).$id,
			"imageID": newImageID.current,
		})
			.then(() => {
				setAnnouncementsAreUpToDate(false);
				clearInputFields();
				newImageID.current = undefined;
				setLastEditedTitle(undefined);
				setLastEditedContent(undefined);
			})
			.catch((e) => {
				setErrorMessageAddAnnouncement("Error adding announcement to server");
				console.error(e);
				setLastEditedTitle(title.value);
				setLastEditedContent(content.value);
			});
	};

	const [editedId, setEditedId] = useState("");

	function startup() {
		if (isSidebar && useLocation().pathname === "/announcements") {
			isSidebar = false;
		}
		const locationHash = window.location.hash.split("#");
		if (locationHash[1] && editedId === "") {
			setEditedId(locationHash[1]);
		}
	}
	startup();

	function NewAnnouncement() {
		const emptyAnnouncement = {
			onUpdate: (newImageDocument) => {
				newImageID.current = newImageDocument.fileID;
			},
			getImageIDString: () => newImageID.current,
		};

		return <Box sx={{ margin: 0, padding: 2 }}>
			<HeaderTypography variant="h4" sx={{ margin: 2 }}>
				Add a new announcement
			</HeaderTypography>
			<Box sx={{ margin: 2, padding: 2, backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
				<AnnouncementEditor
					announcement={emptyAnnouncement}
					titleComponentId="titleInputText"
					contentComponentId="contentInputText"
					defaultTitle={lastEditedTitle}
					defaultContent={lastEditedContent}
				/>
				<div style={{ textAlign: "center" }}>
					<Button onClick={handleClearButton} variant="contained" sx={{ margin: 2 }}>
						Clear
					</Button>
					<Button onClick={handleSubmitButton} variant="contained" sx={{ margin: 2 }}>
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
		{ !isSidebar && userIsAdmin && <>
			<NewAnnouncement />
			<ConditionalAlert severity="error" text={errorMessageAddAnnouncement}/>
			<ConditionalAlert severity="error" text={errorMessageGetAnnouncement}/>
		</>}
		<Box sx={{ marginLeft: 4, padding: 0 }}>
			{ isSidebar?
				<RoundedEdgesButton color="inherit" component={RouterLink} to="/announcements" style={{ padding: "0px", marginBottom: 22 }}>
					<HeaderTypography style={{ fontSize: 20, fontWeight: "bold" }}>
						Announcements
					</HeaderTypography>
				</RoundedEdgesButton>
				:
				<HeaderTypography style={{ marginTop: 2, marginBottom: 2 }} variant="h4">
					Announcements
				</HeaderTypography>
			}
			<AnnouncementContainer
				announcements={announcementsFromServer}
				editedId={editedId}
				setEditedId={setEditedId}
				userIsAdmin={userIsAdmin}
				setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
				isSidebar={isSidebar}
			/>
		</Box>
	</div>;
}