import os
from flask import Flask, request, render_template, jsonify
from chat import get_response



app = Flask(__name__)

UPLOAD_FOLDER = '/Users/ASUS/Desktop/Image Classification (FYP)'

MODEL = None


@app.get("/")
def WelcomePage():

    return render_template("home.html")

@app.route("/home")
def HomePage():

    return render_template("base.html")

@app.get("/chatbot")
def chatwithbot():

    return render_template("ChatCatto.html")


@app.route("/form")
def do_register():

    return render_template("form.html")

@app.route("/AddProduct")
def addproduct():

    return render_template("AddProduct.jsx")

@app.route("/About")
def aboutpage():

    return render_template("About.html")

@app.route("/classify")
def classifyimg():

    return render_template("classify.html")

@app.route("/Content")
def ContentPage():

    return render_template("OptionMenu.html")


@app.route("/NearbyLoc")
def nearbyLocation():

    return render_template("NearbyLoc.html")


@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # TODO: check if text is valid
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)


if __name__ == "__main__":
    app.run( debug=True, host='127.0.0.1', port=8000)