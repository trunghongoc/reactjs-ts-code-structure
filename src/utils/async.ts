export const wait: any = async (ms: number): Promise<any> => {
  return await new Promise((resolve: any): any => setTimeout(resolve, ms))
}
