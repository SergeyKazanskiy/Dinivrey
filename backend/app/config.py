from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///dinivrey.db"
    API_BASE_URL: str = "http://localhost:8000"

    class Config:
        env_file = ".env"

settings = Settings()