// Utility to run commands


import { execSync } from "child_process";
import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility to run commands
function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

// Utility to ask user a question
function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  console.log("🚀 Expo + GitHub Pages publisher started...\n");

  // 1️⃣ Ensure gh-pages is installed
  try {
    require.resolve("gh-pages");
  } catch {
    console.log("📦 Installing gh-pages...");
    run("npm install gh-pages --save-dev");
  }

  // 2️⃣ Read and optionally update .env.production
  const envPath = ".env.production";
  let envData = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, "utf8")
    : "";

  const apiUrlMatch = envData.match(/^EXPO_PUBLIC_API_BASE_URL=(.*)$/m);
  const imagesUrlMatch = envData.match(/^EXPO_PUBLIC_IMAGES_URL=(.*)$/m);

  const currentApiUrl = apiUrlMatch ? apiUrlMatch[1] : "";
  const currentImagesUrl = imagesUrlMatch ? imagesUrlMatch[1] : "";

  console.log("\n🌐 Текущие значения:");
  console.log(`EXPO_PUBLIC_API_BASE_URL = ${currentApiUrl || "(не задан)"}`);
  console.log(`EXPO_PUBLIC_IMAGES_URL = ${currentImagesUrl || "(не задан)"}`);

  const newApiUrl = await ask(
    "\n👉 Введите временный API URL (например, http://ip172-...play-with-docker.com:8080) или нажмите Enter, чтобы оставить текущее: "
  );

  const newImagesUrl = await ask(
    "👉 Введите временный URL для изображений или нажмите Enter, чтобы оставить текущее: "
  );

  const finalApiUrl = newApiUrl.trim() || currentApiUrl;
  const finalImagesUrl = newImagesUrl.trim() || currentImagesUrl;

  let updatedEnv = envData
    .replace(/^EXPO_PUBLIC_API_BASE_URL=.*$/m, `EXPO_PUBLIC_API_BASE_URL=${finalApiUrl}`)
    .replace(/^EXPO_PUBLIC_IMAGES_URL=.*$/m, `EXPO_PUBLIC_IMAGES_URL=${finalImagesUrl}`);

  if (!/^EXPO_PUBLIC_API_BASE_URL=/m.test(updatedEnv))
    updatedEnv += `\nEXPO_PUBLIC_API_BASE_URL=${finalApiUrl}`;
  if (!/^EXPO_PUBLIC_IMAGES_URL=/m.test(updatedEnv))
    updatedEnv += `\nEXPO_PUBLIC_IMAGES_URL=${finalImagesUrl}`;

  fs.writeFileSync(envPath, updatedEnv.trim() + "\n");
  console.log("\n✅ Файл .env.production обновлён.");

  rl.close();

  // 3️⃣ Export static site
  console.log("\n📦 Экспортируем Expo проект в dist...");
  run("npx expo export --output-dir dist");

  // 4️⃣ Deploy to GitHub Pages
  console.log("\n🚀 Публикуем на GitHub Pages...");
  run("npx gh-pages -d dist");

  console.log("\n✅ Готово! Приложение опубликовано на GitHub Pages 🎉");
})();
