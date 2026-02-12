import asyncio
import aiohttp
import logging
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import uvicorn

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="Async Calculation Service", docs_url="/docs", redoc_url="/redoc")

# Конфигурация
MAIN_SERVICE_URL = "http://app:8080/api"
SECRET_TOKEN = "secret_token_1234"

class CalculationRequest(BaseModel):
    application_id: int
    indoor_temp: float
    outdoor_temp: float
    materials: list[dict]

async def calculate_savings(material: dict, indoor_temp: float, outdoor_temp: float) -> float:
    """Расчет экономии с задержкой 5 секунд"""
    # Имитация долгого расчета
    await asyncio.sleep(5)
    
    try:
        area = material.get('area', 0)
        lambda_val = material.get('material', {}).get('lambda', 0.04)
        thickness = material.get('material', {}).get('thickness', 0.05)
        
        if thickness == 0:
            return 0.0
            
        delta_temp = indoor_temp - outdoor_temp
        # Простая формула расчета экономии
        savings = area * (lambda_val / thickness) * delta_temp * 0.1
        
        return round(savings, 2)
    except Exception as e:
        logger.error(f"Error calculating savings: {e}")
        return 0.0

async def send_result(application_id: int, material_id: int, result: float):
    """Отправка результата в основной сервис"""
    try:
        async with aiohttp.ClientSession() as session:
            url = f"{MAIN_SERVICE_URL}/application-materials/{application_id}/{material_id}/result"
            data = {"result": result, "token": SECRET_TOKEN}
            
            async with session.put(url, json=data, timeout=10) as response:
                if response.status == 200:
                    logger.info(f"✅ Результат отправлен: material_id={material_id}, result={result}")
                else:
                    logger.error(f"❌ Ошибка отправки: {response.status}")
    except Exception as e:
        logger.error(f"❌ Сетевая ошибка: {e}")

async def process_calculation(request: CalculationRequest):
    """Обработка расчета для всех материалов"""
    logger.info(f"🚀 Начинаем расчет для заявки {request.application_id}")
    
    for i, material_data in enumerate(request.materials):
        material_id = material_data.get('material', {}).get('id')
        if material_id:
            logger.info(f"📊 Расчет материала {i+1}/{len(request.materials)} (ID: {material_id})")
            savings = await calculate_savings(material_data, request.indoor_temp, request.outdoor_temp)
            await send_result(request.application_id, material_id, savings)
    
    logger.info(f"✅ Расчет завершен для заявки {request.application_id}")

@app.post("/calculate")
async def calculate_endpoint(request: CalculationRequest, background_tasks: BackgroundTasks):
    """Эндпоинт для запуска асинхронного расчета"""
    background_tasks.add_task(process_calculation, request)
    return {
        "status": "started",
        "application_id": request.application_id,
        "message": "Расчет экономии запущен. Результаты будут доступны через 5-10 секунд."
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "async-calculation"}

@app.get("/")
async def root():
    return {
        "message": "Async Calculation Service",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    logger.info("🚀 Запуск асинхронного сервиса на http://0.0.0.0:8000")
    logger.info("📚 Документация: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")