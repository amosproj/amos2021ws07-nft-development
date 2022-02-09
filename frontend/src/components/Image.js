// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>

import React from "react";

/**
 * A container for image.
 * @param src source of the image
 * @param alt an alternate text for the image
 * @param onClick handler on click event
 * @param style style
 * @returns {JSX.Element}
 */

export default function Image({ src, alt, onClick, ...style }) {
	return (
		<img {...{ src, alt, onClick, style }} onDragStart={(e) => e.preventDefault()} unselectable="on" />
	);
}
