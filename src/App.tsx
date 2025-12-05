import './App.css'
import { RaspBlock } from './components/raspBlock/RaspBlock';
import { dataFetching } from './hooks/useDataFetching';

function App() {
  const dataF = dataFetching();

  console.log(dataF.getTeacherCode('Авдюшева М.Н'));
  console.log(dataF.data);
  
  return (
    <div>
      {dataF.isLoading ? (
        <div>Загрузка...</div>
      ) : dataF.error ? (
        <div>Ошибка: {dataF.error}</div>
      ) : (
        <div className="d">
          <h1>Расписание</h1>
          <div>Период: {dataF.period}</div>
          <div>Количество учителей: {dataF.teacher ? Object.keys(dataF.teacher).length : 0}</div>
          {/* Добавьте отображение данных расписания здесь */}
          <div className="rasp">
            Расписание учителей:
            <div className="teacher">
        
              <RaspBlock raspData={dataF.teacherSchedule[dataF.period]['014']} teacher={dataF.teacher['014']} />
              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App