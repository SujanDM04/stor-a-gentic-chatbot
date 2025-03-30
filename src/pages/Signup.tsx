
import { SignupForm } from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Stor-a-gentic</h1>
          <p className="mt-2 text-gray-600">Create a new account to get started.</p>
        </div>
        
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
