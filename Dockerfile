
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .


FROM node:lts-alpine AS production

WORKDIR /app

COPY --from=build /app ./

EXPOSE 5000

CMD ["npm", "start"]