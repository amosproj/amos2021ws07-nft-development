// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import AnnouncementEntry from "./AnnouncementEntry";

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
export default function AnnouncementContainer({
	announcements, editing, setEditing, userIsAdmin, setAnnouncementsAreUpToDate, isSidebar
}) {
	return <div>
		{announcements.map((announcement, index) => {
			announcement["index"] = index;
			return <div id={"c" + announcement.$id} key={announcement.$id}>
				<AnnouncementEntry
					announcement={announcement}
					editing={editing}
					setEditing={setEditing}
					userIsAdmin={userIsAdmin}
					setAnnouncementsAreUpToDate={setAnnouncementsAreUpToDate}
					isSidebar={isSidebar}
				/>
			</div>;
		})}
	</div>;
}
