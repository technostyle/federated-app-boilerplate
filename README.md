# Запуск проекта для разработки
```yarn```

```yarn start```
# Тестирование интеграции moduleFederation
1) Запустить фронт-сервер

```yarn serve```

2) Запустить потебитель фронт-сервера 

```yarn consume```

3) Открыть потребитель сервиса на http://localhost:3001/

# Удобное тестирование интеграции moduleFederation (в разработке)
1) Запустить скрипты

```yarn federate```

2) Открыть потребитель сервиса на http://localhost:3001/

# Изменение порта сервера демона
1) в package.json заменить в config `port` и `widget_host`
2) в consumer/index.html заменить MICRO_FRONTEND_HOST
