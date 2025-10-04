import os
from pathlib import Path
from sklearn.model_selection import train_test_split

def split_dataset(image_dir, label_dir, train_ratio=0.7, val_ratio=0.2):
    images = sorted(os.listdir(image_dir))
    labels = sorted(os.listdir(label_dir))
    
    train_imgs, test_imgs = train_test_split(images, test_size=(1-train_ratio), random_state=42)
    val_imgs, test_imgs = train_test_split(test_imgs, test_size=(1-val_ratio/(1-train_ratio)), random_state=42)
    
    return train_imgs, val_imgs, test_imgs
