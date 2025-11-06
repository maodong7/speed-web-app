'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: '',
    doi: '',
    submitterEmail: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 接口地址与Postman一致，确保前后端联调成功
      await axios.post('http://localhost:3001/api/submissions', formData);
      setMessage('✅ 文献提交成功，等待管理员审核！');
      setFormData({ title: '', doi: '', submitterEmail: '' });
    } catch (error: any) {
      setMessage(`❌ ${error.response?.data?.message || '提交失败，请重试'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">文献提交表单</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="title">
            文献标题 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="doi">
            DOI编号 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="doi"
            name="doi"
            value={formData.doi}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
            placeholder="示例：10.789/speed-test-2025"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="submitterEmail">
            提交者邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="submitterEmail"
            name="submitterEmail"
            value={formData.submitterEmail}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
            placeholder="示例：test@speed.com"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? '提交中...' : '提交文献'}
        </button>
        {message && <div className="mt-3 text-center text-lg">{message}</div>}
      </form>
      <div className="mt-4 text-center">
        <Link href="/moderate" className="text-blue-500 hover:underline">
          👉 前往查看待审核队列
        </Link>
      </div>
    </div>
  );
}