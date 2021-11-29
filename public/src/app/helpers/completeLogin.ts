import { NavigationExtras } from "@angular/router";
import { STORAGE_USER_NAME } from "../localStorage.const";
import { PATH_MENU } from "../paths.const";

export const completeLogin = (userName: string, navigate: (commands: any[], extras?: NavigationExtras)=> Promise<boolean>): void => {
  localStorage.setItem(STORAGE_USER_NAME, userName);
  navigate([PATH_MENU]);
}