// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Slider from "react-slick";
import { sliderColor } from "../assets/jss/colorPalette";
import { NextArrow } from "./NextArrow";
import { PrevArrow } from "./PrevArrow";

/**
 * Vertical slider 
 * @param children children components
 * @returns {JSX.Element}
 */
export default function VerticalSlider({ children }) {
	const settings = {
		dots: true,
		infinite: true,
		dotsClass: "slick-dots slick-thumb",
		className: "slider variable-height",
		slidesToShow: 3,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		customPaging: function() {
			return (
				<div style={{ width:"16px", height: "16px", background: sliderColor, borderRadius: "100px" }}/>
			);
		},
		appendDots: dots => (
			<div>
				<ul style={{ margin: "-8px" }}> {dots} </ul>
			</div>
		),
	};

	return <Slider {...settings}>
		{children}
	</Slider>;
}