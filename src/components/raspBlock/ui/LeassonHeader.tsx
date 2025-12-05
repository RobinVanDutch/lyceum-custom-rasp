import type { FC } from "react"
import cls from './LeassonHeader.module.css'

type IProps = {
    allLessons: number[]
    leasonTime: {[leasson: string] : string[]};
}

export const LeassonHeader: FC<IProps>  = ({allLessons, leasonTime}) => {
 
  return (
    <div className={cls.raspHeader}>
        <div className={cls.dayCell}></div>
        {allLessons.map(lesson => (
            <div key={lesson} className={cls.lessonHeader}>
                {lesson}
                <span className={cls.leasonTime}>
                    {(leasonTime[String(lesson)])?.join(' - ')}
                </span>
            </div>
        ))}
    </div>
  )
}