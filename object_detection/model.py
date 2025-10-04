from ultralytics import YOLO
import os

# -------------------------------
# 🧠 Model Setup
# -------------------------------

# Path to the YOLO model (pretrained or fine-tuned)
MODEL_PATH = os.path.join("checkpoints", "best.pt")

# Load the model
model = YOLO(MODEL_PATH)

# -------------------------------
# 🔧 Optional: Training Function
# -------------------------------
def train_model(data_yaml, epochs=120, imgsz=640, batch=4, device=0, augment=True):
    """
    Fine-tune YOLO model on custom dataset.
    
    Args:
        data_yaml (str): Path to dataset YAML file.
        epochs (int): Number of training epochs.
        imgsz (int): Image size for training.
        batch (int): Batch size.
        device (int): GPU device ID (0 for first GPU).
        augment (bool): Whether to apply augmentation.
    """
    model.train(
        data=data_yaml,
        epochs=epochs,
        imgsz=imgsz,
        batch=batch,
        device=device,
        augment=augment
    )
    print("[INFO] Training completed. Weights are saved in runs/train/ folder.")
