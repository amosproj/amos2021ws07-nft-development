// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>


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

// const ms_delay = ms => new Promise(res => setTimeout(res, ms));