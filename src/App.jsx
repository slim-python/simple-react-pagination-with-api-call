import React from "react";

import { useEffect, useState } from "react";
function App() {
  const [Post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [PostPerPage, setPostPerPage] = useState(10);
  const fetchPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  //get current posts

  const IndexOfLastPost = currentPage * PostPerPage;
  const IndexOfFirstPost = IndexOfLastPost - PostPerPage;
  const CurrentPosts = Post.slice(IndexOfFirstPost, IndexOfLastPost);
  console.log(IndexOfFirstPost, IndexOfLastPost, CurrentPosts);

  // pagination stuff
  const PageNumbers = [];

  // let NumOfTotalPost = Post.length;
  for (let i = 1; i <= Math.ceil(Post.length / PostPerPage); i++)
    PageNumbers.push(i);
  console.log(PageNumbers);
  return (
    <>
      {Post.length !== 0 ? ( //data is preset then show this
        <div className="p-8 px-40 mt-36">
          <h1 className="text-5xl mb-4 font-extrabold ">
            Subscibe for more react stuff 🥲
          </h1>

          {/* show the post here */}
          {CurrentPosts.map((item, idx) => (
            <div key={idx}>
              {item.id} {item.title}
            </div>
          ))}

          {/* previous and next button */}
          <div className="bg-red-100 flex justify-center space-x-10 mt-10">
            <button
              className="p-3 bg-indigo-600 text-white focus:ring hover:bg-indigo-800 "
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              prev
            </button>
            <button
              className="p-3 bg-indigo-600 text-white focus:ring hover:bg-indigo-800 "
              onClick={() => {
                if (currentPage < PageNumbers.length) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </button>
          </div>

          {/* pagination stuff */}
          <div className="flex justify-between w-[400px] mt-2">
            {PageNumbers.map((PageNumber) => (
              <div
                key={PageNumber}
                onClick={() => {
                  setCurrentPage(PageNumber);
                }}
                className={
                  PageNumber == currentPage
                    ? " p-2 px-3 text-white bg-green-700 focus:ring hover:bg-pink-800 cursor-pointer" //this css when selcted
                    : "p-2 px-3 text-white bg-pink-600 focus:ring hover:bg-pink-800 cursor-pointer"
                }
              >
                {PageNumber}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="p-40 text-8xl font-bold">loading ....</p> //if data hasn't come yet show this
      )}
    </>
  );
}

export default App;
