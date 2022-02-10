// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021/2022 Dominic Heil <d.heil@campus.tu-berlin.de>, Berinike Tech <berinike@delphai.com>
// SDPX-FileCopyrightText: 2022 Que Le <b.le@tu-berlin.de>

import React, { useEffect, useState } from "react";

import NftCardStructuredList from "../components/NftCardStructuredList";
import appwriteApi from "../api/appwriteApi";
import ethereumContractApi from "../api/ethereumContractApi";
import NftDropBanner from "../components/NftDropBanner";

export default function NftDropPage() {
	const [dropData, setDropData] = useState({});
	const [nftData, setNftData] = useState([]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const dropId = urlParams.get("dropid");

		let filter = ["drop_id=" + dropId];
		let limit = 10;
		let orderField = "drop_time";
		let orderType = "DESC";

		appwriteApi.getDrops(filter, limit, orderField, orderType).then((newDropData) => {
			let filteredDropData = newDropData.documents.map(dropEntry => {
				return {
					title: dropEntry["drop_name"],
					price: dropEntry["drop_price"],
					priceEth: ethereumContractApi.weiToEth(dropEntry["drop_price"]),
					nftTotalAvailability: dropEntry["drop_size"],
					nftLeft: dropEntry["drop_size"] - dropEntry["drop_reserved"],
					dropTime: dropEntry["drop_time"] * 1000,
					imgUris: JSON.parse(dropEntry["drop_uris"]),
					description: dropEntry["drop_name"] + " drop.",
					dropId: dropEntry["drop_id"]
				};
			})[0];
			// TODO: available or dropped based on current time
			let newNftData = filteredDropData.imgUris.map((elem, idx) => {
				return {
					title: filteredDropData.title + " " + idx,
					price: filteredDropData.price,
					priceEth: filteredDropData.priceEth,
					nftPageUrl: "#",
					imgUrl: elem,
					buttonText: "Available",
					dropTime: filteredDropData.dropTime
				};
			});
			console.log(newNftData);
			setDropData(filteredDropData);
			setNftData(newNftData);
		});
	}, []);

	return <NftCardStructuredList nftDataArray={nftData} topChildren={<NftDropBanner dropData={dropData} />} />;
}
