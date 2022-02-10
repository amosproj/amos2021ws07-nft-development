// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import appwriteApi from "../api/appwriteApi";
import useChangeRoute from "../hooks/useChangeRoute";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import HeaderTypography from "./HeaderTypography";
import ParagraphTypography from "./ParagraphTypography";
import {
	semiTransparentTextColor,
	textColor,
	whiteBoxBorderColor,
	whiteTransparentBorderColor
} from "../assets/jss/colorPalette";
import { headerFont, linkFont, textFont } from "../assets/jss/fontPalette";
import InputFields from "./InputFields";
// import { photos } from "./AnnouncementPage";
import examplePhoto1 from "../assets/img/announcementPhotoExamples/anouncement_1.png";
import examplePhoto2 from "../assets/img/announcementPhotoExamples/anouncement_2.png";
import examplePhoto3 from "../assets/img/announcementPhotoExamples/anouncement_3.png";
import examplePhoto4 from "../assets/img/announcementPhotoExamples/anouncement_4.png";
import examplePhoto5 from "../assets/img/announcementPhotoExamples/anouncement_5.png";

export const photos = [examplePhoto1, examplePhoto2, examplePhoto3, examplePhoto4, examplePhoto5];

/**
 * Input field using Grid and textfield. Supports auto expanding for long text.
 * @param announcement announcement object
 * @param editing current editing announcement's ID
 * @param setEditing state update function. Use to set ID of editing announcement
 * @param userIsAdmin state admin
 * @param setAnnouncementsAreUpToDate state update function. Use to indicate need to refresh
 * @param isSidebar boolean to specify if the entry is for sidebar usage
 * @returns {JSX.Element}
 */
export default function AnnouncementEntry({
	announcement, editing, setEditing, userIsAdmin, setAnnouncementsAreUpToDate, isSidebar
}) {

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
		// Note: js get Unix time in Milisecond. Backend uses Python which utilizes *second, 
		// so for consistency we store all time in seconds 
		appwriteApi.updateAnnouncement({
			"title": title.value,
			"content": content.value,
			"updated_at": new Date().valueOf() / 1000 | 0
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

	/* Prepare datetime */
	const created_at = new Date(announcement.created_at * 1000);
	const formated_created_at = created_at.toString().substring(4, 16);

	const limitLines = isSidebar ? {
		display: "-webkit-box",
		overflow: "hidden",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 2,
	} : {};

	const boxPageStyle = { display: "flex", mt: 1, marginBottom: 3, p: 1, border: 1, borderColor: whiteTransparentBorderColor };
	const titleStyle = { fontFamily: headerFont, fontSize: "14px", fontStyle: "normal", fontWeight: "bold" };
	const dateStyle = {
		fontFamily: textFont, fontSize: "11px", fontStyle: "normal",
		fontWeight: "medium", opacity: 0.4
	};
	const contentStyle = {
		fontFamily: textFont, fontSize: "12px",
		fontStyle: "normal", fontWeight: "medium",
		color: semiTransparentTextColor
	};
	const linkStyle = {
		fontFamily: linkFont, fontSize: "12px",
		fontStyle: "normal", fontWeight: "medium",
		color: textColor, textDecoration: "underline",
	};
	const announcePhoto = photos[parseInt(announcement.$id, 16) % photos.length];

	const adminControls = userIsAdmin && <>
		|&nbsp;&nbsp;
		<Typography onClick={handleDeleteButton(announcement.$id)} style={linkStyle}>
			Delete &#x2715;
		</Typography>
		&nbsp; | &nbsp;
		<RouterLink to={"/announcements#" + announcement.$id} style={linkStyle}>
			Edit &#9881;
		</RouterLink>
	</>;

	const sidebarComponents = <div style={{ marginBottom: "2px" }}>
		<Box>
			<Grid container spacing={0} sx={{ maxWidth: "sm" }}>
				<Grid item xs={9}>
					<Link href="/announcements" style={{}}>
						<div style={{ backgroundImage: `url(${announcePhoto})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "126px", height: "100px", borderRadius: "10px", }} />
					</Link>
				</Grid>
				<Grid
					item xs
					sx={{
						minHeight: "100px", marginLeft: "8px", paddingLeft: 0, paddingBottom: "10px", borderBottom: 1,
						borderColor: whiteTransparentBorderColor, marginBottom: 2,
					}}
				>
					<HeaderTypography style={titleStyle} sx={limitLines} variant="h5">
						{announcement.title}
					</HeaderTypography>
					<Box style={{ display: "flex", flexDirection: "row", marginBottom: 1, marginTop: 5 }}>
						<Typography style={dateStyle} sx={{ marginBottom: 1 }}>
							{formated_created_at}&nbsp;&nbsp;&nbsp;&nbsp;
						</Typography>
						{adminControls}
					</Box>
					<ParagraphTypography style={contentStyle} sx={limitLines}>
						{announcement.content}
					</ParagraphTypography>
					<Typography component={RouterLink} to={`/announcements#${announcement.$id}`} style={linkStyle}>Read more</Typography>
				</Grid>
			</Grid>
		</Box>
	</div>;

	if (isSidebar)
		return sidebarComponents;

	const pageComponents = <div style={{ width: "100%" }}>
		<Box xs={12} sx={boxPageStyle}>
			<div style={{ width: "100%", padding: 5 }}>
				<Typography style={titleStyle} sx={limitLines} variant="h5">
					{announcement.title}
				</Typography>
				<Typography style={dateStyle} sx={{ marginBottom: 1 }}>{formated_created_at}</Typography>
				<Typography style={contentStyle} sx={{ marginBottom: 1, ...limitLines }}>
					{announcement.content}
				</Typography>
				{userIsAdmin &&
					<div style={{ textAlign: "center", marginTop: 3 }}>
						<Button onClick={handleDeleteButton(announcement.$id)} variant="outlined" sx={{ m: 1 }}>
							Delete
						</Button>
						<Button onClick={handleEditButton(announcement.$id)} variant="outlined" sx={{ m: 1 }}>
							Edit
						</Button>
					</div>}
			</div>
		</Box>
		{/* Add edit Collapse component for each Announcement entry if user is admin */}
		{userIsAdmin &&
			<Collapse in={editing == announcement.$id ? true : false}>
				<Box sx={{ m: 2, p: 2, backgroundColor: whiteBoxBorderColor, borderRadius: "15px" }}>
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
							variant="contained" sx={{ ma: 2 }}
						>
							Submit
						</Button>
						<Button onClick={handleCancelButton} variant="contained" sx={{ m: 2 }}>
							Cancel
						</Button>
					</div>
				</Box>
			</Collapse>}
	</div>;

	return pageComponents;
}
