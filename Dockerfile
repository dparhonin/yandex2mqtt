ARG BUILD_FROM=homeassistant/amd64-base:latest
FROM $BUILD_FROM
# Add env
ENV LANG C.UTF-8

RUN apk add --update --no-cache curl jq nodejs npm \
    python2 make gcc g++ linux-headers udev git python2 && \
  cd / && \
  npm install --unsafe-perm -g pm2 && \
  npm install --unsafe-perm && \
  apk del make gcc g++ python2 linux-headers udev && \
  rm -rf docs test images scripts data docker LICENSE README.md update.sh

WORKDIR "/"
COPY run.sh /

RUN ["chmod", "a+x", "./run.sh"]
CMD [ "./run.sh" ]