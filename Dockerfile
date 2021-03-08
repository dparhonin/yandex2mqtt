ARG BUILD_FROM=homeassistant/amd64-base:latest
FROM $BUILD_FROM
# Add env
ENV LANG C.UTF-8

RUN apk add --update --no-cache curl jq nodejs npm && \
  cd / && \
  npm install --unsafe-perm -g pm2 && \
  npm install --unsafe-perm
  
RUN npm install express ejs cookie-parser errorhandler \
  express-session passport

ADD run.sh /y2m/
ADD *.js /y2m/
ADD *.json /y2m/
ADD auth/* /y2m/auth/
ADD db/* /y2m/db/
ADD routes/* /y2m/routes/
ADD utils/* /y2m/utils/
ADD views/* /y2m/views/

RUN ["chmod", "a+x", "/y2m/run.sh"]
WORKDIR /y2m
CMD [ "./run.sh" ]