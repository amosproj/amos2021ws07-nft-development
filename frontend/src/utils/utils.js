// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>
// SPDX-FileCopyrightText: 2021 Que Le <b.le@tu-berlin.de>
// SPDX-FileCopyrightText: 2021 Christoph Ehm <christoph.ehmendoerfer@campus.tu-berlin.de>

//
/**
 * Returns true, if the email is in a valid format, false otherwise.
 * Regex source: https://stackoverflow.com/a/46181/7838440.
 * @param email email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

/**
 * A simple delay function to wait for xxx miliseconds
 * @param ms miliseconds to sleep
 * Source: https://stackoverflow.com/a/47480429
 * Usage:
 * import delayMsec from "../utils";
 * const yourFunction = async () => {
 *     await delayMsec(5000);
 *     console.log("Waited 5s");
 *};
 */
export const delayMsec = ms => new Promise(res => setTimeout(res, ms));

export function arrayIntersection(a, b) {
	return a.filter(e => b.includes(e));
}


/** @param text String that should be copied */
export function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		return copyTextToClipboardFallback(text);
	}

	navigator.clipboard.writeText(text)
		.then(clipboardSuccessFunction(text), clipbaordFailureFunction(text));
}

/**
 * Copying to clipboard using deprecated method. This overly complicated method is needed for browser support.
 * It creates a temporary new textfield with the copied text, focuses it, copies the focus and removes it.
 * It probably would also work by passing a component to copy from but I won't try it now.
 *
 * Solution was "stolen" from: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * @param text String that should be copied
 */
const copyTextToClipboardFallback = (text) => {
	const previousFocusedElement = document.activeElement;

	let tempTextArea = document.createElement("textarea");
	tempTextArea.value = text;
	tempTextArea.style.top = "0";
	tempTextArea.style.left = "0";
	tempTextArea.style.position = "fixed";

	document.body.appendChild(tempTextArea);
	tempTextArea.focus();
	tempTextArea.select();

	try {
		const successful = document.execCommand("copy");
		clipboardSuccessFunction(successful? text : "")();
	} catch (err) {
		clipbaordFailureFunction(text)(err);
	}
	
	document.body.removeChild(tempTextArea);
	previousFocusedElement.focus();
};

const clipboardSuccessFunction = (text) => () => console.log(`Copied "${text}" to clipboard.`);
const clipbaordFailureFunction = (text) => (err) => console.error(`Couldn't copy "${text}" to clipboard.`, err);

