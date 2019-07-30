# yandex2mqtt
Мост из Яндекс УД в MQTT на Node.js 

Поддержать автора https://www.tinkoff.ru/sl/81l76nCPnL1

## Установка

Настраиваем репозиторий Node JS

curl -sL https://deb.nodesource.com/setup_10.x | bash -

Устанавливаем необходимые компоненты

apt-get install -y nodejs git make g++ gcc build-essential

Копируем файлы

git clone https://github.com/munrexio/yandex2mqtt /opt/yandex2mqtt

Заходим в директорию и запускаем установку

cd /opt/yandex2mqtt

npm install

Запускаем мост  (Перед запуском мост нужно настроить)

npm start

## Настройка

Для работы моста необходим валидный ssl сертификат. Если нет своего домена и белого IP адреса можно воспользоваться Dynamic DNS  сервисами. (на пример noip.com). Для получения сертификата можно воспользоваться приложением certbot. 

Все основные настройки моста прописываются в файл config.js. Перед запуском обязательно отредактируйте настройки. 


1) MQTT: Прописываем параметры своего MQTT сервера.

2) https: укажите путь к корневому SSL сертификату и файлу с ключами, порт по которому будет доступен плагин.

3) clients: Укажите произвольные параметры клиента. (Будет нужно для настройки навыка в Яндексе)

4) users: Укажите параметры пользователей для доступа к мосту.

5) devices: Укажите необходимые девайсы и топики MQTT для управления. (TODO: Подробнее описать настройку девайсов)

## Создание навыка

Заходим на https://dialogs.yandex.ru/developer/skills => Создать диалог => Умный дом

Название: Любое

Endpoint URL: https://вашдомен/provider

Ставим галку "Не показывать в каталоге"

Имя разработчика: Ваше имя

Нажимаем "Добавить новую" связку

Название: Любое

Идентификатор  и секрет : берем из конфигурации моста "clients".

URL авторизации: https://вашдомен/dialog/authorize

URL для получения токена: https://вашдомен/oauth/token

Сохраняем связку и выбираем её в навыке. Выбираем иконку, пишем описание, нажимаем "Сохранить". 

Дальше жмём "На модерацию" и сразу "Опубликовать". Готово. 

Навык появится в приложении Яндекс в разделе "Устройства" => умный дом. 

TODO: Пошаговая инструкция.
