// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";
import { useMediaQuery } from "react-responsive";
import LargeFooter from "./LargeFooter";
import SmallFooter from "./SmallFooter";

/**
 * Wrapper component used to build the footer of the page that is display at the bottom of every page.
 * @param children  children components that should be shown above the footer, i.e. the rest of the website
 * @returns {JSX.Element}
 */
export default function Footer({ children }){
	const isLarge = useMediaQuery({ query: "(min-width: 600px)" });
	const FooterComponent = isLarge ? LargeFooter : SmallFooter;

	let mainStyle = isLarge ? { minHeight: "calc(100vh - 150px)", paddingBottom: "150px" } : { minHeight: "calc(100vh - 220px)", paddingBottom: "220px" };

	return (<>
		<div style={mainStyle}>
			{children}
		</div>
		<FooterComponent>{children}</FooterComponent></>);
}
