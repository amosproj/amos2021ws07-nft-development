from typing import Optional

from pydantic import BaseModel, EmailStr


""" Role """
class RoleBase(BaseModel):
    role_name: str
    description: str


# Properties to receive via API on creation
class RoleCreate(RoleBase):
    pass


# Properties to receive via API on update
class RoleUpdate(RoleBase):
    pass


class RoleInDBBase(RoleBase):
    pass
    class Config:
        orm_mode = True

""" UserRole """
# Shared properties
class UserRoleBase(BaseModel):
    user_id: int
    role_id: int


# Properties to receive via API on creation
class UserRoleCreate(UserRoleBase):
    pass


# Properties to receive via API on update
class UserRoleUpdate(UserRoleBase):
    pass


class UserRoleInDBBase(UserRoleBase):
    pass
    class Config:
        orm_mode = True
