"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, Plus, X } from 'lucide-react';
import axios from 'axios';

type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  createdAt: any;
  published: boolean;
};

export default function BlogsDashboard() {
  const { token } = useCms();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    excerpt: '',
    content: ''
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/cms/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setCreating(true);
    try {
      await axios.post('/api/cms/blogs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setFormData({ title: '', authorName: '', excerpt: '', content: '' });
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('Error creating blog post.');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#d4af37]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Blogs</h1>
          <p className="text-gray-500">Publish and manage articles and temple updates.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#d4af37] text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-yellow-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Article</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog.slug} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{blog.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {blog.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{blog.excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">By {blog.authorName}</span>
              <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="text-[#d4af37] font-semibold text-sm hover:underline">
                View Article &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
            
            <form onSubmit={handleCreateSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
                  placeholder="Article Title"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Author Name</label>
                <input
                  required
                  type="text"
                  value={formData.authorName}
                  onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
                  placeholder="E.g. Swami Gopalananda"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
                  placeholder="Short description for preview..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Content (HTML/Markdown)</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none font-mono text-sm"
                  placeholder="<p>Write your article here...</p>"
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-2 bg-[#d4af37] text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 disabled:opacity-50"
                >
                  {creating && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>{creating ? 'Publishing...' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
