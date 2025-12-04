from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator


app = FastAPI()

# CORS configuration - allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HexRequest(BaseModel):
    hex: str
    
    @validator('hex')
    def validate_hex(cls, v):
        # Remove # if present
        v = v.strip()
        if v.startswith('#'):
            v = v[1:]
        
        # Validate hex format
        if len(v) not in [3, 6]:
            raise ValueError('Hex color must be 3 or 6 characters long')
        
        try:
            int(v, 16)
        except ValueError:
            raise ValueError('Invalid hex color code')
        
        return v


class RGBResponse(BaseModel):
    r: int
    g: int
    b: int


@app.post("/convert", response_model=RGBResponse)
def convert_hex_to_rgb(request: HexRequest):
    """Convert hex color code to RGB values"""
    hex_code = request.hex
    
    # Expand 3-char hex to 6-char
    if len(hex_code) == 3:
        hex_code = ''.join([c*2 for c in hex_code])
    
    # Convert to RGB
    r = int(hex_code[0:2], 16)
    g = int(hex_code[2:4], 16)
    b = int(hex_code[4:6], 16)
    
    return RGBResponse(r=r, g=g, b=b)


@app.get("/")
def root():
    return {"message": "Hex to RGB Converter API"}
