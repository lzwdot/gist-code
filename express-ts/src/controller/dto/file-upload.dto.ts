import { IsIn, IsNotEmpty } from 'class-validator';

export class AssetUploadDto {
  @IsNotEmpty()
  id: string;

  @IsIn(['post', 'reply'])
  type: string;
}
