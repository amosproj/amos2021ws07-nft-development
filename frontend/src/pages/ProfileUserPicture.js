import React from "react";
import { profilePicturePreview } from "../assets/jss/colorPalette";
import Margin from "../components/Margin";
import Image from "../components/Image";
import CenterBox from "../components/CenterBox";
import ParagraphTypography from "../components/ParagraphTypography";
import { cameraIcon, sampleUserImg } from "../assets/jss/imagePalette";
// import { linkStyle, editProfilePicture } from "./Profile";

/**
 * User's profile picture container
 * @returns {JSX.Element}
 */
export function ProfileUserPicture({ linkStyle, editProfilePicture }) {
	const render = () => (<>
		{picturePreview}
		<Margin height="20px" />
		<ParagraphTypography style={{ fontWeight: "400", fontSize: "15px", opacity: "55%" }}>
			Click on picture to <span style={linkStyle} onClick={editProfilePicture}>edit</span>
		</ParagraphTypography>
		<Margin sx={{ display: { xs: "block", md: "none", } }} height="10px" />
	</>);

	const profileHeight = 122;
	const profilePicture = sampleUserImg; // TODO, "user" argument could be used
	const pictureBackgroundColor = (alpha) => `rgba(255,255,255,${alpha})`;
	const picturePreviewStyle = {
		background: pictureBackgroundColor(0.1),
		borderRadius: `${profileHeight / 2}px`,
		width: `${profileHeight}px`,
		height: `${profileHeight}px`,
		boxShadow: `2px -2px 0px 0px ${pictureBackgroundColor(0.3)}`,
		cursor: "pointer",
		overflow: "hidden",
	};
	const picturePreview = (<div style={picturePreviewStyle} onClick={editProfilePicture}>
		<div style={{ backgroundImage: `url(${profilePicture})`, backgroundSize: "cover", width: "100%", height: "100%", }}>
			<CenterBox style={{ background: profilePicturePreview, width: "100%", height: "100%", }}>
				<Image src={cameraIcon} height="34px" />
			</CenterBox>
		</div>
	</div>);

	return render();
}
