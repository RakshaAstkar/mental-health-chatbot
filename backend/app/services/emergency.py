import os
from twilio.rest import Client

# Crisis detection function
async def check_crisis(user_input: str):
    crisis_keywords = ["suicide", "help", "hurt", "emergency", "crisis"]
    if any(keyword in user_input.lower() for keyword in crisis_keywords):
        send_emergency_alert(user_input)
        return True
    return False

# Function to send emergency SMS
def send_emergency_alert(user_input: str):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=f"Emergency alert: {user_input}",
        from_="your_twilio_number",
        to="emergency_contact_number"
    )
    return message.sid
