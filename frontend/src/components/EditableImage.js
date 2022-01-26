import React, { useState } from "react";
import ConditionalAlert from "./ConditionalAlert";
import ParagraphTypography from "./ParagraphTypography";
import photoSymbol from "../assets/img/photo-symbol.png";
import { Margin, CenterBox, Image } from "./common";

// TODO:

export function loadImageFromDatabase(imageID) {}
export function saveImageToDatabase(image, imageID) {}
export function getImageFromUserDevice() {}

export const linkStyle = { textDecoration: "underline", cursor: "pointer", };


/**
 * Displays an image from the database, which optionally can be changed.
 * @param isEditable if true then it will display an overlay with a photo symbol
 * @param imageID a string which identifies the image in the database
 * @param fallbackImage an image (source) that is used as fallback, if no imageID is given
 * @param imageStyle CSS properties for displaying the image component. The image is scaled to the full width/height.
 * @returns {JSX.Element}
 */

export default function EditableImage({ isEditable, imageID, fallbackImage, imageStyle, style, }) {
	const [hasFailed, setHasFailed] = useState(false);

	const hasImageID = !!imageID;
	const imageURL = (hasImageID) ?
		loadImageFromDatabase(imageID) :
		fallbackImage;

	const changePicture = () => {
		if (!isEditable)
			return;
		if (hasImageID) {
			const image = getImageFromUserDevice();
			saveImageToDatabase(image, imageID);
		}
		setHasFailed(hasImageID);
	};

	const failureMessage = <ConditionalAlert severity="error" text="Cannot change picture" conditionFunction={() => hasFailed} />;

	const render = () => (<div style={style}>
		{picturePreview}

		<Margin height="20px" />

		{isEditable &&
			<ParagraphTypography style={{ fontWeight: "400", fontSize: "15px", opacity: "55%", }}>
				Click on picture to <span style={linkStyle} onClick={changePicture}>edit</span>
			</ParagraphTypography>}

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
	const picturePreview = (<div style={picturePreviewStyle}>
		<div style={{ backgroundImage: `url(${imageURL})`, backgroundSize: "cover", width: "100%", height: "100%", }}>
			{isEditable &&
				<CenterBox style={{ background: "rgba(0,0,0,0.19)", width: "100%", height: "100%", cursor: "pointer", }} onClick={changePicture}>
					<Image src={photoSymbol} height="34px" />
				</CenterBox>}
		</div>
	</div>);

	return render();
}
