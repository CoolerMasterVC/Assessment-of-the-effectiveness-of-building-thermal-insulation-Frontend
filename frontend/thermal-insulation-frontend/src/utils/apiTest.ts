export const testAPI = async () => {
  try {
    // Тест 1: Проверка доступности API
    console.log('🔍 Тест 1: Проверка доступности API...');
    const testResponse = await fetch('http://localhost:8080/ping');
    console.log('Ping response:', await testResponse.text());
    
    // Тест 2: Попытка логина через fetch
    console.log('🔍 Тест 2: Логин через fetch...');
    const loginResponse = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ login: 'test', password: 'test' })
    });
    
    console.log('Login status:', loginResponse.status);
    console.log('Login headers:', [...loginResponse.headers.entries()]);
    
    const contentType = loginResponse.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (contentType?.includes('application/json')) {
      const data = await loginResponse.json();
      console.log('Login data:', data);
    } else {
      const text = await loginResponse.text();
      console.log('Login response (not JSON):', text.substring(0, 200));
    }
    
  } catch (error) {
    console.error('❌ Ошибка тестирования API:', error);
  }
};

// Запустить в консоли браузера
(window as any).testAPI = testAPI;