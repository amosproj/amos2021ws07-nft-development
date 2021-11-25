// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import CenterFlexBox from "../components/CenterFlexBox";
import {
	Accordion, AccordionDetails,
	AccordionSummary,
} from "@mui/material";
import React from "react";
import EditAdminTeam from "../components/EditAdminTeam";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ParagraphTypography from "../components/ParagraphTypography";
import HeaderTypography from "../components/HeaderTypography";

/**
 * Page for use of admins to invite/remove other admins, post new announcements, schedule new drops and other admin tasks.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function AdminPage({ user }) {
	return <CenterFlexBox>
		<div style={{ width: "100%" }}>
			<HeaderTypography component="div" variant="h4" gutterBottom>Admin Area</HeaderTypography>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
					<ParagraphTypography>Edit admin team</ParagraphTypography>
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
					<ParagraphTypography>Write new announcement</ParagraphTypography>
				</AccordionSummary>
				<AccordionDetails>
					<ParagraphTypography>
						To be added.
					</ParagraphTypography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3a-content"
					id="panel3a-header">
					<ParagraphTypography>Schedule Drop</ParagraphTypography>
				</AccordionSummary>
				<AccordionDetails>
					<ParagraphTypography>
						SOON.
					</ParagraphTypography>
				</AccordionDetails>
			</Accordion>
		</div>

	</CenterFlexBox>;

}