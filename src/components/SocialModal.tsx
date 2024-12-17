import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaComment, FaShare, FaSmile, FaFire, FaThumbsUp, FaUser, FaClock } from 'react-icons/fa';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: number;
  user: string;
  text: string;
  likes: number;
  time: string;
  replies: number;
  isLiked: boolean;
}

const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "@maria.silva",
      text: "Adorei a nova funcionalidade! 🎉",
      likes: 45,
      time: "2m",
      replies: 3,
      isLiked: false
    },
    {
      id: 2,
      user: "@joao.dev",
      text: "Muito legal! Como faço para implementar no meu site? 🤔",
      likes: 32,
      time: "5m",
      replies: 2,
      isLiked: false
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [reactions, setReactions] = useState({
    likes: 234,
    comments: 89,
    shares: 45
  });
  const [activeTab, setActiveTab] = useState<'trending' | 'recent'>('trending');

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      user: "@usuario.demo",
      text: newComment,
      likes: 0,
      time: "agora",
      replies: 0,
      isLiked: false
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setReactions(prev => ({
      ...prev,
      comments: prev.comments + 1
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Post Content */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">DGSolution WEB</h4>
                  <span className="text-gray-400 text-sm">Post em Destaque</span>
                </div>
              </div>
              <p className="text-white mb-4">
                Nova atualização disponível! Agora com mais recursos de interação social. 🚀 
                #Inovação #Tecnologia #WebDev
              </p>
              
              {/* Reactions Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                <div className="flex gap-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                    onClick={() => setReactions(prev => ({...prev, likes: prev.likes + 1}))}
                  >
                    <FaHeart /> <span>{reactions.likes}</span>
                  </motion.button>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaComment /> <span>{reactions.comments}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaShare /> <span>{reactions.shares}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <FaSmile className="text-yellow-500" />
                  <FaFire className="text-orange-500" />
                  <FaThumbsUp className="text-blue-500" />
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <div className="flex gap-4 mb-4">
                  <button
                    className={`text-sm font-semibold ${activeTab === 'trending' ? 'text-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('trending')}
                  >
                    Em Alta
                  </button>
                  <button
                    className={`text-sm font-semibold ${activeTab === 'recent' ? 'text-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('recent')}
                  >
                    Recentes
                  </button>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="mb-6">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Adicione um comentário..."
                      className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-blue-400 font-medium">{comment.user}</span>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <FaClock className="text-xs" />
                              <span>{comment.time}</span>
                            </div>
                          </div>
                          <p className="text-white mb-2">{comment.text}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button
                              onClick={() => handleLike(comment.id)}
                              className={`flex items-center gap-1 ${comment.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              <FaHeart /> {comment.likes}
                            </button>
                            <button className="text-gray-400 flex items-center gap-1">
                              <FaComment /> {comment.replies}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal; 