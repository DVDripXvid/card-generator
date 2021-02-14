
interface ISignatureParams {
  public_id: string;
  unique_filename: boolean;
  overwrite: boolean;
  timestamp: string;
  invalidate: boolean;
}

interface IUploadParams extends ISignatureParams {
  file: string;
  signature: string;
  api_key: string;
}

class CloudinaryService {
  private readonly uploadUrl = 'https://api.cloudinary.com/v1_1/dvdripxvid/image/upload';
  private readonly apiKey = '366255567968392';

  async uploadImage(file: string, public_id: string) {
    const signParams: ISignatureParams = {
      public_id,
      overwrite: true,
      unique_filename: false,
      invalidate: true,
      timestamp: Math.round(new Date().getTime() / 1000).toString(),
    };
    const signature = await this.getSignature(signParams);
    const uploadParams: IUploadParams = {
      ...signParams,
      file,
      signature,
      api_key: this.apiKey,
    };
    const result = await this.postForm(this.uploadUrl, uploadParams);
    return result;
  }

  private async getSignature(params: ISignatureParams) {
    const result = await this.postJson('/getsignature', params);
    return result.signature as string;
  }

  private async postJson(url: string, params: object) {
    const body = JSON.stringify(params);
    const resp = await fetch(url, { body, method: 'POST', headers: { 'content-type': 'application/json' } });
    const result = await resp.json();
    return result;
  }

  private async postForm(url: string, params: object) {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => formData.append(key, value));
    const resp = await fetch(url, { body: formData, method: 'POST' });
    const result = await resp.json();
    return result;
  }

}

export default new CloudinaryService(); 