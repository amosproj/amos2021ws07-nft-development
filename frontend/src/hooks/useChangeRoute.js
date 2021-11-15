// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { useHistory } from "react-router-dom";

export default function useChangeRoute() {
	const history = useHistory();

	return (path) => {
		history.push(path);
	};
}
