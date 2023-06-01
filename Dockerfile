FROM nginx:1.17.9-alpine

ENV API_URL ""
ENV API_PORT 8000
ENV FLOWER_PORT 5566
ENV SUPERVISOR_PORT 9001

COPY ./dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf.template
CMD /bin/sh -c "envsubst '\$API_URL,\$API_PORT,\$FLOWER_PORT,\$SUPERVISOR_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
