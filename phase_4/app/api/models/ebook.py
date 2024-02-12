from enum import Enum
from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi import Query


class Ebook:

    class Ebook:
        def __init__(self, **kwargs):
            self.idAutor = kwargs.get("idAutor")
            self.idEbook = kwargs.get("idEbook")
            self.nome = kwargs.get("nome")
            self.autor = kwargs.get("autor")
            self.n_paginas: int = kwargs.get("n_paginas")
            self.anoLancamento = kwargs.get("anoLancamento")
            self.criadoEm = kwargs.get("criadoEm")
            self.idioma = kwargs.get("idioma")
            self.sinopse = kwargs.get("sinopse")
            self.img = kwargs.get("img")
            self.tamArqEmMb = kwargs.get("tamArq")
            self.status: EbookStatus = kwargs.get("status")
            self.preco = kwargs.get("preco")
            self.motivoRejeicao = kwargs.get("motivoRejeicao")
            self.modificadoEm = kwargs.get("modificadoEm")
            self.outrosAutores = kwargs.get("outrosAutores")


class EbookDAO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("idEbook")
        self.title = kwargs.get("nome")
        self.author = kwargs.get("nomeAutor")
        self.pages: int = kwargs.get("n_paginas")
        self.createdAt = kwargs.get("criadoEm")
        self.languages = kwargs.get("idioma")
        self.summary: str = kwargs.get("sinopse")
        self.authors = kwargs.get("outrosAutores")
        self.size = kwargs.get("tamArq")
        self.price: float = kwargs.get("preco")
        self.cover = kwargs.get("capa")
        self.releaseYear = kwargs.get("anoLancamento")
        self.status: EbookStatus = kwargs.get("status")
        self.isAvailable: bool = self.status == EbookStatus.ACTIVE


class EbookDTO(BaseModel):
    idEbook: str
    nome: str
    autor: str
    n_paginas: int
    criadoEm: Annotated[str, Query(pattern=r"^\d{4}-\d{2}$", examples=["2024-12"])]
    img: str
    tamArqEmMb: str
    preco: float


class EbookStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    INACTIVE = "inactive"
    REJECTED = "rejected"
