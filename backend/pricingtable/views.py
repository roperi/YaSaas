# views.py
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.conf import settings


@login_required
def redirect_view(request):
    user_id = request.user.id
    redirection_url = f'{settings.CUSTOM_SIGNUP_REDIRECT_URL}{user_id}'

    return redirect(redirection_url)
