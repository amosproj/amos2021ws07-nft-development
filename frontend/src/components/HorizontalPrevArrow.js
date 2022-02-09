// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import { leftSwipeArrowIcon } from "../assets/jss/imagePalette";

/**
 * "Previous" arrow componenet.
 * @param props props
 * @returns {JSX.Element}
 */
export function HorizontalPrevArrow(props) {
	const { onClick } = props;
	return (
		<div style={{ position: "absolute", zIndex: 1, left: "2px", top: "50%", WebkitTransform: "translate(0,-50%)", MsTransform: "translate(0,-50%)", transform: "translate(0,-50%)", cursor: "pointer" }}>
			<img src={leftSwipeArrowIcon} alt="Right" style={{ marginBottom: "-4px" }} onClick={onClick} />
		</div>
	);
}
