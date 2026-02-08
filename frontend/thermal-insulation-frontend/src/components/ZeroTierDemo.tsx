import { type FC, useState, useEffect } from 'react';
import { Card, Button, Alert, Badge, Spinner, ListGroup } from 'react-bootstrap';
import { invoke } from '@tauri-apps/api/tauri';

interface NetworkInfo {
  zerotier_ip: string | null;
  network_id: string;
  local_url: string;
  phone_url: string;
  status: string;
  port: number;
  message?: string;
}

export const ZeroTierDemo: FC = () => {
  const [manualIp, setManualIp] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState('');

  const loadNetworkInfo = async () => {
    try {
      setLoading(true);
      const info = await invoke<NetworkInfo>('get_network_info');
      setNetworkInfo(info);
      setError('');
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const detectIp = async () => {
    try {
      setDetecting(true);
      const result = await invoke<string>('detect_zerotier_ip');
      alert(result);
      await loadNetworkInfo(); // Перезагружаем информацию
    } catch (err: any) {
      alert('Ошибка: ' + err.toString());
    } finally {
      setDetecting(false);
    }
  };

  const openOnPhone = async () => {
    try {
      const result = await invoke<string>('open_mobile_browser');
      alert(result);
    } catch (err: any) {
      alert('Ошибка: ' + err.toString());
    }
  };

  useEffect(() => {
    loadNetworkInfo();
  }, []);

  return (
    <Card className="mt-4 border-primary">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          🌐 Лабораторная 6: ZeroTier + Tauri
        </h5>
        <Badge bg="light" text="dark">
          Виртуальная сеть
        </Badge>
      </Card.Header>
      
      <Card.Body>
        <Alert variant="primary">
          <strong>Цель лабораторной:</strong> Настроить виртуальную сеть ZeroTier, 
          зафиксировать IP адрес HTTPS-сервера в коде Tauri, 
          открывать браузер на телефоне по адресу в виртуальной сети.
        </Alert>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <Button 
            variant="outline-primary" 
            onClick={loadNetworkInfo}
            disabled={loading}
          >
            {loading ? <><Spinner size="sm" /> Загрузка...</> : '🔄 Обновить'}
          </Button>
          
          <Button 
            variant="warning"
            onClick={detectIp}
            disabled={detecting}
          >
            {detecting ? <><Spinner size="sm" /> Поиск...</> : '🔍 Найти ZeroTier IP'}
          </Button>
          
          <Button 
            variant="success"
            onClick={openOnPhone}
            disabled={!networkInfo?.zerotier_ip}
          >
            📱 Открыть на телефоне
          </Button>
        </div>

        {networkInfo && (
          <Card className="mb-3">
            <Card.Body>
              <h6>📊 Состояние сети:</h6>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Network ID:</strong></span>
                  <Badge bg="info">{networkInfo.network_id}</Badge>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Статус:</strong></span>
                  <Badge bg={networkInfo.status === 'connected' ? 'success' : 'warning'}>
                    {networkInfo.status === 'connected' ? 'Подключено' : 'Не подключено'}
                  </Badge>
                </ListGroup.Item>
                
                {networkInfo.zerotier_ip ? (
                  <>
                    <ListGroup.Item>
                      <strong>ZeroTier IP:</strong>
                      <div className="mt-1">
                        <code className="fs-5">{networkInfo.zerotier_ip}</code>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <strong>URL для телефона:</strong>
                      <div className="mt-1">
                        <code>{networkInfo.phone_url}</code>
                        <Button 
                          variant="link" 
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(networkInfo.phone_url)}
                        >
                          📋 Копировать
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </>
                ) : (
                  <ListGroup.Item>
                    <Alert variant="warning" className="mb-0">
                      <strong>ZeroTier не подключен!</strong>
                      <p className="mb-0 mt-1">{networkInfo.message}</p>
                    </Alert>
                  </ListGroup.Item>
                )}
                
                <ListGroup.Item>
                  <strong>Порт:</strong> <Badge bg="secondary">{networkInfo.port}</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        )}

        {error && (
          <Alert variant="danger">
            <strong>Ошибка:</strong> {error}
          </Alert>
        )}

        <div className="mt-4">
          <h6>📋 Инструкция для демонстрации:</h6>
          <ol>
            <li>Установите ZeroTier на телефон и компьютер</li>
            <li>Присоединитесь к сети с ID: <code>{networkInfo?.network_id || '1c33c1ced0abcdef'}</code></li>
            <li>Авторизуйте устройства в <a href="https://my.zerotier.com" target="_blank">ZeroTier Central</a></li>
            <li>Нажмите "Найти ZeroTier IP" для автоматического определения</li>
            <li>Нажмите "Открыть на телефоне" для демонстрации доступа</li>
          </ol>
          
          <Alert variant="info" className="small">
            <strong>Технические детали:</strong>
            <ul className="mb-0 mt-1">
              <li>IP адрес автоматически определяется через <code>zerotier-cli</code></li>
              <li>Для демонстрации код Tauri использует системный браузер</li>
              <li>Network ID зафиксирован в Rust коде как константа</li>
            </ul>
          </Alert>
        </div>
      </Card.Body>
    </Card>
  );
};