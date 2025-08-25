import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';

const HospitalQRScannerPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  const startScanning = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockResult = {
        userId: 'USER123',
        userName: 'John Doe',
        amount: 150.00,
        description: 'Medical consultation payment',
        hospitalId: 'HOSP001',
        timestamp: new Date().toISOString(),
        type: 'payment_request'
      };
      
      setScanResult(mockResult);
      setIsScanning(false);
      
      // Add to scan history
      setScanHistory(prev => [mockResult, ...prev.slice(0, 4)]);
    }, 3000);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const processPayment = () => {
    if (scanResult) {
      // In a real app, this would process the payment
      alert(`Payment of $${scanResult.amount} processed successfully for ${scanResult.userName}`);
      setScanResult(null);
    }
  };

  const rejectPayment = () => {
    if (scanResult) {
      alert('Payment rejected');
      setScanResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">QR Code Scanner</h1>
              <p className="text-gray-600 mt-2">Scan patient QR codes to process payments and fund transfers.</p>
            </div>
            <Link to="/hospital/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">QR Code Scanner</h2>
              
              {/* Scanner Viewport */}
              <div className="relative">
                <div className="w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                  {isScanning ? (
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-lg font-medium">Scanning...</p>
                      <p className="text-sm text-gray-300 mt-2">Point camera at QR code</p>
                    </div>
                  ) : scanResult ? (
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">QR Code Scanned!</p>
                      <p className="text-sm text-gray-300 mt-2">Payment details loaded</p>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">Ready to Scan</p>
                      <p className="text-sm text-gray-300 mt-2">Click start to begin scanning</p>
                    </div>
                  )}
                  
                  {/* Scanning Frame Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-white border-dashed rounded-lg"></div>
                    </div>
                  )}
                </div>

                {/* Scanner Controls */}
                <div className="mt-6 flex space-x-3">
                  {!isScanning && !scanResult ? (
                    <Button onClick={startScanning} className="flex-1">
                      Start Scanning
                    </Button>
                  ) : isScanning ? (
                    <Button variant="danger" onClick={stopScanning} className="flex-1">
                      Stop Scanning
                    </Button>
                  ) : (
                    <>
                      <Button onClick={processPayment} className="flex-1">
                        Process Payment
                      </Button>
                      <Button variant="outline" onClick={rejectPayment} className="flex-1">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">How to use:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click "Start Scanning" to activate the camera</li>
                  <li>• Point the camera at a patient's QR code</li>
                  <li>• Review the payment details</li>
                  <li>• Process or reject the payment</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Scan Results & History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Current Scan Result */}
            {scanResult && (
              <Card className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Result</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient Name:</span>
                    <span className="font-medium">{scanResult.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-green-600">${scanResult.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">{scanResult.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-mono text-sm">{scanResult.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timestamp:</span>
                    <span className="text-sm">{new Date(scanResult.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Scan History */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
              {scanHistory.length > 0 ? (
                <div className="space-y-3">
                  {scanHistory.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{scan.userName}</p>
                        <p className="text-sm text-gray-500">{scan.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${scan.amount}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(scan.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent scans</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalQRScannerPage;
