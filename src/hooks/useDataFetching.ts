import { useCallback, useEffect, useState } from "react"
import { testApi } from "../api/api"
import type { FullNames, ReversedTeacherMap, TeacherMap } from "../type/rasp.type";

type defaultT = {
  [code: string]: string
}

// Принимает объек {key: value} возвращает => {value: key} 
export const reversed = (data: object) => {
  return Object.fromEntries(Object.entries(data).map(([key,value]) => [value, key]))
}


export const dataFetching = () => {

      const [data, setData] = useState<object>({})
      const [isLoading, setIsLoading] = useState<boolean>(true)
      const [error, setError] = useState<string | null>(null)
      
      const [period, setPeriod] = useState<string>('105') // период обучения
      const [teacherSchedule, setTeacherSchedule] = useState<any>(null) // расписание учителей
      const [teacher, setTeacher] = useState<TeacherMap | null>(null) // учителя
      const [reversedTeacher, setReversedTeacher] = useState<ReversedTeacherMap>({'x': '01'}) // имя значения учителей
      const [classes, setClasses] = useState<defaultT>({'001': '1а'}) // классы
      const [classGroup, setClassGroup] = useState<defaultT>({'0': 'Группа 1'}) // группы классов
      const [room, setRoom] = useState<defaultT>({'000': "1к 504"}) // кабинеты
      const [subject, setSubject] = useState<defaultT>({'000': " виртуальная реальность"}) // название предметов
      
      useEffect(() => {
        async function getApi() {
          try {
            setIsLoading(true)
            const response = await testApi()
            setData(response)
            
            // Получаем первый период
            const firstPeriod = Object.keys(response.PERIODS)[0]
            setPeriod(firstPeriod)
            setTeacherSchedule(response.TEACH_SCHEDULE)
            setTeacher(response.TEACHERS)
            setClasses(response.CLASSES)
            setClassGroup(response.CLASSGROUPS)
            setRoom(response.ROOMS)
            setSubject(response.SUBJECTS)
            // Сразу создаем перевернутый словарь учителей
            response.TEACHERS ? setReversedTeacher(reversed(response.TEACHERS)) : null;

          } catch (error) {
            setError('Ошибка при загрузке данных')
            console.error('API Error:', error)
          } finally {
            setIsLoading(false)
          }
        }
    
        getApi()
      }, [])
    

    const getTeacherCode = useCallback((name: FullNames) => {
        return reversedTeacher ? reversedTeacher[name] : null
    }, [reversedTeacher])

    const getRoom = useCallback(() => {
      return 0
    }, []);

    return {
        data,
        isLoading,
        error,
        reversedTeacher,
        period,
        teacherSchedule,
        teacher,
        getTeacherCode,
        classes,
        room,
        subject,
        classGroup
    }
}