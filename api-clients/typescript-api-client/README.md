# Jimce Music API client (TypeScript version)

This package contains the bundled typescript api client for the [Jimce Music Server](https://github.com/Jimce-Music/jimce).

## Versioning strategy

We use a special versioning strategy for this package, so that our developers can use the API client for any stat and any commit.

The package version is formatted like this: `1.0.0-{branch_name}-{short_commit_sha}`. So if you'd need the API-client for the commit `7da1d42` on the `dev` branch, please install version `1.0.0-dev-7da1d42`.

Later on we might also add other stable version numbers for the final production client.

## Usage

Usage of this client is fairly simple, make sure to always install the correct version for your development state, like this:

```bash
npm i @jimce-music/jimce-api-ts@1.0.0-dev-7da1d42
```

If not already done, you might need to add this `.npmrc` to your project before the install:

```npmrc
@jimce-music:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=GH_TOKEN_HERE
```

But make sure to properly protect the tokens by adding `.npmrc` to the `.gitignore` and instead just committing a `.npmrc.example` similar to the shown one above.

Then, use this minimal typescript template to get started using the api client:

```ts
import * as api from '@jimce-music/jimce-api-ts'

// Set config
api.setConfig({
    baseUrl: 'https://localhost:8080',
    // You could also set default headers (maybe after the auth)
    headers: {
        Authorization: 'Bearer <token>'
    }
})

// Then make a request (fictional routes used here):
const { data: token } = await api.getTestJwt()

const req = await api.postApiTestOapi({
    body: {
        jobId: '123456'
    }
})
console.log(req.error)
console.log(req.data?.jobId)
```
