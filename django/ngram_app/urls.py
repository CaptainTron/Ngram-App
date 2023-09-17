from django.urls import path
from .views import ngram_api

urlpatterns = [
    path('cngrams/', ngram_api, name='ngram_api'),
]
