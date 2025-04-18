import speech_recognition as sr
import pyttsx3

# Speech-to-Text
async def handle_speech_input(audio_data: str):
    recognizer = sr.Recognizer()
    audio = sr.AudioData(audio_data, 16000, 2)
    try:
        text = recognizer.recognize_google(audio)
        return text
    except Exception as e:
        return f"Error recognizing speech: {str(e)}"

# Text-to-Speech
async def handle_speech_output(text: str):
    engine = pyttsx3.init()
    engine.say(text)
    engine.save_to_file(text, "response.mp3")
    return "response.mp3"  # Return the file path or URL
