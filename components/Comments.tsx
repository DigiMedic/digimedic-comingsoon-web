// components/Comments.tsx
import React, { useState } from 'react';

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold mb-6">Komentáře</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          placeholder="Napište komentář..."
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Přidat komentář
        </button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded mb-4">
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;