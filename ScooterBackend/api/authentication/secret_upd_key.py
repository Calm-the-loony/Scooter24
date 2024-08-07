#System
from typing import Union, List


#Other libraries
from random import choice, randint


#Local
from settings.email_transfer_settings import EmailTransferSettings


class SecretKey:

    def __init__(self, len_password = 80):
        self.len_password: int = len_password
        self.symbols: List[Union[int, str]] = [chr(numb) for numb in range(97, 126)]
        self.symbols.extend([chr(numb) for numb in range(65, 91)])
        self.symbols.extend(EmailTransferSettings().secret_symbols)

    def generate_password(self) -> str:
        """
        Генерация секретного ключа
        """

        size_key: int = randint(int(EmailTransferSettings().min_length_key), self.len_password)
        secret_key: str = ""

        while len(secret_key) != size_key:
            secret_key += choice(self.symbols)

        return secret_key