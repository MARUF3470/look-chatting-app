"use client";
import { newVerification } from "@/app/utils/newVerificationToken";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const NewVerificationToken = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const data = searchParams.get("data");

  useEffect(() => {
    if (data) {
      try {
        if (!token) {
          setError("Token is missing!");
          return;
        }

        newVerification(token, data)
          .then((data) => {
            setSuccess(data.success);
            setError(data.error);
          })
          .catch((err) => {
            setError("Something went wrong.");
          });
      } catch (error) {
        console.error("Decryption failed", error);
        setError("Decryption failed.");
      }
    } else {
      setError("Data parameter is missing.");
    }
  }, [data, token]);
  return (
    <div>
      {!success && !error && <BeatLoader />}

      <p>{success}</p>
      <p>{error}</p>
    </div>
  );
};

export default NewVerificationToken;
