// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2022 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>

import React from "react";
import Image from "../components/Image";
import { greenCheckmark } from "../assets/jss/imagePalette";

/**
 * Simple green check icon
 * @returns {JSX.Element}
 */
export default function GreenCheck() {
	return (<Image src={greenCheckmark} alt="✓" height="24px" />);
}
