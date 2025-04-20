import openai
from dotenv import load_dotenv
import os
import asyncio

# Specify the path to the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), "../../../.env")
load_dotenv(dotenv_path=dotenv_path)

# Load the API key
openai.api_key = os.getenv("OPENAI_API_KEY")
print(f"Loaded API Key: {openai.api_key}")  # Debugging log

response_cache = {}

async def generate_response(message: str) -> str:
    """
    Generates a response from the OpenAI GPT-4 model based on the user's input message.

    Args:
        message (str): The user's input message.

    Returns:
        str: The chatbot's response.
    """
    print(f"API call for message: {message}")  # Log each API call
    if message in response_cache:
        print("Returning cached response.")
        return response_cache[message]

    retries = 3  # Number of retries
    delay = 2  # Initial delay in seconds

    for attempt in range(retries):
        try:
            print(f"Attempt {attempt + 1}: Generating response for message: {message}")
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",  # Use gpt-3.5-turbo if gpt-4 is unavailable
                messages=[
                    {"role": "system", "content": "You are a supportive mental health assistant."},
                    {"role": "user", "content": message}
                ]
            )
            bot_reply = response['choices'][0]['message']['content']
            print(f"Extracted bot reply: {bot_reply}")  # Debugging log
            response_cache[message] = bot_reply  # Cache the response
            return bot_reply
        except openai.error.RateLimitError:
            print(f"Rate limit exceeded. Retrying in {delay} seconds...")
            await asyncio.sleep(delay)
            delay *= 2  # Double the delay for the next retry
        except openai.error.AuthenticationError:
            print("Authentication error: Invalid API key.")
            return "Authentication error: Please check your API key."
        except openai.error.OpenAIError as e:
            if "quota" in str(e).lower():
                print("Quota exceeded error: Please check your OpenAI plan and billing details.")
                return "I'm sorry, I cannot process your request right now because the service quota has been exceeded. Please try again later."
            if "does not exist" in str(e) or "you do not have access" in str(e):
                print(f"Model error: {e}")
                return "The requested model is not available. Please contact support or try a different model."
            print(f"OpenAI API error: {e}")  # Log the exact error
            return f"An OpenAI error occurred: {e}"
        except Exception as e:
            print(f"Unexpected error: {e}")  # Log the exact error
            return "An unexpected error occurred while processing your request."

    # Fallback response after all retries fail
    print("All retries failed. Returning fallback response.")
    return "I'm sorry, I couldn't process your request at the moment. Please try again later."
