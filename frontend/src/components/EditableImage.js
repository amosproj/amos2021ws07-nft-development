import React, { useState, useRef } from "react";
import ConditionalAlert from "./ConditionalAlert";
import ParagraphTypography from "./ParagraphTypography";
import photoSymbol from "../assets/img/photo-symbol.png";
import { Margin, CenterBox, } from "./common";

import appwriteAPI from "../api/appwriteApi";

export const linkStyle = { textDecoration: "underline", cursor: "pointer", };

/**
 * Displays an image from the database, which optionally can be changed.
 * @param onUpdate if truthy, then the image is editable and it will display an overlay with a photo symbol.
 *   If a function, it will be called to get the image ID for the new upload.
 * @param imageID a string which identifies the image in the database
 * @param fallbackImage an image (source) that is used as fallback, if no imageID is given
 * @param imageStyle CSS properties for displaying the image component. The image is scaled to the full width/height.
 * @returns {JSX.Element}
 */
export default function EditableImage({ onUpdate, imageID, fallbackImage, imageStyle, style, }) {
	const [hasFailed, setHasFailed] = useState(false);
	const inputField = useRef(undefined);

	const isEditable = !!onUpdate;
	const hasImageID = !!imageID;
	let imageURL = ((hasImageID) && appwriteAPI.loadImageFromDatabase(imageID)) || fallbackImage;

	const changePicture = async () => {
		if (!isEditable) return;

		inputField.current.click();
	};

	// https://stackoverflow.com/questions/37457128/react-open-file-browser-on-click-a-div
	const onChangeFile = async event => {
		event.preventDefault();
		const files = event.target.files;
		if (!(files?.length >= 1))
			return setHasFailed(true);

		const image = files[0];
		const newImageID = await appwriteAPI.saveImageToDatabase(image);
		setHasFailed(!newImageID);

		if (newImageID)
			onUpdate(newImageID);
	};

	const failureMessage = <ConditionalAlert severity="error" text="Cannot change picture" conditionFunction={() => hasFailed} />;

	const render = () => (<div style={style}>
		{picturePreview}

		<Margin height="20px" />

		{isEditable &&
			<ParagraphTypography style={{ fontWeight: "400", fontSize: "15px", opacity: "55%", }}>
				Click on picture to <span style={linkStyle} onClick={changePicture}>edit</span>
			</ParagraphTypography>
		}

		{failureMessage}

		<Margin sx={{ display: { xs: "block", md: "none", } }} height="10px" />
	</div>);

	const pictureBackgroundColor = (alpha) => `rgba(255,255,255,${alpha})`;
	const picturePreviewStyle = {
		background: pictureBackgroundColor(0.1),
		color: pictureBackgroundColor(0.3),
		overflow: "hidden",
		width: "100%",
		height: "100%",
		borderRadius: "7px",
		...imageStyle,
	};
	const editingOverlay = () => (
		<CenterBox style={{ background: "rgba(0,0,0,0.19)", width: "100%", height: "100%", cursor: "pointer", }} onClick={changePicture}>
			<div style={{ backgroundImage: `url(${photoSymbol})`, backgroundSize: "cover", width: "33px", height: "34px", overflow: "hidden", }}>
				<input ref={inputField} type="file" onChange={onChangeFile} accept="image/png, image/jpeg" style={{ opacity: 0, width: "1px", height: "1px", }}/>
			</div>
		</CenterBox>
	);
	const picturePreview = (<div style={picturePreviewStyle}>
		<div style={{ backgroundImage: `url(${imageURL})`, backgroundSize: "cover", width: "100%", height: "100%", }}>
			{isEditable && editingOverlay()}
		</div>
	</div>);

	return render();
}
