from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey, Double, Text, BLOB
from ScooterBackend.database.mainbase import MainBase
from typing import List


class Product(MainBase):
    #Таблица продукт-товар

    #Заголовок продукта
    title_product: Mapped[str] = mapped_column(type_=String(250), nullable=False, default="Заголовок продукта")

    #Цена продукта
    price_product: Mapped[float] = mapped_column(type_=Double, nullable=False, default=0)

    #Количество продукта
    quantity_product: Mapped[int] = mapped_column(type_=Integer, nullable=True, default=0)

    #Пояснение продукта (к количеству)
    explanation_product: Mapped[str] = mapped_column(type_=String(600), nullable=True, default="Пояснение")

    #Артикул продукта
    article_product: Mapped[str] = mapped_column(type_=String(250), nullable=False, default="")

    #Категория продукта - id
    id_category: Mapped[int] = mapped_column(ForeignKey('Category.id'), type_=Integer)

    #Метки продукта
    tags: Mapped[str] = mapped_column(type_=Text, nullable=True, default="")

    #Габариты продукта
    dimensions_product: Mapped[str] = mapped_column(type_=String(180), nullable=False, default="")

    #Вес продукта
    weight_product: Mapped[str] = mapped_column(type_=String(400), nullable=False, default="")

    #Фотография продукта
    photo_product: Mapped[bytes] = mapped_column(type_=BLOB, nullable=False)


    #Связи к таблицам
    reviews: Mapped[List["Category"]] = relationship("Category", back_populates="product") #Отзывы
    category: Mapped["Category"] = relationship("Category", back_populates="product") #Категория

    def __str__(self) -> str:
        return str(
            dict(
                k=v
                for k, v in self.__dict__.items()
            )
        )

    def __repr__(self) -> str: return self.__str__()