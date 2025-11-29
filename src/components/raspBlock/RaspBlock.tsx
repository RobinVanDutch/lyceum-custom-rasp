import { useMemo, type FC } from 'react'
import { UseWeekParse } from '../../hooks/useWeekParse'
import type { Days } from '../../type/rasp.type'

type DataT = {
    [days: number]: Days
}

interface IProps {
    raspData: DataT
}
// приминает данные по айди учителя teacherSchedule[PERIOD][TEACHERCODE]
export const RaspBlock: FC<IProps> = ({raspData}) => {
    const data = UseWeekParse(raspData)

    const renderRasp = useMemo(() => {
        const grid = new Set()
        const table = Object.entries(raspData).map((item, index) => {
            const leason = data.getLeason(item[0])
            const day = data.getDay(item[0])
            const grid = new Set();
            
            return (
                <div>
                    {day} : {leason}
                </div>
            )
        })

        return table
    }, [data])
    
    return (
        <div>{renderRasp}</div>
    )
}