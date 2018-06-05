# Client
- [x] React
- [x] Redux
- [x] Storybook
- [x] SASS
- [x] Flow
- [x] Circle
- [x] Docker

# Docker
Development
```bash
docker-compose up -d --build
```

Production
```bash
docker-compose -f docker-compose-prod.yml up -d --build
```


# Recommendations for testing React component

- Will the test have to duplicate exactly the application code? This will make it brittle.
- Will making assertions in the test duplicate any behavior that is already covered by (and the responsibility of) library code?
- From an outsider’s perspective, is this detail important, or is it only an internal concern? Can the effect of this internal detail be described using only the component’s public API?