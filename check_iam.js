const { GoogleAuth } = require('google-auth-library');

async function checkPermissions() {
  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    const credentials = await auth.getCredentials();
    
    console.log('Project ID:', projectId);
    console.log('Service Account Email:', credentials.client_email);
    
    // Check IAM Policy using REST
    const url = `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:getIamPolicy`;
    
    const res = await client.request({
      url,
      method: 'POST',
      data: {}
    });
    
    const policy = res.data;
    const saEmail = credentials.client_email;
    
    console.log('\n--- IAM Roles for Service Account ---');
    let hasRoles = false;
    
    if (policy.bindings) {
      policy.bindings.forEach(binding => {
        if (binding.members && binding.members.includes(`serviceAccount:${saEmail}`)) {
          console.log(binding.role);
          hasRoles = true;
        }
      });
    }
    
    if (!hasRoles) {
      console.log('No roles found for this service account on the project.');
    }
    
  } catch (error) {
    console.error('Error checking permissions:', error.message);
  }
}

checkPermissions();