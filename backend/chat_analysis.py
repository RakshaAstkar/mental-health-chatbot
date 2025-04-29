from textblob import TextBlob
from collections import Counter

def analyze_sentiment(messages):
    sentiments = [TextBlob(msg).sentiment.polarity for msg in messages]
    avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
    return {"average_sentiment": avg_sentiment}

def get_frequent_words(messages, top_n=5):
    words = " ".join(messages).split()
    word_counts = Counter(words)
    return word_counts.most_common(top_n)