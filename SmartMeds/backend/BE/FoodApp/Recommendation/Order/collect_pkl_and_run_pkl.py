import pickle
import numpy as np
from pandas.core.indexes.numeric import NumericIndex



# Define the Get_Recommendations function
def Get_Recommendations(food_id_list):


        # Load the trained objects
    with open('FoodApp/Recommendation/Order/tfidf.pkl', 'rb') as file:
        tfidf = pickle.load(file)
    with open('FoodApp/Recommendation/Order/count.pkl', 'rb') as file:
        count = pickle.load(file)
    with open('FoodApp/Recommendation/Order/recommender.pkl', 'rb') as file:
        recommender = pickle.load(file)

    # Load the matrices
    with open('FoodApp/Recommendation/Order/tfidf_matrix.pkl', 'rb') as file:
        tfidf_matrix = pickle.load(file)
    with open('FoodApp/Recommendation/Order/count_matrix.pkl', 'rb') as file:
        count_matrix = pickle.load(file)
    with open('FoodApp/Recommendation/Order/rating_matrix.pkl', 'rb') as file:
        rating_matrix = pickle.load(file)
    # The implementation of the function goes here
    recommended_food_ids = []
    
    for idx, food_id in enumerate(food_id_list):
        try:
            user_index = np.where(rating_matrix.index == int(food_id))[0][0]
            user_ratings = rating_matrix.iloc[user_index]

            reshaped = user_ratings.values.reshape(1, -1)
            distances, indices = recommender.kneighbors(reshaped, n_neighbors=10)

            nearest_neighbors_indices = rating_matrix.iloc[indices[0]].index[1:]

            recommended_food_ids_per_id = nearest_neighbors_indices.tolist()
            recommended_food_ids_per_id = [id for id in recommended_food_ids_per_id if id not in food_id_list]

            if idx == 0:
                recommended_food_ids += recommended_food_ids_per_id[:4]
            else:
                recommended_food_ids += recommended_food_ids_per_id[:3]

        except IndexError:
            print(f"Food ID {food_id} not found in rating matrix.")

    remaining_recommendations = 10 - len(recommended_food_ids)
    if remaining_recommendations > 0:
        reshaped = rating_matrix.iloc[user_index].values.reshape(1, -1)
        distances, indices = recommender.kneighbors(reshaped, n_neighbors=remaining_recommendations)

        nearest_neighbors_indices = rating_matrix.iloc[indices[0]].index[1:]

        additional_recommendations = nearest_neighbors_indices.tolist()
        additional_recommendations = [id for id in additional_recommendations if id not in recommended_food_ids]

        recommended_food_ids += additional_recommendations[:remaining_recommendations]

    if len(recommended_food_ids) < 10:
        reshaped = rating_matrix.iloc[user_index].values.reshape(1, -1)
        distances, indices = recommender.kneighbors(reshaped, n_neighbors=10)

        nearest_neighbors_indices = rating_matrix.iloc[indices[0]].index[1:]

        additional_recommendations = nearest_neighbors_indices.tolist()
        additional_recommendations = [id for id in additional_recommendations if id not in recommended_food_ids]

        recommended_food_ids += additional_recommendations[:10 - len(recommended_food_ids)]

    return recommended_food_ids[:10]

    pass

# Make recommendations
'''food_id_list = [11, 29, 7]
recommended_food_ids = Get_Recommendations(food_id_list)
print(recommended_food_ids)'''