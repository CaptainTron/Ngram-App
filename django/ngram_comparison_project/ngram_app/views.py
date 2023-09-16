# ngram_comparison_app/views.py
from django.http import JsonResponse
from .ngram_comparison import compare_ngrams

def ngram_api(request):
    if request.method == 'GET':
        s1 = request.GET.get('string1', '')
        s2 = request.GET.get('string2', '')
        n = int(request.GET.get('n', 2))
        value = compare_ngrams(s1, s2, n)
        return JsonResponse({'value': value})
