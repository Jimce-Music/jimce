# Jimce Music API client (Flutter version)

This package contains the generated Flutter API client for the Jimce server.

## Versioning strategy

This package follows the same commit-aware strategy as the TypeScript client.
The publish workflow sets a unique version for every commit:

`1.0.0-{branch}.{short_sha}`

This lets app developers pin exactly the API client that matches a backend
commit or branch state.

## Regenerating the client in this repository

From the repository root:

```bash
bun run ci:gen-openapi-json
bun run ci:gen-flutter-api-client
cd api-clients/jimce_api_flutter
dart run build_runner build --delete-conflicting-outputs
```

Generated sources are written to `lib/src` and exported through
`lib/jimce_api_flutter.dart`, matching package import
paths used by the generated code.

## Package usage

```dart
import 'package:jimce_api_flutter/jimce_api_flutter.dart';

final apiClient = ApiClient(
	basePath: 'https://localhost:8080',
);

final authApi = AuthApi(apiClient);
```

Depending on OpenAPI generator output, API class names can vary slightly.

For CI publishing, set `PUB_DEV_PUBLISH_ACCESS_TOKEN` in your workflow
environment.
