-- CreateTable
CREATE TABLE "_AttendanceExcusedAbsences" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AttendanceExcusedAbsences_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AttendanceExcusedAbsences_B_index" ON "_AttendanceExcusedAbsences"("B");

-- AddForeignKey
ALTER TABLE "_AttendanceExcusedAbsences" ADD CONSTRAINT "_AttendanceExcusedAbsences_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceExcusedAbsences" ADD CONSTRAINT "_AttendanceExcusedAbsences_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
