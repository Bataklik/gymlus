from pydantic import BaseModel, ConfigDict, Field


class PostExercise(BaseModel):
    """ Schema for scanning a new exercise. """
    exercise_image: str = Field(..., description="URL of the exercise image")
