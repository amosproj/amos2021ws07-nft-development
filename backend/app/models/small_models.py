from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base

# if TYPE_CHECKING:
#     from .item import Item  # noqa: F401

class RoleDB(Base):
    # overwrite the tabble name
    __tablename__  = 'roles'

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, index=True, nullable=False)
    description = Column(String)
    created_at = Column(DateTime(), nullable=False)
    updated_at = Column(DateTime(), nullable=False)

    def to_string(self):
        return str(
            f"RoleDB:\nid[{str(self.id)}]\n\
            role_name[{str(self.role_name)}]\n\
            description[{str(self.description)}]\n\
            created_at[{str(self.created_at)}]\n\
            updated_at[{str(self.updated_at)}]")

class UserRoleDB(Base):
    # overwrite the tabble name
    __tablename__  = 'user_role'

    # fake table to workaround the sqlalchemy constraint
    id = Column(Integer, primary_key=True, index=True)  
    user_id = Column(Integer, ForeignKey("users.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    created_at = Column(DateTime(), nullable=False)
    updated_at = Column(DateTime(), nullable=False)

    def to_string(self):
        return str(
            f"RoleDB:\nid[{str(self.id)}]\n\
            user_id[{str(self.user_id)}]\n\
            role_id[{str(self.role_id)}]\n\
            created_at[{str(self.created_at)}]\n\
            updated_at[{str(self.updated_at)}]")
