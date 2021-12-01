// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Dominic Heil <d.heil@campus.tu-berlin.de>

import { Alert } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";


export default function ConditionalAlert({ severity, text, gridStyle={}, conditionFunction=(inputText)=>(!(inputText === "")) }){
	if (conditionFunction(text)){
		return <Grid item xs={12} style={gridStyle}><Alert severity={severity}> {text} </Alert></Grid>;
	}
	return <></>;
}