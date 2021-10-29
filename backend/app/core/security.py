from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext
import bcrypt

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# TODO: move to config section
ALGORITHM = "HS256"


def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def generate_salt() -> str:
    return bcrypt.gensalt().decode()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Plain password should be "salt+password"
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    # Password should be "salt+password"
    return pwd_context.hash(password)

# TODO: create logout function
# The token is saved client side, therefore server can not log the user out by
# deleting token. Instead, server can maintain a blacklist of token that is
# considered "not valid". But how to know which token belongs to a user?