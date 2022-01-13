import os
import json
from etherscan import Etherscan
from appwrite.client import Client
from appwrite.services.database import Database

# Free version of Infura API allows about 100k requests per day.
# You have to create an infura account and create an ethereum kovan project and then:
# $ export WEB3_INFURA_PROJECT_ID=YourProjectID
# $ export WEB3_INFURA_API_SECRET=YourProjectSecret

# Same applies for Etherscan
# $ export ETHERSCAN_API_KEY=YourEtherscanAPIKey


def init_infura_web3():
    net = os.environ.get("ETHEREUM_NET")
    if net == "kovan":
        from web3.auto.infura.kovan import w3
    else:
        from web3.auto.infura import w3
    if not w3.isConnected():
        res = {"status": "error", "message": "Could not connect to web3 provider!"}
        print(json.dumps(res))
        exit()
    return w3


def init_etherscan():
    return Etherscan(
        api_key=os.environ.get("ETHERSCAN_API_KEY"), net=os.environ.get("ETHEREUM_NET")
    )


def init_client():
    # Initialize the Appwrite client
    client = Client()
    client.set_endpoint(os.getenv("APPWRITE_ENDPOINT"))
    client.set_project(os.getenv("APPWRITE_FUNCTION_PROJECT_ID"))
    client.set_key(os.getenv("APPWRITE_API_KEY"))
    return client


# provided by default
USER_ID = os.environ.get("APPWRITE_FUNCTION_USER_ID")
PAYLOAD = os.environ.get("APPWRITE_FUNCTION_DATA")

# provided by appwrite function env vars
DROP_COLLECTION_ID = os.environ.get("DROP_COLLECTION_ID")
ABI_COLLECTION_ID = os.environ.get("ABI_COLLECTION_ID")


w3 = init_infura_web3()
eth_scan = init_etherscan()

ERC721_ABI_DEMO_ADDRESS = w3.toChecksumAddress(
    "0xf2604e68c9F5756f3643aA569E5D0520D21a152A"
)
ERC721_ABI = eth_scan.get_contract_abi(ERC721_ABI_DEMO_ADDRESS)

FACTORY_CONTRACT_ADDRESS = w3.toChecksumAddress(
    os.environ.get("FACTORY_CONTRACT_ADDRESS")
)
FACTORY_CONTRACT_ABI = eth_scan.get_contract_abi(FACTORY_CONTRACT_ADDRESS)


factory_contract = w3.eth.contract(
    address=FACTORY_CONTRACT_ADDRESS, abi=FACTORY_CONTRACT_ABI
)


drops = {}
number_of_drops = factory_contract.functions.numberOfDrops().call()
for drop_id in range(number_of_drops):
    drop_dict = {}
    drop_dict["drop_time"] = factory_contract.functions.getDropTime(drop_id).call()
    drops[drop_id] = drop_dict


def get_created_nfts(factory_address: str, eth_scan):
    transactions_between_contracts = eth_scan.get_internal_txs_by_address(
        address=factory_address, startblock=0, endblock=999999999, sort="asc"
    )

    nft_addresses = []
    for trans in transactions_between_contracts:
        if trans.get("type") == "create":
            nft_addresses.append(trans.get("contractAddress"))
    return nft_addresses


nft_infos = {}
for nft_addr in get_created_nfts(FACTORY_CONTRACT_ADDRESS, eth_scan):
    nft_dict = {}
    nft_contract = w3.eth.contract(
        address=w3.toChecksumAddress(nft_addr), abi=ERC721_ABI
    )
    nft_dict["nft_symbol"] = nft_contract.functions.symbol().call()
    nft_dict["nft_name"] = nft_contract.functions.name().call()
    nft_transfer_events = (
        eth_scan.get_erc721_token_transfer_events_by_contract_address_paginated(
            contract_address=nft_addr, page=1, offset=100, sort="asc"
        )
    )
    trans_list = []
    for transfer_event in nft_transfer_events:
        token_id = int(transfer_event["tokenID"])
        trans_event = {}
        trans_event["token_id"] = token_id
        trans_event["token_uri"] = nft_contract.functions.tokenURI(token_id).call()
        trans_list.append(trans_event)
    nft_dict["transfers"] = trans_list
    nft_infos[nft_addr] = nft_dict


# instantiate database connection
client = init_client()
database = Database(client)


drop_list = database.list_documents(DROP_COLLECTION_ID)["documents"]

for drop_id in drops:
    new_drop = True
    for db_drop in drop_list:
        if db_drop.get("drop_id") == drop_id:
            # update document
            result = database.update_document(
                collection_id=DROP_COLLECTION_ID,
                document_id=db_drop["$id"],
                data={
                    "drop_id": drop_id,
                    "drop_name": "name",
                    "drop_uris": json.dumps(
                        [
                            "https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE"
                        ]
                    ),
                    "drop_date": drops[drop_id]["drop_time"],
                    "drop_size": 1,
                    "drop_released": False,
                },
            )
            new_drop = False
    if new_drop:
        # create document
        result = database.create_document(
            collection_id=DROP_COLLECTION_ID,
            data={
                "drop_id": drop_id,
                "drop_name": "name",
                "drop_uris": json.dumps(
                    [
                        "https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE"
                    ]
                ),
                "drop_date": drops[drop_id]["drop_time"],
                "drop_size": 1,
                "drop_released": False,
            },
        )


abi_list_db = database.list_documents(ABI_COLLECTION_ID)["documents"]
new_abis = {
    "ERC721": {
        "contract_abi": ERC721_ABI,
        "contract_address": ERC721_ABI_DEMO_ADDRESS,
        "contract_name": "ERC721",
        "description": "Standard ABI for ERC721 Contracts",
    },
    "Factory-Contract": {
        "contract_abi": FACTORY_CONTRACT_ABI,
        "contract_address": FACTORY_CONTRACT_ADDRESS,
        "contract_name": "Factory-Contract",
        "description": "ABI for NFTTheWorld Factory Contract",
    },
}
for abi_key in new_abis:
    _abi = new_abis[abi_key]
    new_abi = True
    for abi_db in abi_list_db:
        # Check if one dictionary is subset of other
        if _abi.items() <= abi_db.items():
            # update abi document
            new_abi = False
    if new_abi:
        # create abi document
        result = database.create_document(
            collection_id=ABI_COLLECTION_ID,
            data=_abi,
        )


"""
transactions3 = eth_scan.get_erc721_token_transfer_events_by_contract_address_paginated(
    contract_address=erc721_nft_address, page=1, offset=100, sort="asc"
)

internals = eth_scan.get_internal_txs_by_txhash(
    "0x65ca426ebeea674fd2092cfdda75ef6213918df7c54dd0e66ce71acf3f3e409d"
)


token_by_index = nft_contract.functions.tokenByIndex(0).call()
"""


# parse wallet address
# payload = json.loads(PAYLOAD)


res = {"status": "success"}
print(json.dumps(res))
