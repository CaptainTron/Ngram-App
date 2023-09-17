import nltk
nltk.download('punkt')
from nltk.util import ngrams

def compare_ngrams(s1, s2, n=2):
    t1 = nltk.word_tokenize(s1)
    t2 = nltk.word_tokenize(s2)
    n1 = list(ngrams(t1, n)) 
    n2 = list(ngrams(t2, n))
    intersection = len(set(n1).intersection(n2))
    union = len(set(n1).union(n2))
    similarity = intersection / union if union != 0 else 0
    return similarity
