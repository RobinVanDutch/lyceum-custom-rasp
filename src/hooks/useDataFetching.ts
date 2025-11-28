import { useCallback, useEffect, useState } from "react"
import { testApi } from "../api/api"
import type { FullNames, ReversedTeacherMap, TeacherMap } from "../type/rasp.type";


export const reversed = (data: object) => {
  const revers = Object.fromEntries (
            Object.entries(data).map(([key,value]) => [value, key])
         )
  return revers
}


export const dataFetching = () => {

      const [data, setData] = useState<object>({})
      const [isLoading, setIsLoading] = useState<boolean>(true)
      const [error, setError] = useState<string | null>(null)
      
      const [period, setPeriod] = useState<string>('105') //период обучения
      const [teacherSchedule, setTeacherSchedule] = useState<any>(null) //расписание учителей
      const [teacher, setTeacher] = useState<TeacherMap | null>(null) //учителя
      const [reversedTeacher, setReversedTeacher] = useState<ReversedTeacherMap>({'x': '01'}) // имя значения учителей
      
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

    return {
        data,
        isLoading,
        error,
        reversedTeacher,
        period,
        teacherSchedule,
        teacher,
        getTeacherCode,
    }
}