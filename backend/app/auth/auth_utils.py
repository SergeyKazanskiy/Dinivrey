from fastapi import Header, HTTPException
from firebase_admin import auth
from config import settings


async def get_decoded_token(authorization: str = Header(None)) -> dict:
    if settings.IS_DEVELOP_MODE:
        return {"uid": "dev-user-id", "role": "admin"}

    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Bearer token")

    id_token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        #print("DECODED!!!:", decoded_token)
    except Exception as e:
        print("VERIFY ERROR:", repr(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    return decoded_token
