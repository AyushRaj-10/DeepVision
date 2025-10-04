import cv2
from ultralytics import YOLO
import argparse
import os

# -------------------------------
# 🧠 Load trained YOLO model
# -------------------------------
# Adjust the path below to point to your fine-tuned model
MODEL_PATH = os.path.join('runs', 'detect', 'train', 'weights', 'best.pt')
model = YOLO(MODEL_PATH)


# -------------------------------
# 🧰 Image Inference
# -------------------------------
def run_on_image(image_path):
    print(f"[INFO] Running inference on image: {image_path}")
    results = model.predict(source=image_path, save=True, show=True, imgsz=640)
    print("[INFO] Inference completed.")


# -------------------------------
# 🎞️ Video Inference
# -------------------------------
def run_on_video(video_path):
    print(f"[INFO] Running inference on video: {video_path}")
    results = model.predict(source=video_path, save=True, show=True, imgsz=640)
    print("[INFO] Inference completed. Processed video is saved in 'runs/predict'.")


# -------------------------------
# 📷 Live Webcam Inference
# -------------------------------
def run_on_webcam(webcam_index=0):
    print(f"[INFO] Starting webcam detection on camera {webcam_index}...")
    cap = cv2.VideoCapture(webcam_index)

    if not cap.isOpened():
        print("[ERROR] Could not open webcam.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Run YOLO detection on each frame
        results = model(frame, imgsz=640, verbose=False)

        # Plot results on frame
        annotated_frame = results[0].plot()

        # Show frame
        cv2.imshow("YOLO Live Detection", annotated_frame)

        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    print("[INFO] Webcam inference stopped.")


# -------------------------------
# 🧭 CLI Parser
# -------------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="YOLO Object Detection App")
    parser.add_argument('--image', type=str, help='Path to image file')
    parser.add_argument('--video', type=str, help='Path to video file')
    parser.add_argument('--webcam', action='store_true', help='Run webcam detection')
    args = parser.parse_args()

    if args.image:
        run_on_image(args.image)
    elif args.video:
        run_on_video(args.video)
    elif args.webcam:
        run_on_webcam()
    else:
        print("❌ Please specify --image <path>, --video <path>, or --webcam")
