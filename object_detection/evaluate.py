import os
from ultralytics import YOLO
from config import MODEL_PATH, IMG_SIZE, DEVICE

# Path to your dataset YAML
DATA_YAML = os.path.join("dataset", "data.yaml")  # points to your nested structure

def evaluate_model():
    # Check if model exists
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"❌ Model checkpoint not found at: {MODEL_PATH}")

    # Check if dataset YAML exists
    if not os.path.exists(DATA_YAML):
        raise FileNotFoundError(f"❌ Dataset YAML not found at: {DATA_YAML}")

    print(f"[INFO] Evaluating model: {MODEL_PATH}")
    print(f"[INFO] Using dataset: {DATA_YAML}")

    # Load model
    model = YOLO(MODEL_PATH)

    # Run validation
    model.val(
        data=DATA_YAML,   # points to dataset/data.yaml
        imgsz=IMG_SIZE,
        device=DEVICE
    )

    print("✅ Evaluation complete!")

if __name__ == "__main__":
    evaluate_model()

