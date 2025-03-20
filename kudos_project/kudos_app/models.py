from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
# import datetime

class Organization(models.Model):
    name = models.CharField(max_length=255)

class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, blank=True)
    kudos_remaining = models.PositiveIntegerField(default=3)
    last_kudos_reset = models.DateField(default=timezone.now)

    def reset_kudos_if_needed(self):
        current_week = timezone.now().date().isocalendar()[1]
        last_reset_week = self.last_kudos_reset.isocalendar()[1]
        
        if current_week != last_reset_week:
            self.kudos_remaining = 3
            self.last_kudos_reset = timezone.now().date()
            self.save()

class Kudo(models.Model):
    sender = models.ForeignKey(User, related_name='sent_kudos', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_kudos', on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)