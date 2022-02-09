// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import { rightSwipeArrowIcon } from "../assets/jss/imagePalette";

/**
 * "Next" arrow componenet.
 * @param props props
 * @returns {JSX.Element}
 */
export function NextArrow(props) {
	const { onClick } = props;
	return (
		<div style={{ position: "absolute", zIndex: 1, bottom: "2px", cursor: "pointer", left: "50%", WebkitTransform: "translateX(-50%)", MsTransform: "translateX(-50%)", transform: "translateX(-50%)" }}>
			<img src={rightSwipeArrowIcon} alt="Right" style={{ "WebkitTransform": "rotate(90deg)", "MsTransform": "rotate(90deg)", "transform": "rotate(90deg)", }} onClick={onClick} />
		</div>
	);
}
