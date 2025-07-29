function safeJson<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_: string, value: unknown) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  ) as T;
}
export default safeJson;