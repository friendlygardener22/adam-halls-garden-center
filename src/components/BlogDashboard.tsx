'use client';

import React, { useState } from 'react';
import { 
  CalendarIcon, 
  DocumentTextIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  ClockIcon,
  ChartBarIcon,
  TagIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useBlogUpdates } from '../hooks/useBlogUpdates';
import { BlogPost, BlogSchedule, BlogCategory } from '../types/blog-updates';

export default function BlogDashboard() {
  const {
    posts,
    schedules,
    categories,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    generateWeeklySchedule,
    generateSampleData
  } = useBlogUpdates();

  const [activeTab, setActiveTab] = useState<'posts' | 'schedule' | 'calendar' | 'analytics'>('posts');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // Form state for creating/editing posts
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    categoryId: '',
    tags: '',
    author: 'Garden Expert',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    publishDate: '',
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost = await createPost({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      categoryId: formData.categoryId || categories[0]?.id,
      publishDate: formData.publishDate || new Date().toISOString()
    });

    if (newPost) {
      setShowCreateForm(false);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        categoryId: '',
        tags: '',
        author: 'Garden Expert',
        status: 'draft',
        publishDate: '',
        featuredImage: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
      });
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      const updatedPost = await updatePost(editingPost.id, {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });

      if (updatedPost) {
        setEditingPost(null);
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          categoryId: '',
          tags: '',
          author: 'Garden Expert',
          status: 'draft',
          publishDate: '',
          featuredImage: '',
          seoTitle: '',
          seoDescription: '',
          seoKeywords: ''
        });
      }
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      categoryId: post.categoryId,
      tags: post.tags.join(', '),
      author: post.author,
      status: post.status,
      publishDate: post.publishDate,
      featuredImage: post.featuredImage || '',
      seoTitle: post.seo?.title || '',
      seoDescription: post.seo?.description || '',
      seoKeywords: post.seo?.keywords?.join(', ') || ''
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deletePost(postId);
    }
  };

  const handleGenerateSchedule = async () => {
    const weekStart = new Date(selectedYear, 0, (selectedWeek - 1) * 7 + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    await generateWeeklySchedule(weekStart.toISOString(), weekEnd.toISOString());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="text-red-400">
                <DocumentTextIcon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading blog dashboard</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
              <p className="mt-2 text-gray-600">Manage your blog posts, schedules, and content calendar</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Post
              </button>
              <button
                onClick={generateSampleData}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Generate Sample Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                  <dd className="text-lg font-medium text-gray-900">{posts.length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {posts.filter(post => post.status === 'published').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Drafts</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {posts.filter(post => post.status === 'draft').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TagIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                  <dd className="text-lg font-medium text-gray-900">{categories.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'posts', name: 'Blog Posts', icon: DocumentTextIcon },
                { id: 'schedule', name: 'Weekly Schedule', icon: CalendarIcon },
                { id: 'calendar', name: 'Content Calendar', icon: CalendarIcon },
                { id: 'analytics', name: 'Analytics', icon: ChartBarIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 inline mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Blog Posts Tab */}
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Blog Posts</h3>
                  <div className="flex space-x-3">
                                         <select 
                       className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                       aria-label="Filter by category"
                     >
                       <option>All Categories</option>
                       {categories.map(category => (
                         <option key={category.id} value={category.id}>{category.name}</option>
                       ))}
                     </select>
                     <select 
                       className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                       aria-label="Filter by status"
                     >
                       <option>All Status</option>
                       <option value="published">Published</option>
                       <option value="draft">Draft</option>
                       <option value="scheduled">Scheduled</option>
                     </select>
                  </div>
                </div>

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {post.featuredImage ? (
                                  <img className="h-10 w-10 rounded-lg object-cover" src={post.featuredImage} alt="" />
                                ) : (
                                  <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                <div className="text-sm text-gray-500">{post.excerpt}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {getCategoryName(post.categoryId)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(post.publishDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                         <div className="flex space-x-2">
                               <button
                                 onClick={() => handleEditPost(post)}
                                 className="text-green-600 hover:text-green-900"
                                 title="Edit post"
                                 aria-label="Edit post"
                               >
                                 <PencilIcon className="h-4 w-4" />
                               </button>
                               <button
                                 onClick={() => handleDeletePost(post.id)}
                                 className="text-red-600 hover:text-red-900"
                                 title="Delete post"
                                 aria-label="Delete post"
                               >
                                 <TrashIcon className="h-4 w-4" />
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Weekly Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Weekly Blog Schedule</h3>
                  <div className="flex space-x-3">
                                         <select
                       value={selectedWeek}
                       onChange={(e) => setSelectedWeek(Number(e.target.value))}
                       className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                       aria-label="Select week number"
                     >
                       {Array.from({ length: 52 }, (_, i) => i + 1).map(week => (
                         <option key={week} value={week}>Week {week}</option>
                       ))}
                     </select>
                     <select
                       value={selectedYear}
                       onChange={(e) => setSelectedYear(Number(e.target.value))}
                       className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                       aria-label="Select year"
                     >
                       {[2024, 2025, 2026].map(year => (
                         <option key={year} value={year}>{year}</option>
                       ))}
                     </select>
                    <button
                      onClick={handleGenerateSchedule}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Generate Schedule
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['monday', 'wednesday', 'friday'].map((day) => {
                    const schedule = schedules.find(s => s.weekNumber === selectedWeek && s.year === selectedYear);
                    const daySchedule = schedule?.[day as keyof BlogSchedule] as any;
                    
                    return (
                      <div key={day} className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-medium text-gray-900 capitalize mb-4">{day}</h4>
                        {daySchedule ? (
                          <div>
                            <div className="mb-4">
                              <p className="text-sm text-gray-600">Time: {daySchedule.time}</p>
                              <p className="text-sm text-gray-600">Status: {daySchedule.status}</p>
                              <p className="text-sm text-gray-600">Author: {daySchedule.author}</p>
                            </div>
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900">Topic</h5>
                              <p className="text-sm text-gray-600">{daySchedule.topic}</p>
                            </div>
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900">Category</h5>
                              <p className="text-sm text-gray-600">{daySchedule.category}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Notes</h5>
                              <p className="text-sm text-gray-600">{daySchedule.notes}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No schedule for this week</p>
                            <button
                              onClick={handleGenerateSchedule}
                              className="mt-2 text-green-600 hover:text-green-700 text-sm"
                            >
                              Generate Schedule
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content Calendar Tab */}
            {activeTab === 'calendar' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Content Calendar</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Content calendar view coming soon...</p>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Blog Analytics</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Analytics dashboard coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create/Edit Post Modal */}
        {(showCreateForm || editingPost) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                
                <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    
                                         <div>
                       <label className="block text-sm font-medium text-gray-700">Category</label>
                       <select
                         value={formData.categoryId}
                         onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                         className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                         required
                         aria-label="Select blog post category"
                       >
                         <option value="">Select Category</option>
                         {categories.map(category => (
                           <option key={category.id} value={category.id}>{category.name}</option>
                         ))}
                       </select>
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="gardening, plants, tips"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Author</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div>
                       <label className="block text-sm font-medium text-gray-700">Status</label>
                       <select
                         value={formData.status}
                         onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                         className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                         aria-label="Select blog post status"
                       >
                         <option value="draft">Draft</option>
                         <option value="published">Published</option>
                         <option value="scheduled">Scheduled</option>
                       </select>
                     </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                      <input
                        type="datetime-local"
                        value={formData.publishDate}
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setEditingPost(null);
                        setFormData({
                          title: '',
                          content: '',
                          excerpt: '',
                          categoryId: '',
                          tags: '',
                          author: 'Garden Expert',
                          status: 'draft',
                          publishDate: '',
                          featuredImage: '',
                          seoTitle: '',
                          seoDescription: '',
                          seoKeywords: ''
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
