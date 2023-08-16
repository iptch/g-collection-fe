import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  containerClient: ContainerClient;

  constructor() {
    this.containerClient = new BlobServiceClient(
      'https://gcollection.blob.core.windows.net',
    ).getContainerClient('portraits');
  }

  async getImageUrl(acronym: string): Promise<string | undefined> {
    const blobClient = this.containerClient.getBlobClient(`${acronym}.jpg`);
    const download = await blobClient.download();
    const blobData = await download.blobBody;
    return blobData ? URL.createObjectURL(blobData) : undefined;
  }
}
