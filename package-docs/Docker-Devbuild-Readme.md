# Jimce Dev Build - Docker Image

This is a development build of Jimce, a local-first music server for everyone.

## ⚠️ Development Build Warning

This image contains a **development build** that may be unstable and is intended for testing and development purposes only. For production use, please use the stable release images.

## About Jimce

Jimce is a local-first music server that provides a complete music streaming solution. This Docker image contains the backend server.

## Quick Start

### Using Docker Run

```bash
docker run -p 3000:3000 ghcr.io/jimce-music/jimce-dev:latest
```

### Using Docker Compose

```yaml
version: '3.8'
services:
  jimce-dev:
    image: ghcr.io/jimce-music/jimce-dev:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./config.yml:/app/config.yml
      - ./meta.yml:/app/meta.yml
```

Then run:
```bash
docker compose up -d
```

## Configuration

The image expects configuration files to be mounted:
- `/app/config.yml` - Main configuration file
- `/app/meta.yml` - Metadata configuration file

See the [main repository](https://github.com/Jimce-Music/jimce) for configuration examples.

## Environment Variables

- `NODE_ENV` - Set to `production` for production use (default: production)

## Ports

- `3000` - Main HTTP server port

## Version Information

This image is automatically built from the repository with version format:
- `1.0.0-{branch}-{commit-sha}` - Branch-specific builds
- `latest` - Latest build from the main branch

## Links

- **Repository**: https://github.com/Jimce-Music/jimce
- **Issues**: https://github.com/Jimce-Music/jimce/issues
- **Documentation**: https://github.com/Jimce-Music/jimce/blob/main/README.md

## Support

For questions, issues, or contributions, please visit our [GitHub repository](https://github.com/Jimce-Music/jimce).

## License

This project is licensed under the terms specified in the [LICENSE](https://github.com/Jimce-Music/jimce/blob/main/LICENSE) file.
