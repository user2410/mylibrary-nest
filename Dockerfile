FROM node:18.15-alpine AS builder
WORKDIR /app
COPY . .
RUN npm i
