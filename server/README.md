# Gesture Presenter - Hack the North 2016

Control presentations using gestures, no hardware required. The project uses a Chrome Extension that utilizes a webcam to track gestures that intern control Google Slides. 

The extension accesses the webcam and sends binary data to a python server through a websocket. The server receives the datastream, decodes it, processes the image using OpenCV, then returns the frame and the coordinates of the users hand.

### Installing

Make sure OpenCV is compiled and installed with the required Python bindings. Also make sure to insall Tornado with pip.

```
git clone https://github.com/oandrienko/gesture-presenter
cd gesture-presenter

```

To start the server:

```
python app.py
```

## Built With

* OpenCV for image processing
* Tornado for server and websocket support
* Grunt for the build process

## TODO

* Scale the funcionality to being able to control all webpages.