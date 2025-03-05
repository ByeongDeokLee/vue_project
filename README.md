# vue_project

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

Vue3에 대해
setUp함수

- Composition API에서 컴포넌트의 로직을 정의하는 함수
- 메서드 정의할때 setup함수에서는 내부에 함수 선언가능
- 모든 로직이 setup() 안에 모임(data, methods, computed 등)

pinia 설치 (posts 데이터 관리 가능한 라이브러리)
npm install pinia

Options API
코드 구조 : data, methods 등 옵션별로 나눠짐
가독성 : 코드가 길어지고 분산됨
재사용성 : Mixin을 사용해야 함
성능 : 기존 방식
Vue 버전 : Vue 2 기본

Compostion API
코드 구조 : setup() 안에서 한 번에 정의
가독성 : 로직을 하나로 묶어 가독성 증가
재사용성 : Composition Function으로 재사용 가능
성능 : 가벼운 코드 실행 & 성능 최적화
Vue 버전 : Vue 3 기본
