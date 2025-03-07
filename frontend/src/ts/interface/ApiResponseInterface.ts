export default interface ApiResponseInterface<T> {
  status: number;
  data?: T;
  message?: string;
}
