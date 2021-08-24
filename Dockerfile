FROM nginx:alpine

ENV TZ=Asia/Seoul

WORKDIR /usr/share/nginx/html

COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]