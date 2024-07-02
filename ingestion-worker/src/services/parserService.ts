export async function parseDataChunk(
  chunk: any,
  transformFunction: (data: string) => any,
  onFinish: (transformedData: any) => void
): Promise<void> {
  const transformedData = transformFunction(chunk);
  onFinish(transformedData);
}
