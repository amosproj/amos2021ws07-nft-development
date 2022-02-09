// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2022 Christoph Ehm. <christoph.ehmendoerfer@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import Image from "../components/Image";
import { copyIcon } from "../assets/jss/imagePalette";
import { CopyToClipboard } from "react-copy-to-clipboard";

/**
 * Copy button that hold value to be copied to clipboard
 * @param copyContent: String that should be copied to clipboard
 * @returns
 */
export default function CopyButton({ copyContent }) {
	return (
		<CopyToClipboard text={copyContent}>
			<Image src={copyIcon} alt="Copy" width="18px" cursor="pointer" />
		</CopyToClipboard>
	);
}
