FROM node:12-alpine3.14
RUN npm install -g serve
COPY build /wwwroot
EXPOSE 8080
CMD [ "serve", "-s", "-n", "-p" , "8080" ,"wwwroot" ]