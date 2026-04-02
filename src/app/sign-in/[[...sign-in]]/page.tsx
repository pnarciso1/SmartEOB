import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">SmartEOB</h1>
        <p className="text-gray-500 mt-1">Healthcare Billing Intelligence Platform</p>
      </div>
      <SignIn />
    </div>
  );
}
