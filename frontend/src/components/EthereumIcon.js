// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React from "react";
import { ethereumIcon } from "../assets/jss/imagePalette";

/**
 * An ethereum Icon
 * @returns {JSX.Element}
 */
export default function EthereumIcon() {
	return <img src={ethereumIcon} alt="ETH" style={{ marginBottom: "-4px" }} />;
}
