"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const UpdatePromptClient = ({ promptData }) => {
  const router = useRouter();
  const [post, setPost] = useState({
    prompt: promptData.prompt,
    tag: promptData.tag,
  });
  const [submitting, setIsSubmitting] = useState(false);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptData._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePromptClient;
