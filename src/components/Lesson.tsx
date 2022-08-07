import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from 'date-fns'
import ptBR from "date-fns/esm/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames'

interface LessonProps {
  title: string;
  lessonSlug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({title, lessonSlug, availableAt = new Date(), type}: LessonProps) {

  const { slug } = useParams<{slug: string}>()

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormat = format(availableAt, "EEEE' • ' d ' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = slug === lessonSlug;

  return (
    <Link to={`/event/lesson/${lessonSlug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormat} 
      </span>
      <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isActiveLesson
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable 
          ? (
            <span className={classNames("text-sm text-blue-500 font-medium flex items-center gap-2", {
              'text-white': isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>) 
          : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em Breve
            </span>
          )

          }
          <span className={classNames("text-xs rounded px-2 py-[0.125rem] font-bold border", {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {type === 'live'? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames("text-gray-200 mt-5 block", {
          'text-white': isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
};