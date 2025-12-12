function getMinutesDifference(time1:string, time2:string) {
  const date1 = new Date(time1).getTime();
  const date2 = new Date(time2).getTime();

  const diffMs = Math.abs(date2 - date1);

  return diffMs / (1000 * 60);
}

export default getMinutesDifference