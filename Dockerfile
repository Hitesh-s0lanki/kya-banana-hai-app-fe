# stage 1: install & build
FROM node AS builder
WORKDIR /app

# only package files first (cache deps)
COPY package*.json ./
COPY prisma ./prisma
RUN npm i

# copy source & build
COPY . .
# if you didn’t create .env.local above, uncomment next block:
# --------------------------------------------
ARG OPENAI_API_KEY
ARG DATABASE_URL
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_S3_BUCKET_NAME
ARG NEXTAUTH_BASEPATH
ARG AUTH_TRUST_HOST
ARG AUTH_SECRET
RUN printf \
    "OPENAI_API_KEY=$OPENAI_API_KEY\n\
    DATABASE_URL=$DATABASE_URL\n\
    AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID\n\
    AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET\n\
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID\n\
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY\n\
    AWS_REGION=$AWS_REGION\n\
    AWS_S3_BUCKET_NAME=$AWS_S3_BUCKET_NAME\n\
    NEXTAUTH_BASEPATH=$NEXTAUTH_BASEPATH\n\
    AUTH_TRUST_HOST=$AUTH_TRUST_HOST\n\
    AUTH_SECRET=$AUTH_SECRET" \
    > .env.local
# --------------------------------------------
RUN npm run build

# stage 2: runtime
FROM node:latest
WORKDIR /app

# only copy what’s needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# if you created .env.local in builder, copy it:
COPY --from=builder /app/.env.local .env.local

EXPOSE 3000
CMD ["npm", "start"]
