import {ChipsColorsType} from "@/components/others/Chips/hooks/useChipsStyles";
import {StudentAttendanceStatusType} from "@/components/pages/student-panel/StudentPanel.types";

export const studentAttendanceStatusMeta: Record<StudentAttendanceStatusType, { label: string; color: ChipsColorsType }> = {
  PRESENT: {label: 'حاضر', color: 'success'},
  EXCUSED: {label: 'غایب موجه', color: 'warning'},
  ABSENT: {label: 'غایب', color: 'danger'},
}
