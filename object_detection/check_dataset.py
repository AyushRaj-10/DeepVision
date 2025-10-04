 # check_dataset.py

import os

def check_dataset_structure():
    required_dirs = [
        "dataset/images/train",
        "dataset/images/val",
        "dataset/labels/train",
        "dataset/labels/val",
        "dataset/data.yaml"
    ]
    for path in required_dirs:
        if not os.path.exists(path):
            print(f"❌ Missing: {path}")
        else:
            print(f"✅ Found: {path}")

if __name__ == "__main__":
    check_dataset_structure()

