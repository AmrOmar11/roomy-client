export class GoogleUserModel {
  image: string;
  email: string;
  displayName: string;
  userId: string;
  friends: Array<string> = [];
  photos: Array<string> = [];
}
