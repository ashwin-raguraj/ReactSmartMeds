from django.contrib import admin

from .models import User, FoodDataTest, Review,Restaurant

# Register your models here.
admin.site.register(User)
admin.site.register(FoodDataTest)
admin.site.register(Review)
admin.site.register(Restaurant)