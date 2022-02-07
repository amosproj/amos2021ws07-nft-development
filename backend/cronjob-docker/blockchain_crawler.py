import os
import json
import time
import datetime
import appwrite.services.database
from etherscan import Etherscan
from appwrite.client import Client
from appwrite.services.database import Database


def init_infura_web3():
    net = os.environ.get("ETHEREUM_NET")
    if net == "kovan":
        from web3.auto.infura.kovan import w3
    else:
        from web3.auto.infura import w3
    if not w3.isConnected():
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
    client.set_project(os.getenv("APPWRITE_PROJECT"))
    client.set_key(os.getenv("APPWRITE_API_KEY"))
    return client


def get_collection_id(collection: Database, name: str) -> str:
    def _filter_collection_by_name(_coll: Database, _name: str) -> [str]:
        _ids = [
            x["$id"] if x["name"] == _name else None
            for x in _coll.list_collections()["collections"]
        ]
        return list(filter(None, _ids))

    collection_ids = _filter_collection_by_name(collection, name)
    # team already exists
    if len(collection_ids) == 1:
        return collection_ids[0]
    raise ValueError(f"Expected one '{name}' team but found {len(collection_ids)}")


def get_document_by_name(
    documents: dict,
    by: str = "contract_name",
    name: str = "MAIN_CONTRACT",
) -> dict:
    doc = [x if x[by] == name else None for x in documents["documents"]]
    res = list(filter(None, doc))
    if len(res) == 1:
        return res[0]
    raise ValueError(
        f"Expected one '{name}' document in collection but found {len(res)}"
    )


def get_drop_infos(contract) -> dict:
    drops = {}
    current_time = int(time.time())
    number_of_drops = contract.functions.numberOfDrops().call()
    for drop_id in range(number_of_drops):
        drop_dict = {}
        drop_dict["drop_contract"] = contract.address
        _drop_info = contract.functions.dropData(drop_id).call()
        drop_dict["drop_id"] = drop_id
        drop_dict["drop_creator"] = _drop_info[0]
        drop_dict["drop_symbol"] = _drop_info[1]
        drop_dict["drop_name"] = _drop_info[2]
        drop_dict["drop_size"] = int(_drop_info[3])
        drop_dict["drop_reserved"] = int(_drop_info[4])
        drop_dict["drop_price"] = int(_drop_info[5])
        drop_dict["drop_time"] = int(_drop_info[6])
        drop_dict["drop_uris"] = contract.functions.getAllURIs(drop_id).call()
        drop_dict["last_updated"] = current_time
        drops[drop_id] = drop_dict
    return drops


def update_drops(
    database: appwrite.services.database.Database,
    drops: dict,
    drop_collection_id: str,
):
    drop_list = database.list_documents(drop_collection_id)["documents"]
    # update drops or create them if they don't exist yet
    for drop_id in drops:
        new_drop = True
        for db_drop in drop_list:
            if db_drop.get("drop_id") == drop_id:
                # update document
                _drop = drops[drop_id]
                _drop["drop_uris"] = json.dumps(_drop["drop_uris"])
                database.update_document(
                    collection_id=drop_collection_id,
                    document_id=db_drop["$id"],
                    data=_drop,
                    read=["*"],
                    write=["team:Admins"],
                )
                new_drop = False
        if new_drop:
            # create document
            _drop = drops[drop_id]
            _drop["drop_uris"] = json.dumps(_drop["drop_uris"])
            database.create_document(
                collection_id=drop_collection_id,
                data=_drop,
                read=["*"],
                write=["team:Admins"],
            )


def update_abis(
    database: appwrite.services.database.Database,
    abi_collection_id: str,
):
    abi_list_db = database.list_documents(abi_collection_id)["documents"]
    eth_scan = init_etherscan()
    w3 = init_infura_web3()
    for abi_db in abi_list_db:
        abi_db["contract_address"] = w3.toChecksumAddress(abi_db["contract_address"])
        abi_db["contract_abi"] = eth_scan.get_contract_abi(abi_db["contract_address"])
        database.update_document(
            collection_id=abi_collection_id,
            document_id=abi_db["$id"],
            data={
                "contract_abi": abi_db["contract_abi"],
                "contract_address": abi_db["contract_address"],
                "contract_name": abi_db["contract_name"],
                "description": abi_db["description"],
            },
            read=["*"],
            write=["team:Admins"],
        )


def main():
    # instantiate database connection
    client = init_client()
    database = Database(client)

    drop_id = get_collection_id(database, "Drops")
    abis_id = get_collection_id(database, "ABIs")
    update_abis(database=database, abi_collection_id=abis_id)
    abis = database.list_documents(collection_id=abis_id)
    main_contract = get_document_by_name(abis)

    w3 = init_infura_web3()

    contract = w3.eth.contract(
        address=w3.toChecksumAddress(main_contract["contract_address"]),
        abi=main_contract["contract_abi"],
    )
    update_drops(
        database=database,
        drops=get_drop_infos(contract),
        drop_collection_id=drop_id,
    )


sleep_interval_s = 10.0
starttime = time.time()

print("\nLoaded environment variables:")
print(f'ETHEREUM_NET: {os.getenv("ETHEREUM_NET")}')
print(f'ETHERSCAN_API_KEY: {os.getenv("ETHERSCAN_API_KEY")}')
print(f'WEB3_INFURA_PROJECT_ID: {os.getenv("WEB3_INFURA_PROJECT_ID")}')
print(f'WEB3_INFURA_API_SECRET: {os.getenv("WEB3_INFURA_API_SECRET")}')
print(f'APPWRITE_PROJECT: {os.getenv("APPWRITE_PROJECT")}')
print(f'APPWRITE_ENDPOINT: {os.getenv("APPWRITE_ENDPOINT")}')
print(f'APPWRITE_API_KEY: {os.getenv("APPWRITE_API_KEY")}\n')


while True:
    try:
        main()
        print(f"{datetime.datetime.now()} - Updated ABIs and Drops")

    except Exception as e:
        print(f"{datetime.datetime.now()} - Exception: {e}")

    finally:
        time.sleep(sleep_interval_s - ((time.time() - starttime) % sleep_interval_s))
