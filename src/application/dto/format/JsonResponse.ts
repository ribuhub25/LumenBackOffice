export default interface JsonResponse<T> {
  status: number
  message: string
  data: Array<T>
}
