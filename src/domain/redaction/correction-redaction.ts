import { axionsInstance } from "@/http/axiosInstance";

export async function createRedactionUseCase(dataRedaction: string) {
  console.log(dataRedaction);
  try {
    const response = await axionsInstance.post('/redaction', {
      redaction: dataRedaction
    });
    console.log("elkthalkfnalk : ", response.data);
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}