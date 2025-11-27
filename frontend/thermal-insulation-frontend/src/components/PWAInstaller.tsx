// src/components/PWAInstaller.tsx
import { useEffect, useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

export const PWAInstaller = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!showInstallPrompt) return null;

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={showInstallPrompt} onClose={() => setShowInstallPrompt(false)}>
        <Toast.Header>
          <strong className="me-auto">Установить приложение</strong>
        </Toast.Header>
        <Toast.Body>
          <p>Установите приложение для быстрого доступа</p>
          <div className="d-flex gap-2">
            <Button variant="warning" size="sm" onClick={handleInstall}>
              Установить
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setShowInstallPrompt(false)}>
              Позже
            </Button>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};