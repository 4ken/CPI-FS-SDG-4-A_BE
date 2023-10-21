# Stage 1: Build the application
FROM node:18.18.2-alpine AS builder
WORKDIR /usr/src
COPY . .
RUN npm install

# Define build-time arguments
ARG DB_URI
ARG JWT_SECRET
ARG ALLOWED_ORIGINS

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV DB_URI=$DB_URI
ENV JWT_SECRET=$JWT_SECRET
ENV ALLOWED_ORIGINS=$ALLOWED_ORIGINS

RUN npm run build

# Stage 2: Create the final image
FROM node:18.18.2-alpine
WORKDIR /root
COPY --from=builder /usr/src/dist .

EXPOSE 8080
CMD ["node", "api.bundle.cjs"]