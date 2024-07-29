import ResetForm from "@/components/authcomponents/ResetForm";
import "../../../globals.css";

const ResetPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/3  border p-4 rounded-sm">
        <h3 className="font-semibold text-lg">To reset password,</h3>
        <p className="text-sm">Enter your email.</p>
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPage;
