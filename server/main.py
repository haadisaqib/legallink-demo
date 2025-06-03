import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import base64
import httpx
import PyPDF2
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
MODEL = 'google/gemini-2.0-flash-001'
PORT = int(os.getenv('PORT', 4000))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FileData(BaseModel):
    filename: str
    file_data: str

class ChatRequest(BaseModel):
    files: List[FileData]
    prompt: str

@app.post("/api/chat")
async def chat_endpoint(body: ChatRequest):
    if not body.files:
        raise HTTPException(status_code=400, detail="No files provided")

    all_texts = []
    for file in body.files:
        b64 = file.file_data.split(',')[1] if ',' in file.file_data else file.file_data
        buffer = base64.b64decode(b64)
        try:
            pdf_reader = PyPDF2.PdfReader(BytesIO(buffer))
            text = "\n".join(page.extract_text() or '' for page in pdf_reader.pages)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to parse PDF: {file.filename}")
        all_texts.append(f"=== {file.filename} ===\n{text.strip()}")

    combined_text = "\n\n".join(all_texts)
    final_prompt = f"""
Here are the contents of the uploaded documents:

{combined_text}

User's question:
{body.prompt}
    """.strip()

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": final_prompt}],
    }
    async with httpx.AsyncClient() as client:
        try:
            api_res = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                json=payload,
                headers=headers,
                timeout=60
            )
            api_res.raise_for_status()
            data = api_res.json()
            content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            return {"content": content}
        except httpx.HTTPStatusError as err:
            status = err.response.status_code
            detail = err.response.text
            raise HTTPException(status_code=status, detail=f"Proxy failed: {detail}")
        except Exception as err:
            raise HTTPException(status_code=500, detail=f"Proxy failed: {str(err)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT) 