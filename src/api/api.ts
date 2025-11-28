import axios from "axios"

interface ScheduleData {
  [key: string]: any; 
}

export const testApi = async(): Promise<ScheduleData>  => {
     try {
      // Получаем HTML
      const html = await axios.get("/api/rasp/m.schedule.html").then(r => r.data);
      const scriptFile = html.match(/<script[^>]*src="(nika_data_[^"]+\.js)"/)?.[1];
      
      if (!scriptFile) {
        throw new Error("Файл с расписанием не найден");
      }

      // Загружаем данные скрипта
      const scriptUrl = `/api/rasp/${scriptFile}`;
      const scriptContent = await axios.get(scriptUrl).then(r => r.data);
      
      // Парсим объект
      const dataMatch = scriptContent.match(/var\s+\w+\s*=\s*(\{[\s\S]*?\});/);
      if (!dataMatch) {
        throw new Error("Не удалось распарсить данные");
      }
      
      const jsonString = dataMatch[1]
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/'/g, '"');
      
      return JSON.parse(jsonString);
  } catch (error) {
      console.error("Ошибка парсинга:", error);
      throw error;
  }
}