import { format } from 'date-fns'

export function formatDate(timestamp) {
  const date = timestamp.toDate(); // Firebase Timestamp → Date型に変換
  return format(date, 'yyyy/MM/dd');
}