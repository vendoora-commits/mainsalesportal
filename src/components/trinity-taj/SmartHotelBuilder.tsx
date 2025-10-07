'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Download, CheckCircle } from 'lucide-react';

interface BuilderState {
  property: {
    name: string;
    type: string;
    rooms: number;
    assessment: string;
  };
  kiosk: string[];
  kioskCaps: string[];
  lock: {
    power: string;
    auth: string[];
    model: string;
  };
  room: string[];
}

export function SmartHotelBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<BuilderState>({
    property: {
      name: '',
      type: 'Hotel / Resort / Casino / Motel',
      rooms: 120,
      assessment: 'print',
    },
    kiosk: ['desktop19'],
    kioskCaps: ['id-scan', 'receipt', 'key-dispense'],
    lock: {
      power: 'battery',
      auth: ['card', 'mobile'],
      model: 'TAJ-L-series',
    },
    room: ['switches', 'motion'],
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vendoora_builder');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('vendoora_builder', JSON.stringify(state));
  }, [state]);

  const updateProperty = (updates: Partial<BuilderState['property']>) => {
    setState(prev => ({ ...prev, property: { ...prev.property, ...updates } }));
  };

  const toggleKiosk = (value: string) => {
    setState(prev => ({
      ...prev,
      kiosk: prev.kiosk.includes(value)
        ? prev.kiosk.filter(k => k !== value)
        : [...prev.kiosk, value],
    }));
  };

  const toggleKioskCap = (value: string) => {
    setState(prev => ({
      ...prev,
      kioskCaps: prev.kioskCaps.includes(value)
        ? prev.kioskCaps.filter(k => k !== value)
        : [...prev.kioskCaps, value],
    }));
  };

  const updateLock = (updates: Partial<BuilderState['lock']>) => {
    setState(prev => ({ ...prev, lock: { ...prev.lock, ...updates } }));
  };

  const toggleLockAuth = (value: string) => {
    setState(prev => ({
      ...prev,
      lock: {
        ...prev.lock,
        auth: prev.lock.auth.includes(value)
          ? prev.lock.auth.filter(a => a !== value)
          : [...prev.lock.auth, value],
      },
    }));
  };

  const toggleRoom = (value: string) => {
    setState(prev => ({
      ...prev,
      room: prev.room.includes(value)
        ? prev.room.filter(r => r !== value)
        : [...prev.room, value],
    }));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendoora-smart-hotel.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const kioskModels = {
    desktop19: { name: 'Desktop 19"', desc: 'Camera · ID/Passport scan · Printer · QR · Card Dispenser' },
    stand32: { name: 'Freestanding 32"', desc: 'Windows/Android · EMV payment · Receipt printer' },
    wall21: { name: 'Wall-mounted 21"', desc: 'Slim profile · Lobby or hallway' },
  };

  const lockModels = {
    'TAJ-L-series': { name: 'TAJ L-Series (Hotel)', desc: 'Card · Code · Mobile · Mechanical key' },
    'TAJ-KL-series': { name: 'TAJ KL-Series (Camera)', desc: 'Face/FP · App (TTLock/Tuya) · Video intercom' },
    'TAJ-S-series': { name: 'TAJ S-Series (Slimline)', desc: 'Serviced apartment / VRBO · Mobile keys' },
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {[
          { num: 1, label: 'Property' },
          { num: 2, label: 'Kiosk' },
          { num: 3, label: 'Locks' },
          { num: 4, label: 'Room Features' },
          { num: 5, label: 'Summary' },
        ].map((step) => (
          <div key={step.num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              currentStep === step.num ? 'bg-primary text-white' :
              currentStep > step.num ? 'bg-green-500 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step.num ? <CheckCircle className="h-4 w-4" /> : step.num}
            </div>
            <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Property */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img className="w-6 h-6" src="/vendoora-assets/icons/kiosk.svg" alt="" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propName">Property Name</Label>
                <Input
                  id="propName"
                  value={state.property.name}
                  onChange={(e) => updateProperty({ name: e.target.value })}
                  placeholder="Vendoora Demo Hotel"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propType">Property Type</Label>
                <Select value={state.property.type} onValueChange={(value) => updateProperty({ type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hotel / Resort / Casino / Motel">Hotel / Resort / Casino / Motel</SelectItem>
                    <SelectItem value="Airbnb / VRBO">Airbnb / VRBO</SelectItem>
                    <SelectItem value="Timeshare">Timeshare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rooms"># of Rooms / Units</Label>
                <Input
                  id="rooms"
                  type="number"
                  min="1"
                  value={state.property.rooms}
                  onChange={(e) => updateProperty({ rooms: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assessment">Inspection Assessment</Label>
                <Select value={state.property.assessment} onValueChange={(value) => updateProperty({ assessment: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="print">Printable checklist (PDF)</SelectItem>
                    <SelectItem value="digital">Digital (tablet/phone)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)}>
                Next: Kiosk
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Kiosk */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img className="w-6 h-6" src="/vendoora-assets/icons/kiosk.svg" alt="" />
              Self Check-In Kiosk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(kioskModels).map(([id, info]) => (
                <div key={id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl">🖥️</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={id}
                      checked={state.kiosk.includes(id)}
                      onCheckedChange={() => toggleKiosk(id)}
                    />
                    <Label htmlFor={id} className="font-medium cursor-pointer">{info.name}</Label>
                  </div>
                  <p className="text-sm text-gray-600">{info.desc}</p>
                </div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Kiosk Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: 'id-scan', label: 'ID/Passport Scanning', icon: '/vendoora-assets/icons/id-scan.svg' },
                  { id: 'receipt', label: 'Receipt Printing', icon: '/vendoora-assets/icons/printer.svg' },
                  { id: 'key-dispense', label: 'Automatic Keycard Dispense', icon: '/vendoora-assets/icons/keycard.svg' },
                  { id: 'qr', label: 'Print QR Code Pass', icon: '/vendoora-assets/icons/qr.svg' },
                  { id: 'payment', label: 'EMV Payment Terminal', icon: '/vendoora-assets/icons/payment.svg' },
                ].map((cap) => (
                  <div key={cap.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cap.id}
                      checked={state.kioskCaps.includes(cap.id)}
                      onCheckedChange={() => toggleKioskCap(cap.id)}
                    />
                    <img className="w-4 h-4" src={cap.icon} alt="" />
                    <Label htmlFor={cap.id} className="cursor-pointer">{cap.label}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Next: Locks
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Smart Locks */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img className="w-6 h-6" src="/vendoora-assets/icons/lock.svg" alt="" />
              Smart Locks (Trinity-TAJ)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Power Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      id="battery"
                      name="power"
                      value="battery"
                      checked={state.lock.power === 'battery'}
                      onChange={(e) => updateLock({ power: e.target.value })}
                    />
                    <img className="w-5 h-5" src="/vendoora-assets/icons/battery.svg" alt="" />
                    <Label htmlFor="battery" className="font-medium cursor-pointer">Battery (BLE/NFC)</Label>
                  </div>
                  <p className="text-sm text-gray-600">Fast retrofit · AA / Li-ion · offline support</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      id="wired"
                      name="power"
                      value="wired"
                      checked={state.lock.power === 'wired'}
                      onChange={(e) => updateLock({ power: e.target.value })}
                    />
                    <img className="w-5 h-5" src="/vendoora-assets/icons/plug.svg" alt="" />
                    <Label htmlFor="wired" className="font-medium cursor-pointer">Wired / Online</Label>
                  </div>
                  <p className="text-sm text-gray-600">Real-time online · new builds</p>
                </CardContent>
              </Card>
            </div>

            {/* Lock Models */}
            <div className="space-y-2">
              <Label>Lock Model</Label>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(lockModels).map(([id, info]) => (
                  <Card key={id} className={state.lock.model === id ? 'border-primary' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id={id}
                          name="lockModel"
                          value={id}
                          checked={state.lock.model === id}
                          onChange={(e) => updateLock({ model: e.target.value })}
                        />
                        <div className="flex-1">
                          <Label htmlFor={id} className="font-medium cursor-pointer">{info.name}</Label>
                          <p className="text-sm text-gray-600">{info.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Auth Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <img className="w-5 h-5" src="/vendoora-assets/icons/keypad.svg" alt="" />
                  Authentication Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: 'card', label: 'Card (RFID/MIFARE)', icon: '/vendoora-assets/icons/keycard.svg' },
                  { id: 'mobile', label: 'Mobile (BLE/NFC)', icon: '/vendoora-assets/icons/bluetooth.svg' },
                  { id: 'pin', label: 'PIN Keypad', icon: '/vendoora-assets/icons/keypad.svg' },
                  { id: 'fp', label: 'Fingerprint', icon: '/vendoora-assets/icons/fingerprint.svg' },
                ].map((auth) => (
                  <div key={auth.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={auth.id}
                      checked={state.lock.auth.includes(auth.id)}
                      onCheckedChange={() => toggleLockAuth(auth.id)}
                    />
                    <img className="w-4 h-4" src={auth.icon} alt="" />
                    <Label htmlFor={auth.id} className="cursor-pointer">{auth.label}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep(4)}>
                Next: Room Features
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Room Features */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img className="w-6 h-6" src="/vendoora-assets/icons/thermostat.svg" alt="" />
              Smart Room Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {[
                { id: 'switches', label: 'Smart switches / dimmers', icon: '/vendoora-assets/icons/light-switch.svg' },
                { id: 'motion', label: 'Motion sensors', icon: '/vendoora-assets/icons/motion-sensor.svg' },
                { id: 'blinds', label: 'Smart blinds/curtains', icon: '/vendoora-assets/icons/blinds.svg' },
                { id: 'thermostat', label: 'Thermostat control', icon: '/vendoora-assets/icons/thermostat.svg' },
              ].map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={state.room.includes(feature.id)}
                    onCheckedChange={() => toggleRoom(feature.id)}
                  />
                  <img className="w-5 h-5" src={feature.icon} alt="" />
                  <Label htmlFor={feature.id} className="cursor-pointer">{feature.label}</Label>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep(5)}>
                Summary
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Summary */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img className="w-6 h-6" src="/vendoora-assets/icons/save.svg" alt="" />
              Configuration Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold mb-2">Property</h3>
                <p className="text-sm text-gray-600">
                  {state.property.name || 'Untitled'} · {state.property.type} · {state.property.rooms} rooms
                </p>
                <p className="text-sm text-gray-600">Assessment: {state.property.assessment}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Kiosks</h3>
                <div className="flex flex-wrap gap-2">
                  {state.kiosk.map(k => (
                    <Badge key={k} variant="outline">{kioskModels[k as keyof typeof kioskModels]?.name || k}</Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Capabilities: {state.kioskCaps.join(', ')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Smart Locks</h3>
                <p className="text-sm text-gray-600">
                  Model: {lockModels[state.lock.model as keyof typeof lockModels]?.name || state.lock.model}
                </p>
                <p className="text-sm text-gray-600">Power: {state.lock.power}</p>
                <p className="text-sm text-gray-600">Auth: {state.lock.auth.join(', ')}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Room Features</h3>
                <div className="flex flex-wrap gap-2">
                  {state.room.map(r => (
                    <Badge key={r} variant="outline">{r}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Configuration Data (JSON)</h4>
              <pre className="text-xs overflow-x-auto p-3 bg-white rounded border">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

