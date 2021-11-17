// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import CenterFlexBox from "../components/CenterFlexBox";
import {
	Accordion, AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import React from "react";
import EditAdminTeam from "../components/EditAdminTeam";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Page for use of admins to invite/remove other admins, post new announcements, schedule new drops and other admin tasks.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function AdminPage({ user }) {
	return <CenterFlexBox>
		<div style={{ width: "100%" }}>
			<Typography component="div" variant="h4" style={{ color: "white" }} gutterBottom>Admin Area</Typography>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
					<Typography>Edit admin team</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<EditAdminTeam user={user}/>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header">
					<Typography>Write new announcement</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						To be added.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3a-content"
					id="panel3a-header">
					<Typography>Schedule Drop</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						SOON.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>

	</CenterFlexBox>;

}