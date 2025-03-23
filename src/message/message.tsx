import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Navbar/Sidebar';

const Message = () => {
  const mockUser = {
    name: "John Doe",
    avatar: "https://avatars.githubusercontent.com/u/35243461?v=4"
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar Navigation */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <Navbar user={mockUser} />

        {/* Main Message Content */}
        <div className="flex flex-row h-[calc(100vh-64px)] w-full overflow-x-hidden">
          {/* Message Sidebar */}
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="text-2xl font-bold">Messages</div>
            </div>
            
            {/* Search */}
            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img
                  src="https://avatars.githubusercontent.com/u/35243461?v=4"
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">John Doe</div>
            </div>
            
            {/* Contacts List */}
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2">
                {/* Contact Item */}
                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {/* Received Message */}
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>Hey How are you today?</div>
                        </div>
                      </div>
                    </div>

                    {/* Sent Message */}
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          B
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>I'm doing fine, thanks for asking!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
