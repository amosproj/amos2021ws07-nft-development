// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

const injectDevServer = require("@cypress/react/plugins/react-scripts");

module.exports = (on, config) => {
	injectDevServer(on, config);
	return config;
};