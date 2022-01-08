import paho.mqtt.client as mqttClient
import time
import requests
import sys
import json
import os
from playsound import playsound
from picamera import PiCamera

camera = PiCamera()
  
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected
        Connected = True
    else:
        print("Connection failed")

def on_message(client, userdata, message):
    payload = json.loads(message.payload.decode("utf-8"))
    if len(payload["event"]) == 0:
        return
    print ("Message received: "  + str(message.payload))
    uploadImage()
    playsound('/home/pi/bell/bell.wav')
    sys.stdout.flush()

Connected = False
broker_address= "127.0.0.1"
port = 1883
user = "bell"
password = os.environ["BELL_PASSWORD"]

client = mqttClient.Client("CameraClient")
client.username_pw_set(user, password=password)
client.on_connect= on_connect
client.on_message= on_message

client.connect(broker_address, port=port)

client.loop_start()

while Connected != True:
    time.sleep(0.1)

client.subscribe("shellies/bell/input_event/0")


def uploadImage():
    url = requests.get(os.environ["APIGATEWAY_ENDPOINT"] + "/url")
    camera.capture('/tmp/capture.jpg')
    print('Captured image. Uploading...')
    with open('/tmp/capture.jpg', 'rb') as f:
        http_response = requests.put(url.text, data=f.read())
        print('Done!')


try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print ("exiting")
    client.disconnect()
    client.loop_stop()