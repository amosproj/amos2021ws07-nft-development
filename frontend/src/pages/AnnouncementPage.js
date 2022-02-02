// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React, {
	useEffect,
	useState
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

import { AdminArea } from "../components/RestrictedArea";
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
	useEffect(() => {
		console.debug(announcement);
		announcement?.initializeFallbackID();
	}, []);

	canEditImage = canEditImage && !!announcement;

	const imageIDString = announcement?.getImageIDString();
	const fallbackID = announcement?.fallbackID;
	const fallbackPhoto = !canEditImage && photos[fallbackID % photos.length];
	const nextUpload = canEditImage && (() => announcement.getUpdatedImageID());
	const photoStyle = { width: "126px", height: "100px", borderRadius: "10px", backgroundColor: "inherit", ...imageStyle };

	return <EditableImage nextUpload={nextUpload} imageID={imageIDString} fallbackImage={fallbackPhoto} imageStyle={photoStyle} style={style} />;
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
	announcement, editedId, setEditedId, user, setAnnouncementsAreUpToDate, isSidebar
}) {

	const handleEditButton = id => () => {
		setEditedId(id);
	};

	console.debug("AnnouncementEntry");
	const changeRoute = useChangeRoute();

	const handleDeleteButton = announcement => () => {
		// TODO: display confirmation message
		appwriteApi.deleteAnnouncement(announcement.$id)
			.then(() => {
				setAnnouncementsAreUpToDate(false);
				appwriteApi.removeImageFromDatabase(announcement.getImageIDString());
			})
			.catch((e) => {
				console.error(e);
			});
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
			"imageID": announcement.imageID,
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

	const AdminControls = () => <AdminArea user={user}>
		|&nbsp;&nbsp;
		<Typography onClick={handleDeleteButton(announcement)} style={linkStyle}>
			Delete &#x2715;
		</Typography>
		&nbsp; | &nbsp;
		<RouterLink to={"/announcements#" + announcement.$id} style={linkStyle} >
			Edit &#9881;
		</RouterLink>
	</AdminArea>;

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
						&nbsp;&nbsp;&nbsp;&nbsp;<AdminControls/>
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
				{ !isSidebar &&
					<AdminArea user={user}>
						<div style={{ textAlign: "center", marginTop: 4 }}>
							<Button onClick={handleDeleteButton(announcement)} variant="outlined" sx={{ margin: 1 }}>
								Delete
							</Button>
							<Button onClick={handleEditButton(announcement.$id)} variant="outlined" sx={{ margin: 1 }}>
								Edit
							</Button>
						</div>
					</AdminArea>
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
			<AdminArea user={user}>
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
			</AdminArea>
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
	announcements, editedId, setEditedId, user, setAnnouncementsAreUpToDate, isSidebar
}) {
	console.debug("AnnouncementContainer", announcements.length);
	return <div>
		{announcements.map((announcement) => (
			<div id={"c" + announcement.$id} key={announcement.$id}>
				<AnnouncementEntry
					announcement={announcement}
					editedId={editedId}
					setEditedId={setEditedId}
					user={user}
					setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
					isSidebar={isSidebar}
				/>
			</div>
		))}
	</div>;
}


const getMaxImageID = (announcementsFromServer) => {
	const notAvailable = -1;
	return announcementsFromServer.reduce(
		(result, announcement) => Math.max(result, announcement.imageID ?? notAvailable)
		, notAvailable
	);
};

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
	
	const [displayedAnnouncements, setDisplayedAnnouncements] = useState([]);
	const [nextImageID, setNextImageID] = useState(undefined);

	const displayNextAnnouncement = () => {
		const displayCount = displayedAnnouncements.length;
		// FIXME: only add new Announcement after the previous one was added and state updated
		// currently state update interferes with adding new announcements
		if (displayCount >= announcementsFromServer.length)
			return;

		const newAnnouncement = new AnnouncementType(announcementsFromServer[displayCount], displayCount);
		setDisplayedAnnouncements(announcements => [ ...announcements, newAnnouncement ]);
	};
	useEffect(displayNextAnnouncement, [announcementsFromServer, displayedAnnouncements]);

	// In React, impure functions can only be executed with useEffect or event handlers
	// which means any impure method can only be used in useEffect or handler code.
	class AnnouncementType {
		// Optional arguments, the constructor must not update any component state.
		// When constructed, it will freeze the value of all outside state variables used in the class.
		// Therefore, a new instance should only be constructed after a state update.
		constructor(announcementData, index) {
			Object.assign(this, announcementData);
			this.index = index;
		}

		getImageIDString(imageID = this.imageID) {
			return (imageID >= 0)? `ANX_${imageID}`
				: undefined;
		}

		updateAnnouncement(updatedProperties) {
			if (!updatedProperties) return;

			let newAnnouncement = Object.assign(this, updatedProperties);
			setDisplayedAnnouncements(announcements => {
				console.debug("updateAnnouncement index", this.index, "properties", updatedProperties);
				announcements[this.index] = newAnnouncement;
				return announcements;
			});
		}

		// computes the next imageID when a new image was uploaded in announcement editor
		getUpdatedImageID() {
			return this.getImageIDString() ?? (
				this.updateAnnouncement({ imageID: this.fallbackID, })
					|| this.getImageIDString(this.fallbackID)
			);
		}

		// The fallback ID is only needed in case no image is currently defined for the announcement.
		// This method must not be called for multiple announcements in the same function to allow
		// the update take effect before it can initialize the next fallback ID.
		initializeFallbackID() {
			if (this.imageID) return;
			
			console.debug("initialize fallback: imageID", this.imageID, this.$id, "nextImageID", nextImageID);
			setNextImageID(nextImageID + 1);
			const update = {
				fallbackID: nextImageID,
				initializeFallbackID: () => {},
			};
			this.updateAnnouncement(update);

			return nextImageID;
		}
	}

	const getAnnouncementsFromServer = () => {
		if (announcementsAreUpToDate) return;
		appwriteApi.getAnnouncements()
			.then((result) => {
				const announcements = result.documents;
				sortAnnouncements(announcements);

				const newImageID = getMaxImageID(announcements) + 1;
				setNextImageID(newImageID);
				setAnnouncementsFromServer(announcements);
				setDisplayedAnnouncements([]);
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
			"imageID": nextImageID,
		})
			.then(() => {
				setAnnouncementsAreUpToDate(false);
				clearInputFields();
				setNextImageID(nextImageID + 1);
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

	function FreshAnnouncement() {
		const emptyAnnouncement = {
			initializeFallbackID: () => {},
			getUpdatedImageID: () => `ANX_${nextImageID}`,
			getImageIDString: () => undefined,
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
		{ !isSidebar &&
			<AdminArea user={user}>
				{ (displayedAnnouncements.length === announcementsFromServer.length) &&
					<FreshAnnouncement />
				}
				<ConditionalAlert severity="error" text={errorMessageAddAnnouncement}/>
				<ConditionalAlert severity="error" text={errorMessageGetAnnouncement}/>
			</AdminArea>
		}
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
				announcements={displayedAnnouncements}
				editedId={editedId}
				setEditedId={setEditedId}
				user={user}
				setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
				isSidebar={isSidebar}
			/>
		</Box>
	</div>;
}