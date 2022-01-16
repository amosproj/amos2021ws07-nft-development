import os
import json

import web3.contract
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


def get_drop_infos(contract: web3.contract.Contract) -> dict:
    drops = {}
    number_of_drops = contract.functions.numberOfDrops().call()
    for drop_id in range(number_of_drops):
        drop_dict = {}
        drop_dict["drop_contract"] = contract.address
        _drop_info = contract.functions.dropData(drop_id).call()
        drop_dict["drop_id"] = drop_id
        drop_dict["drop_creator"] = _drop_info[0]
        drop_dict["drop_symbol"] = _drop_info[1]
        drop_dict["drop_name"] = _drop_info[2]
        _drop_size = int(_drop_info[3])
        drop_dict["drop_size"] = _drop_size
        uris = []
        for i in range(_drop_size):
            _uri = contract.functions.dropURIs(drop_id, i).call()
            uris.append(_uri)
        drop_dict["drop_uris"] = uris
        drop_dict["drop_time"] = contract.functions.getDropTime(drop_id).call()
        drops[drop_id] = drop_dict
    return drops


# instantiate database connection
client = init_client()
database = Database(client)


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

MAIN_CONTRACT_ADDRESS = w3.toChecksumAddress(os.environ.get("MAIN_CONTRACT_ADDRESS"))
MAIN_CONTRACT_ABI = eth_scan.get_contract_abi(MAIN_CONTRACT_ADDRESS)


contract = w3.eth.contract(address=MAIN_CONTRACT_ADDRESS, abi=MAIN_CONTRACT_ABI)


drops = get_drop_infos(contract)
drop_list = database.list_documents(DROP_COLLECTION_ID)["documents"]

# update drops or create them if they don't exist yet
for drop_id in drops:
    new_drop = True
    for db_drop in drop_list:
        if db_drop.get("drop_id") == drop_id:
            # update document
            _drop = drops[drop_id]
            _drop["drop_uris"] = json.dumps(_drop["drop_uris"])
            result = database.update_document(
                collection_id=DROP_COLLECTION_ID,
                document_id=db_drop["$id"],
                data=_drop,
            )
            new_drop = False
    if new_drop:
        # create document
        _drop = drops[drop_id]
        _drop["drop_uris"] = json.dumps(_drop["drop_uris"])
        result = database.create_document(
            collection_id=DROP_COLLECTION_ID,
            data=_drop,
        )


abi_list_db = database.list_documents(ABI_COLLECTION_ID)["documents"]
new_abis = {
    "ERC721": {
        "contract_abi": ERC721_ABI,
        "contract_address": ERC721_ABI_DEMO_ADDRESS,
        "contract_name": "ERC721",
        "description": "Standard ABI for ERC721 Contracts",
    },
    "MAIN-Contract": {
        "contract_abi": MAIN_CONTRACT_ABI,
        "contract_address": MAIN_CONTRACT_ADDRESS,
        "contract_name": "MAIN-Contract",
        "description": "ABI for NFTTheWorld Main Contract",
    },
    "Factory-Contract": {
        "contract_abi": FACTORY_CONTRACT_ABI,
        "contract_address": FACTORY_CONTRACT_ADDRESS,
        "contract_name": "Factory-Contract",
        "description": "ABI for NFTTheWorld Factory Contract",
    },
}
# update ABIs or create them if they don't exist yet
for abi_key in new_abis:
    _abi = new_abis[abi_key]
    new_abi = True
    for abi_db in abi_list_db:
        # Check if one dictionary is subset of other
        if _abi.items() <= abi_db.items():
            # update abi document
            new_abi = False
            result = database.update_document(
                collection_id=ABI_COLLECTION_ID,
                document_id=abi_db["$id"],
                data=_abi,
            )
    if new_abi:
        # create abi document
        result = database.create_document(
            collection_id=ABI_COLLECTION_ID,
            data=_abi,
        )


res = {"status": "success"}
print(json.dumps(res))
