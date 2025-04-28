import React from 'react';
import Marquee from 'react-fast-marquee';

function Instruction() {
  return (
    <div className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">How to Use TALK</h2>
        <p className="text-center text-gray-500 mb-8">
          Follow these simple steps to start learning, sharing, and connecting with others.
        </p>
        <Marquee pauseOnHover speed={50} gradient={false}>
          <div className="grid grid-cols-4 gap-6">
            
            {/* Registration */}
            <div className="card card-compact bg-lime-50 shadow-xl relative">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">Register</h2>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Fill out your personal information</li>
                  <li>Verify your email address</li>
                  <li>Complete your profile setup</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">Step 01</div>
              </div>
            </div>

            {/* Search Topic */}
            <div className="card card-compact bg-lime-100 shadow-xl relative">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607m0 0v3.378l3.379-3.378z" />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">Explore Topics</h2>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Search topics by tags</li>
                  <li>Find discussions that interest you</li>
                  <li>Start reading and learning</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">Step 02</div>
              </div>
            </div>

            {/* Add Post */}
            <div className="card card-compact bg-rose-100 shadow-xl relative">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m-3 9l2.25-.75L15 15m0 0l2.25.75L15 18m-3-9l2.25.75L15 9m0 0l2.25-.75L15 6" />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">Create a Post</h2>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Go to your dashboard</li>
                  <li>Click on "Add Post"</li>
                  <li>Fill in your question and submit</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">Step 03</div>
              </div>
            </div>

            {/* Make Payment */}
            <div className="card card-compact bg-sky-50 shadow-xl relative mr-10">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">Upgrade Membership</h2>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Visit the Membership page</li>
                  <li>Enter your payment details</li>
                  <li>Become a Gold Member for unlimited posts</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">Step 04</div>
              </div>
            </div>

          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Instruction;
