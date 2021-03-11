ARG BUILD_FROM=homeassistant/amd64-base:latest
FROM $BUILD_FROM
# Add env
ENV LANG C.UTF-8

RUN apk add --update --no-cache curl jq nodejs npm && \
  cd / && \
  npm install --unsafe-perm -g pm2 && \
  npm install --unsafe-perm
  
WORKDIR /y2m

COPY run.sh /y2m/
COPY *.js /y2m/
COPY *.json /y2m/
COPY auth/* /y2m/auth/
COPY db/* /y2m/db/
COPY routes/* /y2m/routes/
COPY utils/* /y2m/utils/
COPY views/* /y2m/views/

# Setup all NodeJS dependencies from package.json
RUN npm install
RUN dos2unix run.sh

RUN ["chmod", "a+x", "/y2m/run.sh"]
CMD [ "./run.sh" ]