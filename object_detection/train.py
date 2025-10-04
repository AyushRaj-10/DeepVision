 # train.py

import os
from ultralytics import YOLO
from config import DATA_YAML, EPOCHS, IMG_SIZE, BATCH_SIZE, DEVICE, BASE_MODEL, CHECKPOINT_DIR

def main():
    if not os.path.exists(DATA_YAML):
        raise FileNotFoundError(f"❌ data.yaml not found at: {DATA_YAML}")

    os.makedirs(CHECKPOINT_DIR, exist_ok=True)

    model = YOLO(BASE_MODEL)
    model.train(
        data=DATA_YAML,
        epochs=EPOCHS,
        imgsz=IMG_SIZE,
        batch=BATCH_SIZE,
        device=DEVICE,
        project=CHECKPOINT_DIR,
        name="",  # saves directly into checkpoints folder
        exist_ok=True
    )
    print("✅ Training completed!")

if __name__ == "__main__":
    main()
