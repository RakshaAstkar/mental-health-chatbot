import openai

# Replace with your actual OpenAI API key
openai.api_key = "your-openai-api-key"

try:
    # Test the API by making a simple request
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello, how are you?"}
        ]
    )
    print("API call successful!")
    print("Response:", response['choices'][0]['message']['content'])
except openai.error.AuthenticationError as e:
    print("Authentication error: Invalid API key.")
    print(f"Error details: {e}")
except openai.error.RateLimitError as e:
    print("Rate limit exceeded.")
    print(f"Error details: {e}")
except openai.error.OpenAIError as e:
    print("OpenAI API error occurred.")
    print(f"Error details: {e}")
except Exception as e:
    print("An unexpected error occurred.")
    print(f"Error details: {e}")