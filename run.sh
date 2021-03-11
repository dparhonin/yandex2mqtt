#!/bin/bash

# RUN yandex2mqtt
DEBUG="y2m.*" pm2-runtime start npm -- start
