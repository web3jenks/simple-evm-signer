import React, { useState } from 'react';

const MessageSigner = () => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      setError(err.message);
    }
  };

  const signMessage = async () => {
    try {
      if (!window.ethereum) throw new Error('Please install MetaMask');
      
      // Get the connected accounts
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      // Create the personal_sign request
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account]
      });

      setSignature(signature);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="space-y-4">
        <button 
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>

        <div>
          <label className="block text-sm font-medium mb-2">Message to Sign:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your Baby address here"
          />
        </div>

        <button 
          onClick={signMessage}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sign Message
        </button>

        {signature && (
          <div className="mt-4">
            <h3 className="font-medium">Signature:</h3>
            <p className="break-all bg-gray-100 p-2 rounded">{signature}</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 mt-2">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSigner;