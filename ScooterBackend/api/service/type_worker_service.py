#System
from typing import List, Union, Dict

#Other libraries
from sqlalchemy.ext.asyncio import AsyncSession

#Local
from database.repository.type_worker_repository import TypeWorkerRepository, TypeWorker
from database.repository.admin_repository import AdminRepository
from api.dto.type_worker_dto import TypeWorkerBase
from api.authentication.authentication_service import Authentication
from api.exception.http_type_worker_exceptions import TypeWorkerExceptions
from api.exception.http_user_exception import UserHttpError
from api.dep.dependencies import IEngineRepository


class TypeWorkerService:

    @staticmethod
    async def create_a_new_type_worker(engine: IEngineRepository, token: str, new_type_worker: TypeWorkerBase) -> None:
        """
        Метод сервиса для создания нового типа работника
        :session:
        :new_type_worker:
        """


        #Данные токена
        jwt_data: Dict[str, Union[str, int]] = await Authentication().decode_jwt_token(token=token, type_token="access")

        async with engine:
            #Проверка на администратора
            is_admin: bool = await engine.admin_repository.find_admin_by_email_and_password(email=jwt_data.get("email"))

            if is_admin:
                is_created: bool = await engine.type_worker_repository.add_one(data=TypeWorker(
                    name_type=new_type_worker.name_type
                ))
                if is_created:
                    return
                await TypeWorkerExceptions().http_dont_create_a_new_type_worker()
            await UserHttpError().http_user_not_found()

    @staticmethod
    async def get_all_types(engine: IEngineRepository) -> List[TypeWorkerBase]:
        """
        Метод сервиса для получение всех категорий работников.
        :session:
        """

        async with engine:
            all_types_workers: Union[List, List[TypeWorkerBase]] = await engine.type_worker_repository.find_all()

            if all_types_workers:
                return [TypeWorkerBase(name_type=worker[0].name_type) for worker in all_types_workers]
            else:
                return []

    @staticmethod
    async def get_type_worker_by_id(engine: IEngineRepository, id_type_worker: int) -> TypeWorkerBase:
        """
        Получение типа работника по id.
        :session:
        :id_type_worker:
        """

        async with engine:
            type_worker: Union[None, List[TypeWorker]] = await engine.type_worker_repository.find_one(other_id=id_type_worker)

            if type_worker:
                return TypeWorkerBase(name_type=type_worker[0].name_type)
            await TypeWorkerExceptions().http_not_found_type_worker()

    @staticmethod
    async def delete_type_worker(
        engine: IEngineRepository,
        id_type_worker: int,
        token: str
    ) -> None:
        """
        Удаление типа работника
        :session:
        :id_type_worker:
        """

        #Данные токена
        jwt_data: Dict[str, Union[str, int]] = await Authentication().decode_jwt_token(token=token, type_token="access")

        async with engine:
            #Проверка на администратора
            is_admin: bool = await engine.admin_repository.find_admin_by_email_and_password(email=jwt_data.get("email"))

            if is_admin:
                is_deleted: bool = await engine.type_worker_repository.delete_one(other_id=id_type_worker)
                if is_deleted: return
                await TypeWorkerExceptions().http_dont_delete_type_worker()
            await UserHttpError().http_user_not_found()