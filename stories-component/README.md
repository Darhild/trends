# stories-component

React компонент для отображения сториз как в инстаграме

## Установка

`npm i путь_до_папки`

## Подключение

```js
import 'stories-component/dist/styles.css';
import StoriesComponent from 'stories-component'

const MyAwesomeReactApp = () => {
  return (
    <StoriesComponent ... />
  )
}
```

## Параметры

**user** (User | null, required) - текущий пользователь  

**canAdd** (boolean, required) — возможность добавления истории  

**subject** (string, optional) — фильтрация по тематикам  

**blogger** (string, optional) — фильтрация по блоггерам
