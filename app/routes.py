from flask import Flask, jsonify, render_template, request
import pandas as pd
import os
import joblib

app = Flask(__name__, static_folder="static")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/recommendation")
def recommendation():
    return render_template("trek-recommendation.html")


@app.route("/visualization")
def visualization():
    return trek_duration()


model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "model.pkl")
model = joblib.load(model_path)

# @app.route("/")
# def form():
#     return render_template("trek-recommendation.html")


@app.route("/predict", methods=["POST"])
def predict():
    age = int(request.form["age"])
    fitness_level = int(request.form["fitnessLevel"])
    health_incidents = int(request.form["healthIncidents"])
    guide_required = int(request.form["guideRequired"])
    trek_group_size = int(request.form["trekGroupSize"])
    cluster = int(request.form["trek"])

    new_input = pd.DataFrame(
        {
            "Age": [age],
            "Fitness Level": [fitness_level],
            "Health Incidents": [health_incidents],
            "Guide/No Guide": [guide_required],
            "Trekking Group Size": [trek_group_size],
            "Cluster": [cluster],
        }
    )

    prediction = model.predict(new_input)

    recommendation = "Yes" if prediction[0] == 1 else "No"

    return jsonify({"recommendation": recommendation})


log_model_path = os.path.join(
    os.path.dirname(os.path.dirname(__file__)), "logistic_model.pkl"
)
log_model = joblib.load(model_path)


df = pd.read_csv("EDA/cleaned_dataset.csv")


@app.route("/trek-duration")
def trek_duration():
    time_data = df["Time"].tolist()
    return render_template("visualization.html", time_data=time_data)


@app.route("/trek-data")
def trek_data():
    cluster_data = df["Cluster"].tolist()
    trek_frequency = {}
    for cluster in cluster_data:
        if cluster in trek_frequency:
            trek_frequency[cluster] += 1
        else:
            trek_frequency[cluster] = 1

    return jsonify(
        {
            "trek": list(trek_frequency.keys()),
            "frequency": list(trek_frequency.values()),
        }
    )


@app.route("/doughnutChart")
def doughnutChart():
    purpose_of_travel = df["Purpose of Travel"].tolist()
    travel_purpose_counts = {}
    for purpose in purpose_of_travel:
        if purpose in travel_purpose_counts:
            travel_purpose_counts[purpose] += 1
        else:
            travel_purpose_counts[purpose] = 1

    response = {
        "labels": list(travel_purpose_counts.keys()),
        "frequencies": list(travel_purpose_counts.values()),
    }

    print(response)
    return jsonify(response)
