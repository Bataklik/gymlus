""" FastAPI server for Gymlus. """
import re
import json
from sqlalchemy.orm import Session
from typing_extensions import Annotated
from unittest.mock import Base
from fastapi.staticfiles import StaticFiles
from fastapi import Depends, FastAPI, UploadFile, responses
from schemas import PostExerciseResponse
from models import Exercise, HistoryItem
from services.gemini_service import GeminiService
from database import get_db, Base, engine
from fastapi import Form
# from starlette.exceptions import HTTPException

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/media", StaticFiles(directory="media"), name="media")

gemini_service = GeminiService()


history_data = [
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Cable Lat Pulldown",
        "muscleGroup": "Back",
        "time": "8:42 AM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Bench Press",
        "muscleGroup": "Chest",
        "time": "9:15 AM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Seated Row",
        "muscleGroup": "Back",
        "time": "10:42 AM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Shoulder Press",
        "muscleGroup": "Shoulders",
        "time": "11:30 AM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Bicep Curl",
        "muscleGroup": "Arms",
        "time": "12:00 PM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Tricep Extension",
        "muscleGroup": "Arms",
        "time": "1:15 PM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Squat",
        "muscleGroup": "Legs",
        "time": "2:30 PM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Lunges",
        "muscleGroup": "Legs",
        "time": "3:45 PM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Plank",
        "muscleGroup": "Core",
        "time": "4:00 PM",
    },
    {
        "exerciseImage": "https://placehold.co/75.jpg",
        "exerciseName": "Push-ups",
        "muscleGroup": "Chest",
        "time": "5:15 PM",
    },
]


@app.post("/api/scan",
          response_model=PostExerciseResponse)
async def post_scan(file: UploadFile,
                    unique_device_id: str = Form(
                        ..., description="Unieke ID van het apparaat dat de scan uitvoert"),
                    db: Annotated[Session, Depends(get_db)] = None):
    """ Scanning for exercises. """
    contents = await file.read()
    try:
        # image_file = await run_in_threadpool(lambda:
        #                                      gemini_service.process_image(contents))
        exercise_info = gemini_service.predict_exercise(contents)
        # TODO: History item met tijd
        db_data = exercise_info.copy()

        db_data["target_muscles"] = json.dumps(db_data["target_muscles"])
        db_data["instructions"] = json.dumps(db_data["instructions"])
        db_exercise = Exercise(**db_data)
        db.add(db_exercise)
        db.commit()
        db.refresh(db_exercise)

        db_history = HistoryItem(
            exercise_id=db_exercise.id,
            device_id=unique_device_id,
        )
        db.add(db_history)
        db.commit()

        return {**exercise_info}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise e


@app.get("/api/history", response_class=responses.JSONResponse)
def get_all_history(db: Annotated[Session, Depends(get_db)]):
    """ Get all exercise history. """
    history = gemini_service.retrieve_history(db)
    return {"history": history}


@app.get("/api/history/{device_id}", response_class=responses.JSONResponse)
def get_history(device_id: str, db: Annotated[Session, Depends(get_db)]):
    """ Get exercise history. """
    history = gemini_service.retrieve_history_by_device(db, device_id)
    return {"history": history}


@app.get("/api/history/search", response_class=responses.JSONResponse)
def search_history(query: str):
    """ Search exercise history. """
    filtered_history = [
        item for item in history_data if re.search("^"+query, item["exerciseName"], re.IGNORECASE)
    ]
    return {"history": filtered_history}
