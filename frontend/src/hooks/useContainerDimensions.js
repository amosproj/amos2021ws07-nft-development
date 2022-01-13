// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { useEffect, useState } from "react";

// https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
/**
 * Hook to get width and height of a ref.
 * @param myRef
 * @returns {{width: number, height: number}}
 */
export const useContainerDimensions = myRef => {
	const getDimensions = () => ({
		width: myRef.current.offsetWidth,
		height: myRef.current.offsetHeight
	});

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const handleResize = () => {
			if (myRef.current !== undefined && myRef.current.offsetWidth !== undefined) {
				setDimensions(getDimensions());
			}
		};

		if (myRef.current !== undefined && myRef.current.offsetWidth !== undefined) {
			handleResize();
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [myRef]);

	return dimensions;
};