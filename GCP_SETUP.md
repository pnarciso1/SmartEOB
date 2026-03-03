# GCP Configuration Guide for SmartEOB

To configure the Google Cloud Platform infrastructure necessary for SmartEOB, follow these steps:

## 1. Create a GCP Project and Enable APIs
1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project named `smarteob-multi-tenant` (or use an existing one).
3. Open **APIs & Services > Library** and enable the following APIs:
   - **Vertex AI API** (for Gemini 1.5/3.1 Pro vision parsing and embeddings)
   - **Cloud SQL Admin API** (for PostgreSQL)

## 2. Set Up Cloud SQL for PostgreSQL with `pgvector`
1. Go to **Cloud SQL** > **Create instance** > **Choose PostgreSQL**.
2. Name the instance (e.g., `smarteob-db`), set a strong password, and choose **PostgreSQL 15** or higher.
3. Once the instance is created, connect to it (via Cloud Shell or a local psql client).
4. Run the following command to enable the vector extension on your target database:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
5. Note your connection details (IP, user, password, database) to create your `DATABASE_URL` for Prisma.

## 3. Configure Vertex AI (Gemini 3.1 Pro)
1. In the GCP Console, navigate to **Vertex AI** > **Dashboard** and ensure you've enabled all recommended APIs.
2. In your application `.env`, add your GCP credentials and Project ID:
   ```env
   GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
   GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
   ```
   *Note: If deploying on Cloud Run or App Engine, the default service account handles authentication automatically.*

## 4. Google Cloud Storage (for EOB/Plan PDFs)
1. Go to **Cloud Storage** > **Buckets** and create a new bucket (e.g., `smarteob-tenant-docs`).
2. This bucket will hold the `planDocUrl` PDFs referenced in your `EmployerGroup` table.

## 5. Service Account Permissions
Create a dedicated Service Account in **IAM & Admin** with the following roles:
- **Vertex AI User**
- **Cloud SQL Client**
- **Storage Object Admin** (if managing documents)

Export the JSON key for this service account to use locally for development.