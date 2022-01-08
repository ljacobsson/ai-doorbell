from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import time
import requests
from playsound import playsound
import sys
import os

myMQTTClient = AWSIoTMQTTClient("BellClient")
myMQTTClient.configureEndpoint(os.environ["AWSIoTEndpoint"], 8883)
myMQTTClient.configureCredentials("/certs/ca.pem", "/certs/private.pem.key", "/certs/certificate.pem.crt")
myMQTTClient.configureOfflinePublishQueueing(-1) 
myMQTTClient.configureDrainingFrequency(2)  
myMQTTClient.configureConnectDisconnectTimeout(10)
myMQTTClient.configureMQTTOperationTimeout(5) 

def callback(client, userdata, message):
    print (message.payload)
    sys.stdout.flush()

    doc = requests.get(message.payload)
    with open('/tmp/speech.mp3', 'wb') as f:
        f.write(doc.content)
    playsound('/tmp/speech.mp3')

print("Trying to connect")

myMQTTClient.connect()
myMQTTClient.subscribe("bell/voice", 1, callback)
print("Connected")
sys.stdout.flush()
while True:
    time.sleep(0.1)
