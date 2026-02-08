import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';
import fs from 'fs';
import axios from 'axios';

const outputPath = resolve(process.cwd(), './src/api/generated');

// Убедимся что директория существует
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Проверим доступные URL для Swagger
const swaggerUrls = [
  'http://localhost:8080/swagger/doc.json',
  'http://localhost:8080/swagger/swagger.json',
  'http://localhost:8080/swagger.json',
  'http://localhost:8080/swagger/index.json',
  'http://localhost:8080/swagger/v1/swagger.json',
  'http://localhost:8080/api-docs/swagger.json',
  'http://localhost:8080/api-docs/v1/swagger.json',
];

async function tryFetchSwagger() {
  for (const url of swaggerUrls) {
    try {
      console.log(`Пробуем получить Swagger по URL: ${url}`);
      const response = await axios.get(url, { timeout: 5000 });
      
      if (response.status === 200 && response.data) {
        console.log(`✅ Успешно получен Swagger с ${url}`);
        return url;
      }
    } catch (error) {
      console.log(`❌ Не удалось получить с ${url}: ${error.message}`);
    }
  }
  return null;
}

async function generate() {
  try {
    // Пробуем найти правильный URL
    const swaggerUrl = await tryFetchSwagger();
    
    if (!swaggerUrl) {
      throw new Error('Не удалось найти доступный Swagger JSON');
    }

    console.log(`🔄 Генерация API из ${swaggerUrl}...`);
    
    await generateApi({
      name: 'Api.ts',
      output: outputPath,
      url: swaggerUrl,
      httpClientType: 'axios',
      generateClient: true,
      generateRouteTypes: true,
      generateResponses: true,
      singleHttpClient: true,
      unwrapResponseData: true,
      cleanOutput: true,
      defaultResponseAsSuccess: false,
      defaultResponseType: 'void',
      extractRequestParams: true,
      extractRequestBody: true,
      extractEnums: true,
      modular: false,
      enumNamesAsValues: true,
      moduleNameFirstTag: false,
      generateUnionEnums: true,
      sortTypes: true,
      sortRoutes: true,
      typePrefix: '',
      typeSuffix: '',
    });

    console.log('✅ API успешно сгенерирован!');
    
    // Прочитаем сгенерированный файл и добавим экспорт по умолчанию
    const generatedFilePath = resolve(outputPath, 'Api.ts');
    let content = fs.readFileSync(generatedFilePath, 'utf8');
    
    // Добавим экспорт по умолчанию
    if (!content.includes('export default Api')) {
      content += '\n\nexport default Api;\n';
    }
    
    fs.writeFileSync(generatedFilePath, content);
    console.log('✅ Добавлен экспорт по умолчанию');
    
  } catch (error) {
    console.error('❌ Ошибка генерации API:', error.message);
    process.exit(1);
  }
}

generate();