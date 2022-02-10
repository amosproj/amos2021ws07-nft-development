// SPDX-License-Identifier: MIT
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

/**
 * Input field using Grid and textfield. Supports auto expanding for long text.
 * @param defaultTitle title placeholder
 * @param defaultContent content placeholder
 * @param titleComponenId id for title TextField
 * @param contentComponenId id for content TextField
 * @returns {JSX.Element}
 */
export default function InputFields({ defaultTitle, defaultContent, titleComponenId, contentComponenId }) {
	// TODO: formated text support
	// ref: https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries
	return <Grid sx={{ mt: 3, marginBottom: 3 }}>
		<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="title"
				label="Title"
				id={titleComponenId}
				defaultValue={defaultTitle}
				multiline
				minRows={1}
				maxRows={10}
				sx={{ mt: 1, marginBottom: 1 }} 
			/>
		</Grid>
		<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="content"
				label="Content"
				id={contentComponenId}
				defaultValue={defaultContent}
				multiline
				minRows={1}
				maxRows={10}
				sx={{ mt: 1, marginBottom: 1 }} 
			/>
		</Grid>
	</Grid>;
}
