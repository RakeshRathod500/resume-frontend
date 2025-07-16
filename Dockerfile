# Stage 1: Build Angular app
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx ng build resume-builder-frontend --configuration production

# Stage 2: Serve with Nginx

FROM nginx:alpine
COPY --from=builder /app/dist/resume-builder-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
