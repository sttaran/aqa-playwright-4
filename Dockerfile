FROM mcr.microsoft.com/playwright:v1.46.0-jammy

RUN mkdir playwright-tests

WORKDIR playwright-tests

ENV HTTP_CREDENTIALS_USERNAME=guest
ENV HTTP_CREDENTIALS_PASSWORD=welcome2qauto

COPY . .

RUN npm ci

CMD ["npm", "run", "test"]



