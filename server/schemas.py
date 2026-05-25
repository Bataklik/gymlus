from pydantic import BaseModel, ConfigDict, Field
from fastapi import UploadFile


class PostExercise(BaseModel):
    """ Schema for scanning a new exercise. """
    exercise_image: UploadFile = Field(...,
                                       description="Image of the exercise")


class PostExerciseResponse(BaseModel):
    """ Schema for the response of scanning a new exercise.
    """
    equipment_tag: str = Field(..., description="Tag of the equipment")
    display_name: str = Field(..., description="Display name of the equipment")
    target_muscles: list[str] = Field(...,
                                      description="List of target muscles")
    instructions: list[str] = Field(..., description="List of instructions")

    model_config = ConfigDict(
        extra="forbid",
        json_schema_extra={
            "example": {
                "equipment_tag": "lat_pulldown",
                "display_name": "Cable Lat Pulldown",
                "target_muscles": ["Latissimus dorsi", "Pectoralis major", "Biceps brachii"],
                "instructions": [
                    "Ga op het apparaat zitten en plaats je knieën onder de kussens.",
                    "Pak de stang vast met een brede grip, handpalmen naar voren gericht.",
                    "Trek de stang naar beneden tot aan je borst terwijl je je ellebogen naar beneden en achteren brengt.",
                    "Laat de stang gecontroleerd terug omhoog gaan naar de startpositie."
                ]
            }
        }
    )
