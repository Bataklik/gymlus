""" FastAPI server for Gymlus. """
from fastapi import FastAPI

app = FastAPI()


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


@app.get("/api/scan")
def scan():
    """ Scanning for exercises. """
    return {"message": "hello, world"}


@app.get("/api/history")
def get_history():
    """ Get exercise history. """
    return {"history": history_data}
