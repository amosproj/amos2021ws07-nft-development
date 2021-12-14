FROM node:16.13.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./package-lock.json ./
RUN npm ci --silent

ARG REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT
ARG REACT_APP_PROJECT=$REACT_APP_PROJECT
ARG REACT_APP_DOMAIN=$REACT_APP_DOMAIN

RUN npm install react-scripts@4.0.3 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
