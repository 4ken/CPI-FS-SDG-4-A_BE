FROM node:18.18.1-alpine AS builder
WORKDIR /usr/src
COPY . .
RUN npm install && ENVIRONMENT=production npm run build

FROM node:18.18.1-alpine
WORKDIR /root
COPY --from=builder /usr/src/dist .

EXPOSE 80
CMD ["node", "api.bundle.cjs"]
