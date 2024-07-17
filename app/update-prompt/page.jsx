import UpdatePromptClient from "@components/UpdatePromptClient";
import { Suspense } from "react";

const UpdatePromptPage = async ({ searchParams }) => {
  const promptId = searchParams.id;

  const fetchPromptDetails = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prompt/${id}`);
    const data = await response.json();
    return data;
  };

  const promptData = await fetchPromptDetails(promptId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptClient promptData={promptData} />
    </Suspense>
  );
};

export default UpdatePromptPage;
