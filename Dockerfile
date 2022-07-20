FROM node:18.6-alpine3.16 as base
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
USER node
COPY --chown=node:node package.json package-lock.json ./

FROM base as audit
RUN npm audit --audit-level critical

FROM base as build
RUN npm ci --include=dev --ignore-scripts
COPY --chown=node:node . .
RUN npm run build

FROM base as prod
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force --quiet
COPY --chown=node:node --from=build /usr/src/app/dist/ ./dist
CMD ["npm", "run", "start"]
