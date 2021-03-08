#!/bin/bash

# RUN yandex2mqtt
YANDEX2MQTT_DATA="." DEBUG="y2m.*" pm2-runtime start npm -- start
