import paho.mqtt.client as mqttClient
import time
import requests
import sys
import os

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected
        Connected = True
    else:
        print("Connection failed")

def on_message(client, userdata, message):
    print ("Message received: "  + str(message.payload))
    requests.put(os.environ["APIGATEWAY_ENDPOINT"] + "/battery", data='{"battery": '+message.payload.decode("utf-8") +'}', headers={"Content-Type": "application/json"})
    sys.stdout.flush()

Connected = False

broker_address= "127.0.0.1"
port = 1883                
user = "bell"              
password = os.environ["BELL_PASSWORD"]   

client = mqttClient.Client("Battery")
client.username_pw_set(user, password=password)
client.on_connect= on_connect                  
client.on_message= on_message                  

client.connect(broker_address, port=port)      

client.loop_start()       

while Connected != True:  
    time.sleep(0.1)

client.subscribe("shellies/bell/sensor/battery")


try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print ("exiting")
    client.disconnect()
    client.loop_stop()
