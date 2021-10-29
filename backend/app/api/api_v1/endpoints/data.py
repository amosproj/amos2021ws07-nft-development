from fastapi.responses import StreamingResponse
from fastapi.responses import FileResponse
from fastapi import APIRouter, Body, Depends
import io
import random
from app.utilities.strings import slugify, clean_filename
router = APIRouter()


def iterfile(path: str):
    with open(path, mode="rb") as file_like:
        yield from file_like


""" Do not use this function, use FileResponse instead. We leave it here to 
demonstrate another way to stream file to client """
@router.get("/streaming-response/")
async def get_streaming_response() -> io.BytesIO:
    return StreamingResponse(
        iterfile("./data/records/imperial_march_60.wav"),
        media_type="audio/wave"
    )


@router.get("/file-response/")
async def get_file_response():
    return FileResponse("./data/records/imperial_march_60.wav")


@router.get("/records/{record_filename}")
async def get_record_by_file(record_filename: str):
    return FileResponse(
        #TODO: Implement clean_filename. Its still a placeholder function
        "./data/records/" + clean_filename(record_filename)
    )

@router.get("/dummies-records/{record_filename}")
async def get_dummies_record_by_random(record_filename: str):
    """ Don't care about the record_filename. This endpoint returns
    one of 3 audio files randomly """
    files = ['imperial_march_60.wav', 'star_wars_3.wav', 'star_wars_60.wav']
    return FileResponse(
        "./data/records/" + random.choice(files)
    )
