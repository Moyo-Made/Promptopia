"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});
	const [promptId, setPromptId] = useState(null);

	useEffect(() => {
		if (router.isReady) {
			const query = router.query;
			const id = query.id;
			setPromptId(id);
		}
	}, [router.isReady, router.query]);

	useEffect(() => {
		const getPromptDetails = async () => {
			if (!promptId) return;

			try {
				const res = await fetch(`/api/prompt/${promptId}`);
				if (!res.ok) throw new Error("Failed to fetch prompt details");

				const data = await res.json();
				setPost({
					prompt: data.prompt,
					tag: data.tag,
				});
			} catch (error) {
				console.error("Error fetching prompt details:", error);
			}
		};

		getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) {
			alert("Prompt ID is not found");
			return setSubmitting(false);
		}

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
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
			} else {
				const errorData = await response.json();
				alert(`Failed to update prompt: ${errorData.message}`);
			}
		} catch (error) {
			console.error("Error updating prompt:", error);
		} finally {
			setSubmitting(false);
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

export default EditPrompt;
