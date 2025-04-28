FROM openjdk:17-jdk-slim AS backend-build
WORKDIR /app
COPY Java/VIA-Tabloid/target/VIA-Tabloid-0.0.1-SNAPSHOT.jar /app/viatabloid-backend.jar

FROM node:16 AS frontend-build
WORKDIR /frontend
COPY ./Frontend/viatab/ ./
RUN npm install --legacy-peer-deps
RUN npm run build
RUN ls -l /frontend

FROM nginx:latest
WORKDIR /app
COPY --from=frontend-build /frontend/build /usr/share/nginx/html
COPY --from=backend-build /app/viatabloid-backend.jar /app/viatabloid-backend.jar
EXPOSE 80 8080
CMD ["sh", "-c", "java -jar /app/viatabloid-backend.jar & nginx -g 'daemon off;'"]
