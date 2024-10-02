from rest_framework.routers import DefaultRouter

from .views import AssessmentViewSet

router = DefaultRouter()

router.register(r"", AssessmentViewSet, basename="assessment")

urlpatterns = router.urls
