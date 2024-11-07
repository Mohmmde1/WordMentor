from rest_framework.routers import DefaultRouter

from .views import WordProgressViewSet


router = DefaultRouter()

router.register(r"", WordProgressViewSet, basename="word_progress")

urlpatterns = router.urls
