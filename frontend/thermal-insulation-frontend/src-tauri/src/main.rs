#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
struct Material {
    id: u32,
    name: String,
    description: String,
    price_per_m2: f64,
    lambda: f64,
    thickness: f64,
    image_url: String,
    status: String,
    created_at: String,
}

#[tauri::command]
async fn get_materials() -> Result<Vec<Material>, String> {
    let client = reqwest::Client::new();
    // ВАШ РЕАЛЬНЫЙ IP!
    let backend_url = "http://192.168.0.141:8080/api/materials";
    
    println!("🎯 Tauri подключается к: {}", backend_url);
    println!("📡 IP в коде: 192.168.0.141");
    
    match client.get(backend_url).send().await {
        Ok(response) => {
            println!("✅ Статус ответа: {}", response.status());
            if response.status().is_success() {
                let materials: Vec<Material> = response.json().await
                    .map_err(|e| format!("Failed to parse response: {}", e))?;
                println!("📦 Получено материалов: {}", materials.len());
                Ok(materials)
            } else {
                Err(format!("HTTP error: {}", response.status()))
            }
        }
        Err(e) => Err(format!("Request failed: {}", e)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_materials])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}