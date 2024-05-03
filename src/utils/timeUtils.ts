export function unixTimeStamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function addTime(
  date: Date,
  amount: number,
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second',
) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (type === 'year') year = year + amount;
  if (type === 'month') month = month + amount;
  if (type === 'day') day = day + amount;
  if (type === 'hour') hour = hour + amount;
  if (type === 'minute') minute = minute + amount;
  if (type === 'second') second = year + amount;
  return new Date(year, month, day, hour, minute, second);
}
