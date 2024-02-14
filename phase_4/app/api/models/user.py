from enum import Enum
from pydantic import BaseModel, EmailStr
from typing_extensions import Annotated


class User:
    def __init__(self, **kwargs):
        self.idUsuario = kwargs.get("idUsuario")
        self.nome = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.status: UserStatus = kwargs.get("status")
        self.senha = kwargs.get("senha")
        self.tipo: UserType = kwargs.get("tipo")


class UserType(str, Enum):
    ADMIN = "ADM"
    AUTHOR = "AUTOR"
    CUSTOMER = "CLIENTE"


class UserStatus(str, Enum):
    ACTIVE = "active"
    BLOCKED = "blocked"
    PENDING = "pending"
    INACTIVE = "inactive"


class UserDAO:
    def __init__(self, **kwargs):
        self.name = kwargs.get("nome")
        self.email = kwargs.get("email")
        self.id = kwargs.get("idUsuario")
        self.type: UserType = kwargs.get("tipo")
        self.status: UserStatus = kwargs.get("status")

class RecoveryEmailForm(BaseModel):
    email: EmailStr


