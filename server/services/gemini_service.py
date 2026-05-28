""" Gemini-3-FLASH content generation example. """
import io
from io import BytesIO
from pathlib import Path
from dotenv import load_dotenv
from PIL import Image, ImageOps
from google import genai
from google.genai import types
from PIL import Image
import os
import json
import io

SCAN_PIC_DIR = Path("media/exercise_pics")


class GeminiService:
    """ Service for interacting with Gemini API. """

    def __init__(self):
        load_dotenv()
        self.client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
        self.base_dir = os.path.dirname(os.path.abspath(__file__))

    def get_image(self, image_path):
        """ Load an image from a file path. """
        return Image.open(io.BytesIO(image_path))

    def process_exercise_image(self, content: bytes) -> str:
        """ Process the uploaded exercise imag and returns the filename. """
        # https://github.com/CoreyMSchafer/FastAPI-12-File-Uploads/blob/2e29f868ad12cf046c7fa7c526cbf3cf8ca40532/image_utils.py#L10
        # https://stackoverflow.com/questions/8577137/how-can-i-create-a-tmp-file-in-python
        # ? Opslaan als bestand verwijderd.
        with Image.open(BytesIO(content)) as original:
            img = ImageOps.exif_transpose(original)

            img.thumbnail((1024, 1024), Image.Resampling.LANCZOS)

            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGB")

        return img

    def get_exercise_info(self, image_file: Image.Image):
        """ Get exercise information from an image using Gemini. """
        prompt = """
        Je bent een AI fitness-expert en een JSON-generator die gespecialiseerd is in het herkennen van fitnessapparatuur op basis van afbeeldingen.

        ### INSTRUCTIE:
        Analyseer de foto en identificeer het specifieke fitnessapparaat of de fitness-oefening. Vul de JSON-velden strikt in volgens de onderstaande regels.

        ### MAP-REGELS VOOR 'equipment_tag':
        Je mag 'equipment_tag' ALLEEN vullen met een van de volgende exacte pre-defined hoofd-tags. Grote variaties binnen dezelfde categorie moeten onder dezelfde hoofd-tag worden geschaard:
        - 'bench_press' (Inclusief vlakke/incline/decline fitnessbanken, olympische bench press racks, barbells en dumbbells voor borsttrainingen)
        - 'chest_press' (Inclusief zittende chest press machines, iso-lateral of diverging)
        - 'lat_pulldown' (Inclusief wide-grip, close-grip en single-arm lat pulldowns)
        - 'seated_row' (Inclusief machine rows, cable rows, iso-lateral/diverging rows)
        - 'shoulder_press' (Inclusief overhead press met barbell, dumbbells of machine)
        - 'leg_press' (Inclusief 45-degree sled leg press, horizontal leg press)
        - 'leg_extension' (Leg extension machines voor de quadriceps)
        - 'leg_curl' (Seated of lying leg curl machines voor de hamstrings)
        - 'bicep_curl' (Inclusief preacher curl, cable curl, dumbbell curl)
        - 'tricep_extension' (Inclusief tricep pushdowns, overhead extensions)

        ### JSON FORMAT:
        Gever ALTIJD een valide JSON-object terug met exact deze structuur:
        {
        "equipment_tag": "string (kies strict uit de hoofd-tags hierboven óf 'unknown')",
        "display_name": "string (de nette, specifieke universele naam van het apparaat of de oefening in het Engels, ZONDER merknaam of modelnummer. Wees zo specifiek mogelijk over de variant, bijv: 'Diverging Seated Row', 'Adjustable Fitness Bench', of 'Hip Adductor Machine'. Als het geen fitness-gerelateerd object is, gebruik dan 'Onbekend apparaat')",
        "target_muscles": [
            {
            "name": "string (de Latijnse anatomische naam van de spier, bijv. 'Latissimus dorsi', 'Pectoralis major', 'Gluteus medius')",
            "main": "boolean (Zet dit op true voor de primaire doelspieren van de oefening, en op false voor secundaire/assisterende spiergroepen)"
            }
        ],
        "instructions": ["string", "string"] (een stappenplan met korte, duidelijke instructies in het Nederlands hoe je deze specifieke oefening uitvoert),
        "difficulty": "number (een score van 1 tot 100 die de technische moeilijkheidsgraad/leercurve van de oefening aangeeft)",
        "suggested_sets_reps": "string (een standaard effectieve fitnessrichtlijn voor hypertrofie, bijv. '3 x 8 - 12')",
        "suggested_rest_seconds": "number (aanbevolen aantal seconden rust tussen sets, bijv. 60, 90 of 120)",
        "mechanics": "string (kies exact uit: 'compound' of 'isolation', of '' als het onbekend is)",
        "force_type": "string (kies exact uit: 'push' of 'pull', of '' als het onbekend is)",
        "equipment_type": "string (kies exact uit: 'cable', 'machine', 'barbell', 'dumbbell', 'bodyweight', of '' als het onbekend is)"
        }
        ### STRIKTE AFHANDELING BIJ STRUCTUUR EN EDGE-CASES:
        1. Gecategoriseerde apparaten: Als het apparaat onder een hoofd-tag valt (bijv. 'seated_row'), moet de 'equipment_tag' EXACT de hoofd-tag zijn (dus 'seated_row'), maar moet de 'display_name' de specifieke variant accuraat beschrijven (bijv. 'Diverging Seated Row') ZONDER merknaam. Kijk goed naar stickers of tekst op het apparaat!
        2. Apparaten buiten de lijst (Gym-apparatuur zoals Hip Adductor, Buikspierbank, Squat rack):
           -> 'equipment_tag': 'unknown'
           -> 'display_name': De specifieke universele naam (bijv. 'Hip Adductor Machine')
           -> Vul ALLE overige velden wél zo accuraat mogelijk in.
        3. Geen fitnessobject (Katten, eten, user interfaces):
           -> 'equipment_tag': 'unknown'
           -> 'display_name': 'Onbekend apparaat'
           -> Laat alle lijsten leeg ([]) en strings leeg ("") en nummers op 0.

        ### REFERENCE EXAMPLE FOR SPECIFIC VARIANTS:
        Als je een specifieke variant ziet, map je deze zo (let op hoe de tag algemeen is, maar display_name specifiek):
        {
          "equipment_tag": "seated_row",
          "display_name": "Diverging Seated Row",
          "target_muscles": [
            {"name": "Latissimus dorsi", "main": true},
            {"name": "Rhomboids", "main": true},
            {"name": "Trapezius", "main": false},
            {"name": "Biceps brachii", "main": false}
          ],
          "instructions": ["Stel het zitje in zodat de handgrepen op borsthoogte zitten.", "Houd je borst tegen het kussen en trek de handgrepen naar je toe.", "Knijp je schouderbladen samen en breng het gewicht gecontroleerd terug."],
          "difficulty": 35,
          "suggested_sets_reps": "3 x 8 - 12",
          "suggested_rest_seconds": 90,
          "mechanics": "compound",
          "force_type": "pull",
          "equipment_type": "machine"
        }
        """

        response = self.client.models.generate_content(
            model='gemini-3.1-flash-lite',
            contents=[image_file,
                      "Welk apparaat is dit?"],
            config=types.GenerateContentConfig(
                system_instruction=prompt,
                temperature=0.0,
                response_mime_type="application/json"
            )
        )

        return json.loads(response.text)
