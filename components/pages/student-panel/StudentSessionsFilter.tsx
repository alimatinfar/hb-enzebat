'use client'

import {studentAttendanceStatusMeta} from "@/components/pages/student-panel/StudentPanel.constances";
import {StudentAttendanceStatusType} from "@/components/pages/student-panel/StudentPanel.types";

export type StudentSessionsFilterValue = 'ALL' | StudentAttendanceStatusType

export type StudentSessionsFilterProps = {
  value: StudentSessionsFilterValue;
  onChange: (value: StudentSessionsFilterValue) => void;
  counts: Record<StudentSessionsFilterValue, number>;
}

const FILTER_OPTIONS: { value: StudentSessionsFilterValue; label: string }[] = [
  {value: 'ALL', label: 'همه'},
  {value: 'PRESENT', label: studentAttendanceStatusMeta.PRESENT.label},
  {value: 'EXCUSED', label: studentAttendanceStatusMeta.EXCUSED.label},
  {value: 'ABSENT', label: studentAttendanceStatusMeta.ABSENT.label},
]

function StudentSessionsFilter({value, onChange, counts}: StudentSessionsFilterProps) {
  return (
    <div className='flex flex-wrap items-center gap-2 mb-3'>
      {FILTER_OPTIONS.map(option => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type='button'
            onClick={() => onChange(option.value)}
            className={`
              px-3 py-1 rounded-full border text-xs font-medium duration-200 select-none
              ${isActive
              ? 'bg-primary text-white border-transparent'
              : 'bg-white text-gray-600 border-gray-300 hover:border-primary'}
            `}
          >
            {option.label}
            <span className={`mr-1 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
              ({counts[option.value] ?? 0})
            </span>
          </button>
        )
      })}
    </div>
  );
}

export default StudentSessionsFilter;
