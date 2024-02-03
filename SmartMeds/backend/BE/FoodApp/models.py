from django.db import models
import string, random

# Create your models here.

class User(models.Model):
    user_id = models.CharField(max_length=7, primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    
    class Meta:
        db_table= 'users'

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = self.generate_user_id()
        super(User, self).save(*args, **kwargs)

    def generate_user_id(self):
        # Generate a 7-digit alphanumeric ID
        alphabet = string.ascii_uppercase + string.digits
        while True:
            user_id = ''.join(random.choice(alphabet) for i in range(7))
            if not User.objects.filter(user_id=user_id).exists():
                return user_id

class FoodDataTest(models.Model):
    id = models.IntegerField(primary_key=True)
    restaurant = models.CharField(max_length=200)
    price = models.CharField(max_length=10)
    food = models.CharField(max_length=200)
    rating = models.FloatField(null=True, blank=True)
    linkImg = models.URLField(max_length=500)
    restaurantImg = models.URLField(max_length=500)

    class Meta:
        db_table='FoodTest'


class Restaurant(models.Model):

    
    restaurant_id = models.IntegerField(primary_key=True,auto_created=False)
    food_id = models.IntegerField(auto_created=False)
    food = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    veg_non = models.CharField(max_length=255)
    describe = models.TextField()
    price = models.IntegerField()
    delivery_charge = models.IntegerField()
    serving_distance = models.IntegerField()
    #OpeningTime = models.CharField(max_length=255)
    prepration_time = models.IntegerField()
    discount_percentage = models.IntegerField()
    rating = models.FloatField()
    restaurant = models.CharField(max_length=255)
    #contact = models.BigIntegerField()
    address = models.CharField(max_length=255)
    indicator = models.IntegerField()
    #DishImg = models.URLField(max_length=500)
    #restaurantImg = models.URLField(max_length=500)

    class Meta:
        db_table='RestDetails'

class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default='')
    restaurant_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE,default='')
    vendor_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    rating = models.IntegerField()
    review = models.TextField()
    class Meta:
        db_table='Review'



class Complaint(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default='')
    restaurant_id= models.ForeignKey(Restaurant, on_delete=models.CASCADE,default='')
    vendor_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    review = models.TextField()
    class Meta:
        db_table='Complaint'



class Order(models.Model):
    order_id = models.IntegerField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default='')
    restaurant_id= models.ForeignKey(Restaurant, on_delete=models.CASCADE,default='')
    food_id = models.IntegerField()
    price = models.IntegerField()
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
   

    class Meta:
        db_table='Orders'


class Cart(models.Model):
    restaurant_id= models.ForeignKey(Restaurant, on_delete=models.CASCADE,default='')
    food_id = models.IntegerField()
    price = models.IntegerField()
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
   

    class Meta:
        db_table='Cart'
