""" Gemini-3-FLASH content generation example. """
import io
import uuid
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

            img = ImageOps.fit(
                img, (300, 300), method=Image.Resampling.LANCZOS)

            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGB")

        return img

    def get_exercise_info(self, image_file: Image.Image):
        """ Get exercise information from an image using Gemini. """
        prompt = """
        Je bent een AI fitness-expert die gespecialiseerd is in het herkennen van fitnessapparatuur.
        Analyseer de foto en geef ALTIJD een JSON-object terug met de volgende structuur:

        {
        "equipment_tag": "string (kies exact uit: lat_pulldown, seated_row, bench_press, chest_press, of unknown)",
        "display_name": "string (de nette naam van het apparaat, bijv. 'Cable Lat Pulldown')",
        "target_muscles": ["string", "string"], (lijst met de Latijnse anatomische namen van de primaire spiergroepen die getraind worden, bijv. 'Latissimus dorsi', 'Pectoralis major', 'Biceps brachii')
        "instructions": ["string", "string"] (een stappenplan/lijst met korte, duidelijke instructies in het Nederlands hoe je de oefening uitvoert)
        }

        Als het apparaat niet herkend wordt, zet 'equipment_tag' op 'unknown', 'display_name' op 'Onbekend apparaat' en laat de lijsten leeg.
        Geef GEEN extra tekst, introductie of markdown-blokken terug. Alleen pure JSON.
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
