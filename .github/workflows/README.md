# GitHub Actions Workflows

## Docker Build and Push

This workflow automatically builds and pushes Docker images for both backend and frontend.

### Trigger Events

- **Pull Requests to main**: Builds images but does NOT push to registry (validation only)
- **Push to main**: Builds AND pushes images to GitHub Container Registry (ghcr.io)

### Image Tags

Images are tagged with:
- `latest` - Always points to the latest main branch build
- `sha-<commit>` - Specific commit SHA for reproducibility
- `main` - Branch name tag

### Registry

Images are pushed to GitHub Container Registry (ghcr.io):
- Backend: `ghcr.io/<username>/hex-to-rgb-converter-backend:latest`
- Frontend: `ghcr.io/<username>/hex-to-rgb-converter-frontend:latest`

### Permissions

The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions. No additional secrets are required.

### Usage

Once the images are pushed, you can update your `docker-compose.yml` to use them:

```yaml
services:
  backend:
    image: ghcr.io/<username>/hex-to-rgb-converter-backend:latest
  frontend:
    image: ghcr.io/<username>/hex-to-rgb-converter-frontend:latest
```

**Note**: You may need to make the packages public or authenticate to pull them:
```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```
