'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModeratePage() {
  const [pendingList, setPendingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPendingSubmissions = async () => {
      try {
        // 接口地址与Postman一致
        const response = await axios.get('http://localhost:3001/api/submissions/pending');
        if (response.data.success) {
          setPendingList(response.data.data);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage('获取待审核队列失败，请检查后端服务是否正常运行');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingSubmissions();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20 text-xl text-gray-600">加载中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">待审核文献队列</h2>
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      {pendingList.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded text-center text-gray-600">
          暂无待审核文献
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left text-gray-700">文献标题</th>
                <th className="border border-gray-300 p-3 text-left text-gray-700">DOI编号</th>
                <th className="border border-gray-300 p-3 text-left text-gray-700">提交者邮箱</th>
                <th className="border border-gray-300 p-3 text-left text-gray-700">提交时间</th>
              </tr>
            </thead>
            <tbody>
              {pendingList.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{item.title}</td>
                  <td className="border border-gray-300 p-3">{item.doi}</td>
                  <td className="border border-gray-300 p-3">{item.submitterEmail}</td>
                  <td className="border border-gray-300 p-3">
                    {new Date(item.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}