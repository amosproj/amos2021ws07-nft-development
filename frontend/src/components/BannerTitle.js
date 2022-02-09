// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

import React from "react";
import HeaderTypography from "./HeaderTypography";
import { textColor } from "../assets/jss/colorPalette";

export const bannerStyle = ({ color: textColor });

/**
 * Title container in banner.
 * @param isLarge state if large text is prefered.
 * @param children child components to embed.
 * @returns {JSX.Element}
 */
export function BannerTitle({ isLarge, children }) {
	const smallStyle = { ...bannerStyle, fontSize: 30, fontWeight: 550, bottomMargin: "5px" };
	const largeStyle = { ...bannerStyle, fontSize: 37, fontWeight: 700 };
	const style = isLarge ? largeStyle : smallStyle;

	return <HeaderTypography style={style}>{children}</HeaderTypography>;
}
