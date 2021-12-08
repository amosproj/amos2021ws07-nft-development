// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import Scrollbars from "react-custom-scrollbars-2";
import * as React from "react";

const SCROLLBAR_HEIGHT = 6;

const greyScrollbarsThumb = ({ style, ...props }) => {
	return <div style={{ ...style, backgroundColor: "rgba(98,98,98,0.8)", borderRadius: "15px", }} {...props}/>;
};

const greyScrollbarsHorizontalTrack = ({ style, children, height= `${SCROLLBAR_HEIGHT}px`, ...props }) => {
	return <div style={{ ...style, position: "absolute", height: height, transition: "opacity 200ms ease 0s", opacity: 0, right: "2px", bottom: "2px", left: "2px", borderRadius: "3px" }} {...props}> {children}</div>;
};

export default function HorizontalScrollbar({ width="100%", height="100%", children }) {
	return (
		<Scrollbars style={{ width: width,  height: `calc(${height} + ${SCROLLBAR_HEIGHT+6}px)` }} autoHideautoHideTimeout={3500} autoHide renderThumbHorizontal={greyScrollbarsThumb} renderTrackHorizontal={greyScrollbarsHorizontalTrack}>
			{children}
		</Scrollbars>
	);
}