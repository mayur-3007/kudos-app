from rest_framework import permissions

class IsAdminOrSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin or superuser
        return request.user and (request.user.is_staff or request.user.is_superuser)