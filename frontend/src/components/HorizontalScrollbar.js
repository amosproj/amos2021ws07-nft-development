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

const fixedMarginRenderView = ({ style, children, ...props }) => {
	// for some reason the margins are not 100% correctly computed by react-custom-scrollbars-2
	// which sometimes causes 1px of the real scrollbars to be in view, thus we add another px of margin to fix this
	let fixedMarginRight = (style.marginRight-1)+"px";
	let fixedMarginBottom = (style.marginBottom-1)+"px";
	return <div style={{ ...style, marginRight: fixedMarginRight, marginBottom: fixedMarginBottom }} {...props}> {children}</div>;
};

export default function HorizontalScrollbar({ width="100%", height="100%", children }) {
	return (
		<Scrollbars style={{ width: width,  height: `calc(${height} + ${SCROLLBAR_HEIGHT+6}px)`, paddingRight: "-9px" }} autoHide autoHideTimeout={3500} renderThumbHorizontal={greyScrollbarsThumb} renderTrackHorizontal={greyScrollbarsHorizontalTrack} renderView={fixedMarginRenderView}>
			{children}
		</Scrollbars>
	);
}