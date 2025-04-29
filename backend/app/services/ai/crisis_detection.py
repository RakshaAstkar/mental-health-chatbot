import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def detect_crisis(text: str) -> bool:
    """
    Detects if the given text contains crisis-related keywords.
    """
    keywords = ["suicide", "kill myself", "end it", "hurt myself", "no reason to live"]
    return any(keyword in text.lower() for keyword in keywords)

def send_crisis_alert(user_email: str, user_message: str):
    """
    Sends an email alert when a crisis is detected.
    """
    # Email configuration
    sender_email = "rakshaastkar1@gmail.com"  # Replace with your email
    sender_password = "dtakdnluikrcsbma"  # Replace with your email password
    recipient_email = "rakshaastkar@gmail.com"  # Replace with the recipient's email

    # Email content
    subject = "Crisis Alert: Immediate Attention Required"
    body = f"""
    A potential crisis has been detected from a user. Please review the details below:

    User Email: {user_email}
    Message: {user_message}

    Please take immediate action to assist the user.
    """

    # Create the email
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        # Connect to the SMTP server and send the email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:  # Replace with your SMTP server
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
            print("Crisis alert email sent successfully.")
    except Exception as e:
        print(f"Failed to send crisis alert email: {e}")
