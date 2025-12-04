# Hex to RGB Converter API

A minimal FastAPI backend that converts hex color codes to RGB values.

## Setup

### Option 1: Using Docker (Recommended)

From the root directory:
```bash
docker-compose up
```

The API will be available at `http://localhost:8000`

### Option 2: Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

### POST /convert

Converts a hex color code to RGB values.

**Request Body:**
```json
{
  "hex": "#FF5733"
}
```

**Response:**
```json
{
  "r": 255,
  "g": 87,
  "b": 51
}
```

**Notes:**
- The `#` prefix is optional
- Supports both 3-character (`#FFF`) and 6-character (`#FFFFFF`) hex codes
- CORS is enabled for all origins

### GET /

Health check endpoint.

**Response:**
```json
{
  "message": "Hex to RGB Converter API"
}
```

## Interactive Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
