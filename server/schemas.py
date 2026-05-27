from pydantic import BaseModel, ConfigDict, Field
from fastapi import UploadFile


class PostExercise(BaseModel):
    """ Schema for scanning a new exercise. """
    exercise_image: UploadFile = Field(...,
                                       description="Image of the exercise")


class TargetMuscle(BaseModel):
    """ Schema for a target muscle group. """
    name: str = Field(..., description="Latijnse naam van de spiergroep")
    main: bool = Field(...,
                       description="Geeft aan of dit de primaire spiergroep is")


class PostExerciseResponse(BaseModel):
    """ Schema for the response of scanning a new exercise.
    """
    equipment_tag: str = Field(
        ..., description="Exacte tag van het apparaat (bv: lat_pulldown, seated_row, bench_press, chest_press, of unknown)")
    display_name: str = Field(..., description="Nette naam van het apparaat")
    target_muscles: list[TargetMuscle] = Field(...,
                                               description="Lijst van target spiergroepen")
    instructions: list[str] = Field(...,
                                    description="Lijst van instructies voor de oefening")
    difficulty: int = Field(...,
                            description="Moeilijkheidsgraad van de oefening (0-100)")
    suggested_sets_reps: str = Field(...,
                                     description="Standaard effectieve fitnessrichtlijn voor hypertrofie/spiergroei")
    suggested_rest_seconds: int = Field(...,
                                        description="Aanbevolen aantal seconden rust tussen de sets")
    mechanics: str = Field(...,
                           description="Type beweging: 'compound' of 'isolation'")
    force_type: str = Field(..., description="Krachttype: 'push' of 'pull'")
    equipment_type: str = Field(
        ..., description="Type materiaal, bijv: 'cable', 'machine', 'barbell', 'dumbbell'")

    model_config = ConfigDict(
        extra="forbid",
        json_schema_extra={
            "example": {
                "equipment_tag": "lat_pulldown",
                "display_name": "Cable Lat Pulldown",
                "target_muscles": [
                    {"name": "Latissimus dorsi", "main": True},
                    {"name": "Pectoralis major", "main": True},
                    {"name": "Biceps brachii", "main": False}
                ],
                "instructions": [
                    "Ga op het apparaat zitten en plaats je knieën onder de kussens.",
                    "Pak de stang vast met een brede grip, handpalmen naar voren gericht.",
                    "Trek de stang naar beneden tot aan je borst terwijl je je ellebogen naar beneden en achteren brengt.",
                    "Laat de stang gecontroleerd terug omhoog gaan naar de startpositie."
                ],
                "difficulty": 35,
                "suggested_sets_reps": "3 x 8 - 12",
                "suggested_rest_seconds": 90,
                "mechanics": "compound",
                "force_type": "pull",
                "equipment_type": "machine"
            }
        }
    )
