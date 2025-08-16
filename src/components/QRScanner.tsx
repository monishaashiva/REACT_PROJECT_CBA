import React, { useState, useRef, useEffect } from 'react';
import { Camera, QrCode, AlertCircle, CheckCircle, X, RotateCcw } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (data: any) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock patient data - in real implementation, this would come from scanning
  const mockPatientData = {
    id: 'PAT001',
    name: 'John Doe',
    age: 29,
    bloodGroup: 'O+',
    phone: '+91-9876543210',
    emergencyContacts: [
      { name: 'Jane Doe', relation: 'Wife', phone: '+91-9876543211' },
      { name: 'Dr. Raj', relation: 'Primary', phone: '+91-9876543222' }
    ],
    medicalInfo: {
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Lisinopril 10mg'],
      insurance: 'Health Plus Premium'
    },
    wallet: {
      balance: 1200.50,
      lastUpdated: '2024-01-15T10:30:00Z'
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsScanning(true);
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
    // Simulate QR code detection
    setTimeout(() => {
      const qrData = JSON.stringify(mockPatientData);
      setScanResult(qrData);
      
      // Process the scanned data
      setTimeout(() => {
        onScanSuccess(mockPatientData);
        stopCamera();
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <QrCode className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">QR Code Scanner</h2>
                <p className="text-green-100 mt-1">Scan patient QR to access medical records</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">Hospital Staff</p>
              <p className="text-white font-medium">Emergency Access</p>
            </div>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {!isScanning ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Scan</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Position the patient's QR code within the camera frame to access their medical information and wallet details.
              </p>
              <button
                onClick={startCamera}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center mx-auto"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Camera
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera View */}
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 border-2 border-green-400 rounded-xl">
                    {/* Scanning Animation */}
                    {!scanResult && (
                      <div className="absolute inset-0 border-2 border-green-400 rounded-xl animate-pulse">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400 rounded-br-xl"></div>
                      </div>
                    )}
                    
                    {/* Success Indicator */}
                    {scanResult && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-16 h-16 text-green-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Text */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                  {scanResult ? 'QR Code Detected!' : 'Scanning for QR Code...'}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={simulateQRScan}
                  disabled={!!scanResult}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simulate Scan
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Stop Scanner
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3">Scanning Instructions</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
              <div>
                <p className="font-medium text-gray-900">Position QR Code</p>
                <p>Hold the patient's QR code within the scanning frame</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
              <div>
                <p className="font-medium text-gray-900">Wait for Detection</p>
                <p>The system will automatically detect and process the code</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
              <div>
                <p className="font-medium text-gray-900">Access Records</p>
                <p>View patient information and manage emergency funds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for QR processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default QRScanner;