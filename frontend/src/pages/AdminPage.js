// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import CenterFlexBox from "../components/CenterFlexBox";
import {
	Accordion, AccordionDetails,
	AccordionSummary,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditAdminTeam from "../components/EditAdminTeam";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ParagraphTypography from "../components/ParagraphTypography";
import HeaderTypography from "../components/HeaderTypography";
import RoundedEdgesButton from "../components/RoundedEdgesButton";
import { Link } from "react-router-dom";
import EditPartnersTeam from "../components/EditPartnersTeam";
import appwriteApi from "../api/appwriteApi";
import { partnerTeamName } from "../utils/config";

/**
 * Page for use of admins to invite/remove other admins, post new announcements, schedule new drops and other admin tasks.
 * @param user user object of the currently logged in user/admin
 * @returns {JSX.Element}
 */
export default function AdminPage({ user }) {
	const [userIsInPartnerTeam, setUserIsInPartnerTeam] = useState(false);

	useEffect(() => {
		appwriteApi.userIsMemberOfTeam(partnerTeamName).then((isInPartnerTeam) => setUserIsInPartnerTeam(isInPartnerTeam));
	}, []);

	return <CenterFlexBox>
		<div style={{ width: "100%" }}>
			<HeaderTypography component="div" variant="h4" gutterBottom>Admin Area</HeaderTypography>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<ParagraphTypography>Edit Admins team</ParagraphTypography>
				</AccordionSummary>
				<AccordionDetails>
					<EditAdminTeam user={user}/>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<ParagraphTypography>Edit Partners team</ParagraphTypography>
				</AccordionSummary>
				<AccordionDetails>
					{ userIsInPartnerTeam?
						<EditPartnersTeam user={user}/>
						:
						<ParagraphTypography>
							You are not in the Partner team and thus cannot add anybody to the Partner team. If you think this is a mistake, please message another Admin.
						</ParagraphTypography>
					}
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<ParagraphTypography>Write new announcement</ParagraphTypography>
				</AccordionSummary>
				<AccordionDetails>
					<RoundedEdgesButton component={Link} to="/announcements" style={{ backgroundColor: "transparent", width: "300px", height: "54px", fontSize: "17px", border: "1px solid #000000", color: "#000000" }}>
						Create and edit announcements
					</RoundedEdgesButton>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3a-content"
					id="panel3a-header"
				>
					<ParagraphTypography>Create/schedule new drop</ParagraphTypography>
				</AccordionSummary>
				<AccordionDetails>
					{ userIsInPartnerTeam?
						<RoundedEdgesButton component={Link} to="/createNewDrop" style={{ backgroundColor: "transparent", width: "192px", height: "54px", fontSize: "17px", border: "1px solid #000000", color: "#000000" }}>
							Create new drop
						</RoundedEdgesButton>
						:
						<ParagraphTypography>
							You are not in the Partner team and thus cannot create a new drop. If you think this is a mistake, please message an Admin.
						</ParagraphTypography>
					}
				</AccordionDetails>
			</Accordion>
		</div>

	</CenterFlexBox>;

}