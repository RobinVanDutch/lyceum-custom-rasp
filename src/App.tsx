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
              {/* {
                dataF.reversedTeacher ?
                  Object.entries(dataF.reversedTeacher).map((value, index) => 
                    <div className="tex" style={{display: 'flex'}}>
                      {index}. {value[0]}
                      <div className="raspes">
                        {
                          String(dataF.teacherSchedule[dataF.period][`${value[1]}`])
                        }
                      </div>
                    </div>
                  )
                : <div>Нету</div>
              } */}
              <RaspBlock raspData={dataF.teacherSchedule[dataF.period]['014']} teacher={dataF.teacher['014']} />
              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App