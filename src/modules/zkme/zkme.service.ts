import axiosInstance from "@/lib/axios";
const apiKey = process.env.ZKME_API_KEY;
const appId = process.env.ZKME_APP_ID;

class ZkMeService {
  async GET_TOKEN() {
    const url = "https://nest-api.zk.me/api/token/get";
    const body = {
      apiKey: apiKey!,
      appId: appId!,
      apiModePermission: 0,
      lv: 1,
    };
    const response = await axiosInstance({
      method: "POST",
      url: url,
      data: body,
    });
    return response.data.data.accessToken;
  }
}

const zkmeService = new ZkMeService();
export default zkmeService;
