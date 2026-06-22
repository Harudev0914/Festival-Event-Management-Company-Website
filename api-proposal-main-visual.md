# API Schema Proposal for Main Visual

## Proposed DTO (Data Transfer Object)

```typescript
export interface MainVisualDto {
  backgroundType: 'image_file' | 'image_url' | 'video_file' | 'video_url';
  backgroundValue: string;
  djImageType: 'image_file' | 'image_url' | 'video_file' | 'video_url';
  djImageValue: string;
  detailContent: string;
  useTimestamp: boolean;
  timestampDate?: string; // ISO date string if useTimestamp is true
}
```

## API Endpoint Updates

The `admin/visual` controller should be updated to accept this DTO.

### 1. Create/Update
The `@Post()` and `@Put(':id')` methods in `VisualController` should use a validation pipe (e.g., `ValidationPipe` with `class-validator`) to ensure incoming request bodies match the `MainVisualDto` schema.

### 2. Service Layer
The `VisualService` should be updated to:
1. Validate the `backgroundValue` and `djImageValue` (e.g., if it's a file, ensure it exists or is being uploaded, if it's a URL, validate format).
2. Store these fields in the database.

## Integration with Client

1. **Client-side Form:** The existing form already collects this data.
2. **API Call:** The `handleSubmit` in `apps/client/app/admin/visual/new/page.tsx` needs to be updated to send this data as a JSON body to `POST /api/admin/visual`.
3. **Frontend Rendering:** The client-side pages that display the Main Visual will need to fetch the configuration from a `GET /api/visual` (or similar) endpoint, parse the `backgroundType` and `djImageType` to determine whether to render an `<img>`, `<video>`, or a styled component, and conditionally render the timestamp and detail content.
