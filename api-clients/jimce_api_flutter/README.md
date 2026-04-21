# Jimce Music API Client (Flutter)

Generated Flutter client for the Jimce backend API.

## Quick start

```dart
import 'package:jimce_api_flutter/jimce_api_flutter.dart';

final apiClient = JimceApiFlutter(
  basePathOverride: 'http://localhost:8080',
);

final api = apiClient.getDefaultApi();
```

Use `api` to call generated endpoint methods.

## Regenerate in this repository

Run from repository root:

```bash
bun run ci:gen-openapi-json
bun run ci:gen-flutter-api-client
cd api-clients/jimce_api_flutter
dart run build_runner build --delete-conflicting-outputs
```

Generated code is placed in `lib/src` and exported via `lib/jimce_api_flutter.dart`.

## Versioning

Published versions are commit-aware:

`1.0.0-{branch}.{short_sha}`

This allows pinning a client version to a specific backend state.
