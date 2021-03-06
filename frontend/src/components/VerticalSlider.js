// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import * as React from "react";
import Slider from "react-slick";
import { sliderColor } from "../assets/jss/colorPalette";
import { leftSwipeArrowIcon, rightSwipeArrowIcon } from "../assets/jss/imagePalette";


function NextArrow(props) {
	const { onClick } = props;
	return (
		<div style={{ position: "absolute", zIndex: 1, bottom: "2px", cursor: "pointer", left: "50%", WebkitTransform:"translateX(-50%)", MsTransform:"translateX(-50%)", transform:"translateX(-50%)" }}>
			<img src={rightSwipeArrowIcon} alt="Right" style={{ "WebkitTransform":"rotate(90deg)","MsTransform":"rotate(90deg)","transform":"rotate(90deg)", }} onClick={onClick}/>
		</div>
	);
}

function PrevArrow(props) {
	const { onClick } = props;
	return (
		<div style={{ position: "absolute", zIndex: 1, top: "2px", cursor: "pointer", left: "50%", WebkitTransform:"translateX(-50%)", MsTransform:"translateX(-50%)", transform:"translateX(-50%)" }}>
			<img src={leftSwipeArrowIcon} alt="Right" style={{ "WebkitTransform":"rotate(90deg)","MsTransform":"rotate(90deg)","transform":"rotate(90deg)", }} onClick={onClick}/>
		</div>
	);
}

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