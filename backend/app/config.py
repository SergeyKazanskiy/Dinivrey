from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///dinivrey.db"
    #API_BASE_URL: str = "http://localhost:8000"
    IS_DEVELOP_MODE: bool = False
   # FIREBASE_KEY_PATH: str

    class Config:
        env_file = ".env"

settings = Settings()