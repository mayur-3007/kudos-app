from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker
from kudos_app.models import Organization

User = get_user_model()

class Command(BaseCommand):
    help = 'Load demo data into the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Create 2 organizations
        org1 = Organization.objects.create(name="Tech Corp")
        org2 = Organization.objects.create(name="Design Studio")

        # Create 3 users for each organization
        for i in range(3):
            User.objects.create_user(
                username=fake.user_name(),
                password="password",
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                organization=org1
            )

            User.objects.create_user(
                username=fake.user_name(),
                password="password",
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                organization=org2
            )

        self.stdout.write(self.style.SUCCESS('Demo data loaded successfully!'))