'use client';

import React, { useState } from 'react';

interface CommentsProps {
  postId: string;
}

interface Comment {
  author: string;
  content: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const author = isAnonymous ? 'Anonymní' : authorName.trim() || 'Anonymní';
      setComments([...comments, { author, content: newComment }]);
      setNewComment('');
      setAuthorName('');
      setIsAnonymous(false);
    }
  };

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold mb-6 text-blumine">Komentáře</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded font-raleway focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Vaše jméno"
            disabled={isAnonymous}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="anonymous" className="text-blumine">Nechci uvádět</label>
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded font-raleway focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Napište komentář..."
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 font-raleway">
          Přidat komentář
        </button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded mb-4 shadow-md">
            <p className="font-bold mb-2 text-blumine">{comment.author}</p>
            <p className="text-blumine font-raleway">{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;