FROM python:3.11-slim

WORKDIR /app

# Устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код
COPY async_service.py .

# Создаем непривилегированного пользователя
RUN useradd -m -u 1000 user && chown -R user:user /app
USER user

# Экспортируем порт
EXPOSE 8000

# Запускаем сервис
CMD ["python", "async_service.py"]