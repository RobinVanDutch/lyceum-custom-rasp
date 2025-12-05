import { useCallback } from "react"
import { dataFetching } from "./useDataFetching"
import type { Day, Rasp } from "../type/rasp.type"



// Хук для обработки данных расписания для учителей
export const UseWeekParse = (rasp: Rasp) => {
    const api = dataFetching()
    
    // Возвращает день недели
    const getDay = useCallback((value: string) => {
        const days = Number(value.slice(0,1))
        const dayNames = {
            1: 'пн',
            2: 'вт',
            3: 'ср',
            4: 'чт',
            5: 'пт',
            6: 'сб',
            7: 'вс'
        } as Day;
        return dayNames[days];
    }, [rasp])

    // Возвращает номер урока
    const getLeason = useCallback((value: string) => {
        const leason = Number(value.slice(1,3))
        return leason;
    }, [rasp])

    // Возравщает массив с временнем уроков
    const getLeasonTime = useCallback( () => {
        return api.leasonTime
    }, [api])

    // Возвращает по коду => номер кабинета
    const getClassRoom = useCallback((room: string) => {
        return api.room[room]
    }, [api]);

    // Возвращает по массиву ключей => массив классов на уроке
    const getClasses = useCallback((classes: string[]) => {
        return classes.map(cl => api.classes[cl]).filter(Boolean);
    }, [api]);

    return {
        getDay,
        getLeason,
        getClassRoom,
        getClasses,
        getLeasonTime

    }
}