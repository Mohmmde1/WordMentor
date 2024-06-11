from rest_framework import permissions

from settings.models import UserProfile

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow the user who owns the profile to access the book.
    """

    def has_object_permission(self, request, view, obj):
        if type(obj) == UserProfile:
            # Check if the request user is the owner of the profile associated with the book
            return obj.user == request.user

        
        return super().has_object_permission(request, view, obj)
