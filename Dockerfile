FROM node:18-alpine

USER node

WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY --chown=node:node package*.json ./

# Устанавливаем зависимости
RUN npm install

# Если вы хотите установить nodemon для разработки, можно раскомментировать следующую строку
# RUN npm install -g nodemon

# Копируем остальные файлы приложения
COPY --chown=node:node . .

# Ваше приложение слушает порт 9000
EXPOSE 9000

CMD [ "npm", "start" ]