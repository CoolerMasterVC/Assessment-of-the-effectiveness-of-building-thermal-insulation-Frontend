#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::sync::Mutex;
use std::process::Command;
use std::str;

// Константы
const ZEROTIER_NETWORK_ID: &str = "f3797ba7a8bcf044";
const ZEROTIER_IP: &str = "10.66.208.108";  // ВАШ ФИКСИРОВАННЫЙ IP
const PORT: u16 = 3000;

// Состояние приложения
struct AppState {
    zerotier_ip: Mutex<Option<String>>,
}

// Команда Tauri: Получить информацию о сети
#[tauri::command]
fn get_network_info() -> Result<serde_json::Value, String> {
    let info = serde_json::json!({
        "zerotier_ip": ZEROTIER_IP,
        "network_id": ZEROTIER_NETWORK_ID,
        "local_url": format!("http://{}:{}", ZEROTIER_IP, PORT),
        "phone_url": format!("http://{}:{}", ZEROTIER_IP, PORT),
        "status": "connected",
        "port": PORT,
        "message": "IP установлен вручную"
    });
    
    println!("🌐 Возвращаем фиксированный IP: {}", ZEROTIER_IP);
    Ok(info)
}

// Команда Tauri: Обнаружить ZeroTier IP
#[tauri::command]
fn detect_zerotier_ip(state: tauri::State<AppState>) -> Result<String, String> {
    // Используем фиксированный IP, но проверяем его доступность
    let is_reachable = check_ip_reachable(ZEROTIER_IP);
    
    let mut ip_guard = state.zerotier_ip.lock().unwrap();
    *ip_guard = Some(ZEROTIER_IP.to_string());
    
    if is_reachable {
        Ok(format!("✅ Используем фиксированный IP: {}", ZEROTIER_IP))
    } else {
        Ok(format!("⚠️  Фиксированный IP {} может быть недоступен", ZEROTIER_IP))
    }
}

// Команда Tauri: Открыть на телефоне
#[tauri::command]
fn open_mobile_browser(state: tauri::State<AppState>) -> Result<String, String> {
    let ip_guard = state.zerotier_ip.lock().unwrap();
    
    let ip = match &*ip_guard {
        Some(ip) => ip,
        None => ZEROTIER_IP, // Используем фиксированный IP, если состояние пустое
    };
    
    let url = format!("http://{}:{}", ip, PORT);
    
    // Используем системный браузер
    #[cfg(not(target_os = "linux"))]
    let result = webbrowser::open(&url);
    
    #[cfg(target_os = "linux")]
    let result = Command::new("xdg-open").arg(&url).output();
    
    match result {
        Ok(_) => Ok(format!("📱 Открываю {} на телефоне", url)),
        Err(e) => Err(format!("❌ Ошибка открытия браузера: {}", e)),
    }
}

// Проверка доступности IP
fn check_ip_reachable(ip: &str) -> bool {
    use std::net::TcpStream;
    use std::time::Duration;
    
    // Пытаемся подключиться к порту 3000
    match TcpStream::connect_timeout(
        &format!("{}:{}", ip, PORT).parse().unwrap(),
        Duration::from_secs(2)
    ) {
        Ok(_) => true,
        Err(_) => false,
    }
}

fn main() {
    // Используем фиксированный IP при старте
    let initial_ip = Some(ZEROTIER_IP.to_string());
    
    // Сохраняем IP для вывода в консоль
    let initial_ip_for_console = initial_ip.clone();
    
    tauri::Builder::default()
        .manage(AppState {
            zerotier_ip: Mutex::new(initial_ip),
        })
        .invoke_handler(tauri::generate_handler![
            get_network_info,
            detect_zerotier_ip,
            open_mobile_browser
        ])
        .setup(move |app| {
            let _main_window = app.get_window("main").unwrap();
            
            // Выводим информацию в консоль
            println!("{}", "=".repeat(50));
            println!("🌐 ТЕПЛОИЗОЛЯЦИОННЫЕ МАТЕРИАЛЫ - Tauri App");
            println!("{}", "=".repeat(50));
            
            // Всегда показываем фиксированный IP
            println!("✅ ZeroTier IP: {}", ZEROTIER_IP);
            println!("📱 Для телефона: http://{}:{}", ZEROTIER_IP, PORT);
            println!("💻 Локально: http://localhost:{}", PORT);
            println!("{}", "=".repeat(50));
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске Tauri приложения");
}