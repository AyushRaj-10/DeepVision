 # config.py

# Paths
DATA_YAML = "dataset/data.yaml"    # path to dataset YAML
CHECKPOINT_DIR = "checkpoints"     # to save best.pt and last.pt
MODEL_PATH = f"{CHECKPOINT_DIR}/best.pt"

# Training configuration
EPOCHS = 120
IMG_SIZE = 640
BATCH_SIZE = 2
DEVICE = "0"   # '0' for GPU, 'cpu' if no CUDA

# YOLO base model (you can change to yolov8m.pt, yolov8l.pt, etc.)
BASE_MODEL = "yolov8n.pt"

