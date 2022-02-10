// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Slider from "react-slick";
import { sliderColor } from "../assets/jss/colorPalette";
import { HorizontalNextArrow } from "./HorizontalNextArrow";
import { HorizontalPrevArrow } from "./HorizontalPrevArrow";

/**
 * Horizontal slider 
 * @param children children components
 * @returns {JSX.Element}
 */
export default function HorizontalSlider({ children }) {
	const settings = {
		className: "slider variable-width",
		dotsClass: "slick-dots slick-thumb",
		dots: true,
		infinite: true,
		centerMode: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		nextArrow: <HorizontalNextArrow />,
		prevArrow: <HorizontalPrevArrow />,
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