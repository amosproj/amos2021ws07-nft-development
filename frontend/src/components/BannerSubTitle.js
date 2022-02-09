// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import ParagraphTypography from "./ParagraphTypography";
import { textColor } from "../assets/jss/colorPalette";

export const bannerStyle = ({ color: textColor });

/**
 * Subtitle container in banner.
 * @param isLarge state if large text is prefered.
 * @param children child components to embed.
 * @returns {JSX.Element}
 */
export function BannerSubTitle({ isLarge, children }) {
	const smallStyle = { ...bannerStyle, fontSize: 19, fontWeight: 400 };
	const largeStyle = { ...bannerStyle, fontSize: 22, fontWeight: 500 };
	const style = isLarge ? largeStyle : smallStyle;

	return <ParagraphTypography style={style}>{children}</ParagraphTypography>;
}
