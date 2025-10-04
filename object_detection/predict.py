 # predict.py

import os
import sys
from ultralytics import YOLO
from config import MODEL_PATH, IMG_SIZE

def run_inference(source):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"❌ Model checkpoint not found at: {MODEL_PATH}")

    model = YOLO(MODEL_PATH)
    print(f"[INFO] Running inference on: {source}")
    model.predict(source=source, imgsz=IMG_SIZE, save=True, show=True)
    print("✅ Inference complete!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py <image_or_video_path_or_0_for_webcam>")
        sys.exit(1)
    source_path = sys.argv[1]
    run_inference(source_path)

