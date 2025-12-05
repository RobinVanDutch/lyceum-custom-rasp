import { useMemo, type FC } from 'react'
import { UseWeekParse } from '../../hooks/useWeekParse'
import type { Days } from '../../type/rasp.type'
import cls from './RaspBlock.module.css'
import { LeassonHeader } from './ui/LeassonHeader'

type DataT = {
    [days: number]: Days
}

interface IProps {
    raspData: DataT,
    teacher: string,
}
// приминает данные по айди учителя teacherSchedule[PERIOD][TEACHERCODE]
export const RaspBlock: FC<IProps> = ({ raspData, teacher }) => {
    const data = UseWeekParse(raspData)

    const renderRasp = useMemo(() => {
        const allDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        const allLessons = Array.from({ length: 12 }, (_, i) => i + 1);
        const scheduleMap = new Map();
        
        
        Object.entries(raspData).forEach(([key]) => {
            const day = data.getDay(key);
            const lesson = data.getLeason(key);

            if (!scheduleMap.has(day)) {
                scheduleMap.set(day, new Set());
            }
            scheduleMap.get(day).add(Number(lesson));
        });

        return (
            <div className={cls.raspGrid}>
                {/* Заголовок с номерами уроков */}
                <LeassonHeader leasonTime={data?.getLeasonTime()} allLessons={allLessons} />

                {/* Сетка расписания */}
                {allDays.map(day => (
                    <div key={day} className={cls.dayRow}>
                        <div className={cls.dayCell}>{day}</div>
                        {allLessons.map(lesson => {
                            const hasLesson = scheduleMap.get(day)?.has(lesson);
                            return (
                                <div
                                    key={`${day}-${lesson}`}
                                    className={`${cls.lessonCell} ${hasLesson ? cls.hasLesson : ''}`}
                                >
                                    {hasLesson ? '•' : ''}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }, [data, raspData])

    return (
        <div className={cls.container}>
            <h3>Учитель: {teacher}</h3>
            {renderRasp}
        </div>
    )
}