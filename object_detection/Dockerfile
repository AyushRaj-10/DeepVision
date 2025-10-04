FROM python:3.10-slim

# Install FFMPEG and other essential video/graphics libraries for OpenCV
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables to force all caching and config into the writable /tmp directory
ENV YOLO_CONFIG_DIR=/tmp
ENV HF_HOME=/tmp/huggingface
ENV MPLCONFIGDIR=/tmp/matplotlib
ENV PIP_CACHE_DIR=/tmp/pip

# Set the working directory
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application files
COPY . .

# The command to run your FastAPI application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]