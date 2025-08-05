import os
import aiohttp

# Utility function to fetch Mercado Pago preapproval status by ID
MERCADOPAGO_API_URL = "https://api.mercadopago.com"

async def get_mercadopago_preapproval_status(preapproval_id: str):
    url = f"{MERCADOPAGO_API_URL}/preapproval/{preapproval_id}"
    access_token = os.getenv("MERCADOPAGO_ACCESS_TOKEN")
    headers = {"Authorization": f"Bearer {access_token}"}
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as resp:
            if resp.status != 200:
                print(f"Failed to fetch preapproval status: {resp.status}")
                return None, {"error": "Failed to fetch preapproval status", "status": resp.status}, 502
            data = await resp.json()
    return data, None, None
