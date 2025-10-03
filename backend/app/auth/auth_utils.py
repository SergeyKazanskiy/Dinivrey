from fastapi import Header, HTTPException
from firebase_admin import auth
#from config import settings
import jwt
import requests
import json
from pathlib import Path

with open(Path(__file__).parent.parent / "secrets" / "firebase-key.json") as f:
    firebase_config = json.load(f)

FIREBASE_PROJECT_ID = firebase_config["project_id"]


# async def get_decoded_token2(authorization: str = Header(None)) -> dict:
#     if settings.IS_DEVELOP_MODE:
#         return {"uid": "dev-user-id", "role": "admin"}

#     if authorization is None or not authorization.startswith("Bearer "):
#         raise HTTPException(status_code=401, detail="Missing Bearer token")

#     id_token = authorization.split(" ")[1]
#     try:
#         decoded_token = auth.verify_id_token(id_token)
#         #print("DECODED!!!:", decoded_token)
#     except Exception as e:
#         print("VERIFY ERROR:", repr(e))
#         raise HTTPException(status_code=401, detail="Invalid token")

#     return decoded_token


async def get_decoded_token(authorization: str = Header(None)) -> dict:
    #print("!!!!!_9 get_decoded_token", authorization)
    # if settings.IS_DEVELOP_MODE:
    #     return {"uid": "dev-user-id", "role": "admin"}

    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Bearer token")

    id_token = authorization.split(" ")[1]
    #print("!!!!!_10 " + id_token)
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        msg = str(e)
        print("VERIFY ERROR:", repr(e))

        # Если ошибка "Token used too early" — делаем проверку с допуском 5 секунд
        if "Token used too early" in msg:
            try:
                # Получаем публичные ключи Google
                keys = requests.get(
                    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
                ).json()

                header = jwt.get_unverified_header(id_token)
                public_key = keys[header["kid"]]

                # Повторная проверка с leeway
                decoded_token = jwt.decode(
                    id_token,
                    public_key,
                    algorithms=["RS256"],
                    audience=FIREBASE_PROJECT_ID,
                    leeway=5
                )
                return decoded_token

            except Exception as e2:
                print("SECOND VERIFY ERROR:", repr(e2))
                raise HTTPException(status_code=401, detail="Invalid token (after retry)")

        raise HTTPException(status_code=401, detail="Invalid token")
