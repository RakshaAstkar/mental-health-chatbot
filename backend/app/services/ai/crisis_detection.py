def detect_crisis(text: str) -> bool:
    keywords = ["suicide", "kill myself", "end it", "hurt myself", "no reason to live"]
    return any(keyword in text.lower() for keyword in keywords)
