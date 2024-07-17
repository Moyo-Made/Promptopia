"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	
	const handleTagClick = (tag) => {
		setSearchText(tag);
	};
	
	const filteredPrompts = posts.filter(
		(post) =>
			post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
			(typeof post.tag === "string" &&
				post.tag.toLowerCase().includes(searchText.toLowerCase())) ||
			post.creator.username.toLowerCase().includes(searchText.toLowerCase())
	);

	useEffect(() => {
		//Fetch post data from the api
		const fetchPosts = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();
			console.log(data);
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form onSubmit={handleSubmit} className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{/* Display search results if true, else display all prompts */}
			{searchText ? (
				<PromptCardList
					data={filteredPrompts}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList data={posts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
