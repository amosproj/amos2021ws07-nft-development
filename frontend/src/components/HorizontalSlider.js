// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Slider from "react-slick";
import { sliderColor } from "../assets/jss/colorPalette";
import { leftSwipeArrowIcon, rightSwipeArrowIcon } from "../assets/jss/imagePalette";


function NextArrow(props) {
	const { onClick } = props;
	return (
		<div style={{ position: "absolute", zIndex: 1, right: "2px", top: "50%", WebkitTransform:"translate(0,-50%)", MsTransform:"translate(0,-50%)", transform:"translate(0,-50%)", cursor: "pointer" }}>
			<img src={rightSwipeArrowIcon} alt="Right" style={{ marginBottom: "-4px" }} onClick={onClick}/>
		</div>
	);
}
function PrevArrow(props) {
	const { onClick } = props;
	return (
		<div style={{ position: "absolute", zIndex: 1, left: "2px", top: "50%", WebkitTransform:"translate(0,-50%)", MsTransform:"translate(0,-50%)", transform:"translate(0,-50%)", cursor: "pointer" }}>
			<img src={leftSwipeArrowIcon} alt="Right" style={{ marginBottom: "-4px" }} onClick={onClick}/>
		</div>
	);
}

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