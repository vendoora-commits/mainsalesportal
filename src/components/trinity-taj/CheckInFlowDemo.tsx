'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Scan, 
  Key, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  QrCode,
  Smartphone,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';

export function CheckInFlowDemo() {
  const [step, setStep] = useState<'start' | 'verify' | 'issue' | 'encode' | 'finish'>('start');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    checkinId: '',
    keyId: '',
    cardId: '',
    verificationResult: null as any,
    keyData: null as any,
  });

  const handleStartCheckin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkin/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId: 'RES-2025-001',
          guest: { name: 'John Doe', docType: 'passport', docScanId: 'SCAN-001' },
          kioskId: 'KIOSK-LOBBY-01',
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setData(prev => ({ ...prev, checkinId: result.data.checkinId }));
        setStep('verify');
      }
    } catch (error) {
      console.error('Check-in start failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyID = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkin/verify-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkinId: data.checkinId,
          method: 'passport',
          result: 'pass',
          evidenceId: 'EVIDENCE-001',
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setData(prev => ({ ...prev, verificationResult: result.data }));
        setStep('issue');
      }
    } catch (error) {
      console.error('ID verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssueKey = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/keys/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: 'PROP-001',
          unitId: '301',
          guestId: 'GUEST-001',
          lockFamily: 'TAJ-L-series',
          auth: ['card', 'mobile'],
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          channel: 'kiosk',
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setData(prev => ({ ...prev, keyId: result.data.keyId, keyData: result.data }));
        setStep('encode');
      }
    } catch (error) {
      console.error('Key issuance failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEncodeCard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cards/encode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyId: data.keyId,
          kioskId: 'KIOSK-LOBBY-01',
          encoderId: 'ENCODER-01',
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setData(prev => ({ ...prev, cardId: result.data.cardId }));
        setStep('finish');
      }
    } catch (error) {
      console.error('Card encoding failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishCheckin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkin/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkinId: data.checkinId,
          keyId: data.keyId,
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        // Show completion message
        alert('Check-in completed! Welcome to your stay!');
      }
    } catch (error) {
      console.error('Check-in completion failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Trinity-TAJ Check-In Flow Demo</h1>
        <p className="text-gray-600">Live demonstration of the kiosk → lock issuance API flow</p>
      </div>

      {/* Flow Visualization */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {[
          { id: 'start', label: 'Start', icon: User },
          { id: 'verify', label: 'Verify ID', icon: Scan },
          { id: 'issue', label: 'Issue Key', icon: Key },
          { id: 'encode', label: 'Encode Card', icon: CreditCard },
          { id: 'finish', label: 'Complete', icon: CheckCircle },
        ].map((flowStep, index) => (
          <div key={flowStep.id} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === flowStep.id ? 'bg-primary text-white' :
              ['start', 'verify', 'issue', 'encode', 'finish'].indexOf(step) > index ? 'bg-green-500 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              <flowStep.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium hidden sm:inline">{flowStep.label}</span>
            {index < 4 && <ArrowRight className="h-4 w-4 text-gray-400 hidden md:block" />}
          </div>
        ))}
      </div>

      {/* Step 1: Start Check-In */}
      {step === 'start' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Start Check-In</CardTitle>
            <CardDescription>POST /api/checkin/start</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Request Body:</p>
              <pre className="text-xs overflow-x-auto">{JSON.stringify({
                reservationId: 'RES-2025-001',
                guest: { name: 'John Doe', docType: 'passport', docScanId: 'SCAN-001' },
                kioskId: 'KIOSK-LOBBY-01'
              }, null, 2)}</pre>
            </div>
            
            <Button onClick={handleStartCheckin} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <User className="h-4 w-4 mr-2" />}
              Start Check-In Process
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Verify ID */}
      {step === 'verify' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Verify Guest ID</CardTitle>
            <CardDescription>POST /api/checkin/verify-id</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium">Check-in ID: {data.checkinId}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Request Body:</p>
              <pre className="text-xs overflow-x-auto">{JSON.stringify({
                checkinId: data.checkinId,
                method: 'passport',
                result: 'pass',
                evidenceId: 'EVIDENCE-001'
              }, null, 2)}</pre>
            </div>
            
            <Button onClick={handleVerifyID} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Scan className="h-4 w-4 mr-2" />}
              Verify Passport/ID
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Issue Key */}
      {step === 'issue' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Issue Digital Key</CardTitle>
            <CardDescription>POST /api/keys/issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium">ID Verified - Confidence: 97.5%</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Request Body:</p>
              <pre className="text-xs overflow-x-auto">{JSON.stringify({
                propertyId: 'PROP-001',
                unitId: '301',
                guestId: 'GUEST-001',
                lockFamily: 'TAJ-L-series',
                auth: ['card', 'mobile'],
                validFrom: new Date().toISOString(),
                validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                channel: 'kiosk'
              }, null, 2)}</pre>
            </div>
            
            <Button onClick={handleIssueKey} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Key className="h-4 w-4 mr-2" />}
              Issue Room Key
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Encode Card */}
      {step === 'encode' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Encode & Dispense Card</CardTitle>
            <CardDescription>POST /api/cards/encode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium">Key Issued: {data.keyId}</p>
              </div>
              {data.keyData?.qrPayload && (
                <div className="mt-2 flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <p className="text-sm">Mobile key QR code available</p>
                </div>
              )}
              {data.keyData?.walletPassUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600" />
                  <p className="text-sm">Wallet pass URL generated</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Request Body:</p>
              <pre className="text-xs overflow-x-auto">{JSON.stringify({
                keyId: data.keyId,
                kioskId: 'KIOSK-LOBBY-01',
                encoderId: 'ENCODER-01'
              }, null, 2)}</pre>
            </div>
            
            <Button onClick={handleEncodeCard} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CreditCard className="h-4 w-4 mr-2" />}
              Encode & Dispense RFID Card
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Finish */}
      {step === 'finish' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 5: Complete Check-In</CardTitle>
            <CardDescription>POST /api/checkin/finish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium">Card Dispensed: {data.cardId}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Request Body:</p>
              <pre className="text-xs overflow-x-auto">{JSON.stringify({
                checkinId: data.checkinId,
                keyId: data.keyId
              }, null, 2)}</pre>
            </div>
            
            <Button onClick={handleFinishCheckin} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Complete Check-In
            </Button>

            <div className="mt-4">
              <Button variant="outline" onClick={() => { setStep('start'); setData({ checkinId: '', keyId: '', cardId: '', verificationResult: null, keyData: null }); }} className="w-full">
                Reset Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Contract Reference */}
      <Card>
        <CardHeader>
          <CardTitle>API Contract Summary</CardTitle>
          <CardDescription>Trinity-TAJ Hotel Lock & API integration endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 border rounded-lg">
              <p className="font-medium">POST /api/checkin/start</p>
              <p className="text-gray-600">Initiates check-in session with reservation lookup</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">POST /api/checkin/verify-id</p>
              <p className="text-gray-600">Verifies guest identity via passport/ID/face scan</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">POST /api/keys/issue</p>
              <p className="text-gray-600">Issues digital/physical key for TAJ lock family</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">POST /api/cards/encode</p>
              <p className="text-gray-600">Encodes RFID card and dispenses from kiosk</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">POST /api/keys/revoke</p>
              <p className="text-gray-600">Revokes key (checkout, lost card, security)</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">POST /api/checkin/finish</p>
              <p className="text-gray-600">Completes check-in process and sends welcome</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

