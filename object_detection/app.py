import os, uuid, cv2, numpy as np, json
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from huggingface_hub import HfApi

# --- Configuration ---
HF_USERNAME = "jeet2004" # This should be your HF username
DATASET_REPO_ID = f"{HF_USERNAME}/underwater-video-storage" # This should be your dataset repo
HF_TOKEN = os.getenv("HF_TOKEN")
hf_api = HfApi()

# --- Job Status Tracking ---
job_statuses = {}

# --- FastAPI App Initialization & Model Loading ---
app = FastAPI(title="Underwater Object Detection API")
try:
    model = YOLO('best.pt')
    print("✅ Model loaded successfully.")
except Exception as e:
    model = None
    print(f"❌ Error loading model: {e}")

# --- Background Task for Video Processing (Video Output) ---
def process_video_in_background(job_id: str, local_input_path: str, hf_repo_path: str):
    print(f"Starting background job {job_id} for {local_input_path}")
    global job_statuses
    local_output_path = f"/tmp/{Path(local_input_path).name}"
    try:
        cap = cv2.VideoCapture(local_input_path)
        # Using a very standard codec for maximum compatibility
        fourcc = cv2.VideoWriter_fourcc(*'mp4v') 
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        out = cv2.VideoWriter(local_output_path, fourcc, fps, (w, h))
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret: break
            
            # --- DEBUGGING STEP 1: Hardcoded drawing on every frame ---
            # We will draw this red box and yellow text on every single frame.
            cv2.rectangle(frame, (10, 10), (100, 100), (0, 0, 255), 2) # Red box
            cv2.putText(frame, "DEBUG", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2) # Yellow text

            # Run inference
            results = model(frame, verbose=False, conf=0.1)
            
            # Manually draw the bounding boxes and labels on the frame
            for r in results:
                for box in r.boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0])
                    cls_name = model.names[int(box.cls[0])]
                    label = f'{cls_name} {conf:.2f}'
                    
                    # --- DEBUGGING STEP 2: Print every detection to the logs ---
                    print(f"DEBUG LOG: Found object '{cls_name}' with confidence {conf:.2f}")
                    
                    # Draw the actual detection
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2) # Blue box
                    cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

            out.write(frame)
            
        cap.release()
        out.release()

        hf_api.upload_file(
            path_or_fileobj=local_output_path,
            path_in_repo=f"processed/{hf_repo_path}",
            repo_id=DATASET_REPO_ID,
            repo_type="dataset",
            token=HF_TOKEN,
        )
        
        result_url = f"https://huggingface.co/datasets/{DATASET_REPO_ID}/resolve/main/processed/{hf_repo_path}"
        job_statuses[job_id] = {"status": "complete", "result_url": result_url}
        print(f"✅ Job {job_id} finished. Processed video uploaded.")
    except Exception as e:
        job_statuses[job_id] = {"status": "failed", "error": str(e)}
        print(f"❌ Job {job_id} failed: {e}")
    finally:
        if os.path.exists(local_input_path): os.remove(local_input_path)
        if os.path.exists(local_output_path): os.remove(local_output_path)

# --- (The API Endpoints below are unchanged) ---
@app.get("/")
def read_root():
    return {"status": "API is online."}
@app.post("/detect-image/")
async def detect_image(file: UploadFile = File(...)):
    if not model: return JSONResponse(status_code=503, content={"error": "Model not loaded."})
    contents = await file.read()
    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)
    results = model(image, verbose=False, conf=0.1)
    detections = [{"class": model.names[int(box.cls)], "confidence": float(box.conf), "box": [round(c) for c in box.xyxy[0].tolist()]} for r in results for box in r.boxes]
    return JSONResponse(content={"detections": detections})
@app.post("/detect-video/")
async def detect_video(file: UploadFile = File(...), background_tasks: BackgroundTasks = BackgroundTasks()):
    if not HF_TOKEN: return JSONResponse(status_code=500, content={"error": "HF_TOKEN secret not configured."})
    try:
        job_id = str(uuid.uuid4())
        ext = Path(file.filename).suffix
        local_temp_path = f"/tmp/{job_id}{ext}"
        with open(local_temp_path, "wb") as buffer: buffer.write(await file.read())
        hf_repo_path = f"uploads/{job_id}{ext}"
        hf_api.upload_file(path_or_fileobj=local_temp_path, path_in_repo=hf_repo_path, repo_id=DATASET_REPO_ID, repo_type="dataset", token=HF_TOKEN)
        job_statuses[job_id] = {"status": "processing"}
        background_tasks.add_task(process_video_in_background, job_id, local_temp_path, hf_repo_path)
        return JSONResponse(status_code=202, content={"message": "Video processing started.", "job_id": job_id})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
@app.get("/status/{job_id}")
def get_status(job_id: str):
    status = job_statuses.get(job_id)
    if not status: return JSONResponse(status_code=404, content={"error": "Job not found."})
    return JSONResponse(content=status)