""" Gemini-3-FLASH content generation example. """
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
import os
import json

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_image(image_path):
    """ Load an image from a file path. """
    return Image.open(image_path)


PROMPT = """
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

response = client.models.generate_content(
    model='gemini-3.5-flash',
    contents=[get_image(os.path.join(BASE_DIR, "assets", "bench_press_a.jpeg")),
              "Welk apparaat is dit?"],
    config=types.GenerateContentConfig(
        system_instruction=PROMPT,
        temperature=0.0
    )
)

print(json.loads(response.text))
